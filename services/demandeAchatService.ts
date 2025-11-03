import { Platform } from 'react-native';

export type DemandeAchat = {
  id: string;
  produit: string;
  quantite: string;
  distributeur: string;
  telephoneDistributeur: string;
  description?: string;
  prixMax?: string;
  statut: 'Publiée' | 'En négociation' | 'Confirmée' | 'Annulée';
  producteurChoisi?: string | null;
  telephoneProducteur?: string | null;
  dateSouhaitee?: string;
  propositionEnCours?: { producteur: string; telephone: string } | null;
};

const ACHATS_KEY = 'demande_achat_list';

// Minimal storage wrapper aligned with userStorage behavior
const getStorage = () => {
  if (Platform.OS === 'web') {
    return {
      getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
      setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
      removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
    };
  }
  return {
    getItem: async (key: string) => memoryStorage[key] ?? null,
    setItem: async (key: string, value: string) => { memoryStorage[key] = value; },
    removeItem: async (key: string) => { delete memoryStorage[key]; },
  };
};

let memoryStorage: Record<string, string> = {};

class DemandeAchatService {
  private static instance: DemandeAchatService | null = null;

  static getInstance(): DemandeAchatService {
    if (!DemandeAchatService.instance) {
      DemandeAchatService.instance = new DemandeAchatService();
    }
    return DemandeAchatService.instance;
  }

  private async getAll(): Promise<DemandeAchat[]> {
    const storage = getStorage();
    const raw = await storage.getItem(ACHATS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private async saveAll(demandes: DemandeAchat[]): Promise<void> {
    const storage = getStorage();
    await storage.setItem(ACHATS_KEY, JSON.stringify(demandes));
  }

  async creerDemandeAchat(data: Omit<DemandeAchat, 'id' | 'statut' | 'producteurChoisi' | 'telephoneProducteur'>): Promise<DemandeAchat> {
    const newItem: DemandeAchat = {
      id: Date.now().toString(),
      statut: 'Publiée',
      producteurChoisi: null,
      telephoneProducteur: null,
      propositionEnCours: null,
      ...data,
    };
    const all = await this.getAll();
    all.push(newItem);
    await this.saveAll(all);
    return newItem;
  }

  async getDemandesDistributeur(distributeur: string): Promise<DemandeAchat[]> {
    const all = await this.getAll();
    return all.filter(d => d.distributeur === distributeur);
  }

  async getDemandesPubliques(): Promise<DemandeAchat[]> {
    const all = await this.getAll();
    return all.filter(d => d.statut === 'Publiée');
  }

  async annulerDemande(id: string): Promise<void> {
    const all = await this.getAll();
    const updated = all.map(d => d.id === id ? { ...d, statut: 'Annulée' } : d);
    await this.saveAll(updated);
  }

  async confirmerProducteur(id: string, producteur: string, telephone: string): Promise<void> {
    const all = await this.getAll();
    const updated = all.map(d => d.id === id ? { ...d, statut: 'Confirmée', producteurChoisi: producteur, telephoneProducteur: telephone } : d);
    await this.saveAll(updated);
  }

  async proposerParProducteur(id: string, producteur: string, telephone: string): Promise<void> {
    const all = await this.getAll();
    const updated = all.map(d => d.id === id ? { ...d, statut: 'En négociation', propositionEnCours: { producteur, telephone } } : d);
    await this.saveAll(updated);
  }
}

export const demandeAchatService = DemandeAchatService.getInstance();


