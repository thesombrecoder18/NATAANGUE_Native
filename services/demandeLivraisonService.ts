// Service de gestion des demandes de livraison
// Ce service simule la synchronisation des données entre producteurs et transporteurs

export interface DemandeLivraison {
  id: string;
  produit: string;
  quantite: string;
  producteur: string;
  telephoneProducteur: string;
  origine: string;
  destination: string;
  dateLivraison: string;
  heureLivraison: string;
  prixPropose: string;
  statut: 'Disponible' | 'Acceptée' | 'En cours' | 'Terminée' | 'Annulée';
  transporteurAccepte?: string | null;
  telephoneTransporteur?: string | null;
  dateCreation: string;
  description?: string;
  conditionsSpeciales?: string;
  distance?: string;
  tempsEstime?: string;
}

class DemandeLivraisonService {
  private static instance: DemandeLivraisonService;
  private demandes: DemandeLivraison[] = [];

  private constructor() {
    // Initialiser avec des données de test
    this.initializeMockData();
  }

  public static getInstance(): DemandeLivraisonService {
    if (!DemandeLivraisonService.instance) {
      DemandeLivraisonService.instance = new DemandeLivraisonService();
    }
    return DemandeLivraisonService.instance;
  }

  private initializeMockData() {
    this.demandes = [
      {
        id: '1',
        produit: 'Tomates Bio',
        quantite: '50 kg',
        producteur: 'Ferme Diallo',
        telephoneProducteur: '+221 77 123 45 67',
        origine: 'Ferme Diallo, Thiès',
        destination: 'Marché Sandaga, Dakar',
        dateLivraison: '2024-03-01',
        heureLivraison: '08:00',
        prixPropose: '5000 FCFA',
        statut: 'Disponible',
        transporteurAccepte: null,
        telephoneTransporteur: null,
        dateCreation: '2024-02-28',
        description: 'Livraison urgente pour le marché du matin',
        conditionsSpeciales: 'Réfrigéré à 4°C',
        distance: '45 km',
        tempsEstime: '1h 30min'
      },
      {
        id: '2',
        produit: 'Mangues Bio',
        quantite: '100 kg',
        producteur: 'Ferme Ba',
        telephoneProducteur: '+221 78 987 65 43',
        origine: 'Ferme Ba, Kaolack',
        destination: 'Entrepôt Dakar',
        dateLivraison: '2024-03-02',
        heureLivraison: '14:00',
        prixPropose: '4000 FCFA',
        statut: 'Disponible',
        transporteurAccepte: null,
        telephoneTransporteur: null,
        dateCreation: '2024-02-27',
        description: 'Livraison normale vers entrepôt',
        conditionsSpeciales: 'Température fraîche',
        distance: '120 km',
        tempsEstime: '2h 30min'
      },
      {
        id: '3',
        produit: 'Riz Bio',
        quantite: '200 kg',
        producteur: 'Ferme Sarr',
        telephoneProducteur: '+221 76 555 44 33',
        origine: 'Ferme Sarr, Saint-Louis',
        destination: 'Marché Thiès',
        dateLivraison: '2024-03-03',
        heureLivraison: '10:00',
        prixPropose: '3500 FCFA',
        statut: 'Acceptée',
        transporteurAccepte: 'Moussa Diop',
        telephoneTransporteur: '+221 77 111 22 33',
        dateCreation: '2024-02-26',
        description: 'Livraison hebdomadaire',
        conditionsSpeciales: 'Température ambiante',
        distance: '80 km',
        tempsEstime: '2h 00min'
      }
    ];
  }

  // Méthodes pour les producteurs
  public async getDemandesProducteur(producteurId: string): Promise<DemandeLivraison[]> {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.demandes.filter(d => d.producteur === producteurId);
  }

  public async creerDemande(demande: Omit<DemandeLivraison, 'id' | 'dateCreation' | 'statut' | 'transporteurAccepte' | 'telephoneTransporteur'>): Promise<DemandeLivraison> {
    const nouvelleDemande: DemandeLivraison = {
      ...demande,
      id: Date.now().toString(),
      dateCreation: new Date().toISOString().split('T')[0],
      statut: 'Disponible',
      transporteurAccepte: null,
      telephoneTransporteur: null
    };

    this.demandes.unshift(nouvelleDemande);
    
    // Simuler une notification aux transporteurs
    console.log(`Nouvelle demande créée: ${nouvelleDemande.produit} - Visible par tous les transporteurs`);
    
    return nouvelleDemande;
  }

  public async annulerDemande(demandeId: string): Promise<void> {
    const demande = this.demandes.find(d => d.id === demandeId);
    if (demande) {
      demande.statut = 'Annulée';
      console.log(`Demande annulée: ${demande.produit}`);
    }
  }

  // Méthodes pour les transporteurs
  public async getDemandesDisponibles(): Promise<DemandeLivraison[]> {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.demandes.filter(d => d.statut === 'Disponible');
  }

  public async accepterDemande(demandeId: string, transporteurNom: string, transporteurTelephone: string): Promise<void> {
    const demande = this.demandes.find(d => d.id === demandeId);
    if (demande) {
      demande.statut = 'Acceptée';
      demande.transporteurAccepte = transporteurNom;
      demande.telephoneTransporteur = transporteurTelephone;
      
      console.log(`Demande acceptée par ${transporteurNom}: ${demande.produit}`);
      
      // Simuler une notification au producteur
      console.log(`Notification envoyée à ${demande.producteur}: Votre demande a été acceptée par ${transporteurNom}`);
    }
  }

  public async refuserDemande(demandeId: string): Promise<void> {
    const demande = this.demandes.find(d => d.id === demandeId);
    if (demande) {
      // Supprimer la demande de la liste des transporteurs
      this.demandes = this.demandes.filter(d => d.id !== demandeId);
      console.log(`Demande refusée et supprimée: ${demande.produit}`);
    }
  }

  // Méthodes générales
  public async getAllDemandes(): Promise<DemandeLivraison[]> {
    return [...this.demandes];
  }

  public async getDemandeById(id: string): Promise<DemandeLivraison | null> {
    return this.demandes.find(d => d.id === id) || null;
  }

  // Méthode pour simuler les notifications en temps réel
  public subscribeToDemandes(callback: (demandes: DemandeLivraison[]) => void): () => void {
    // Simuler des mises à jour périodiques
    const interval = setInterval(() => {
      callback([...this.demandes]);
    }, 30000); // Mise à jour toutes les 30 secondes

    // Retourner une fonction de désabonnement
    return () => clearInterval(interval);
  }
}

export default DemandeLivraisonService;
