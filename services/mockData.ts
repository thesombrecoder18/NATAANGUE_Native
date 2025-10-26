import { User } from './userStorage';

// Données simulées pour les utilisateurs
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    phone: '701234567',
    email: 'elimaneka19@gmail.com',
    password: 'passer',
    role: 'Administrateur',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    username: 'producteur',
    phone: '701234568',
    email: 'producteur@gmail.com',
    password: 'passer',
    role: 'Producteur',
    createdAt: '2024-01-15T08:30:00.000Z',
  },
  {
    id: '3',
    username: 'producteur2',
    phone: '701234569',
    email: 'fatou@email.com',
    password: 'passer',
    role: 'Producteur',
    createdAt: '2024-01-20T10:15:00.000Z',
  },
  {
    id: '4',
    username: 'transporteur',
    phone: '701234570',
    email: 'ibrahima@email.com',
    password: 'passer',
    role: 'Transporteur',
    createdAt: '2024-01-25T14:20:00.000Z',
  },
  {
    id: '5',
    username: 'distributeur',
    phone: '701234571',
    email: 'aissatou@email.com',
    password: 'passer',
    role: 'Distributeur',
    createdAt: '2024-02-01T09:45:00.000Z',
  },
  {
    id: '6',
    username: 'consommateur',
    phone: '701234572',
    email: 'moussa@email.com',
    password: 'passer',
    role: 'Consommateur',
    createdAt: '2024-02-05T16:30:00.000Z',
  },
  {
    id: '7',
    username: 'consommateur2',
    phone: '701234573',
    email: 'khadija@email.com',
    password: 'passer',
    role: 'Consommateur',
    createdAt: '2024-02-10T11:00:00.000Z',
  },
  {
    id: '8',
    username: 'transporteur2',
    phone: '701234574',
    email: 'cheikh@email.com',
    password: 'passer',
    role: 'Transporteur',
    createdAt: '2024-02-15T13:15:00.000Z',
  },
];

// Données simulées pour les transactions (interface locale)
interface Transaction {
  id: string;
  productId: string;
  productName: string;
  fromActor: { id: string; name: string; role: string };
  toActor: { id: string; name: string; role: string };
  transactionType: string;
  status: string;
  timestamp: string;
  location: { latitude: number; longitude: number; address: string };
  notes: string;
  qrCode: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'tx_001',
    productId: 'prod_001',
    productName: 'Tomates Bio - Lot A',
    fromActor: {
      id: '2',
      name: 'mamadou_diallo',
      role: 'Producteur',
    },
    toActor: {
      id: '4',
      name: 'ibrahima_traore',
      role: 'Transporteur',
    },
    transactionType: 'PRODUCTION',
    status: 'COMPLETED',
    timestamp: '2024-02-20T08:00:00.000Z',
    location: {
      latitude: 14.6928,
      longitude: -17.4467,
      address: 'Ferme Diallo, Thiès, Sénégal',
    },
    notes: 'Récolte de tomates biologiques - 50kg',
    qrCode: 'QR_TOMATES_001',
  },
  {
    id: 'tx_002',
    productId: 'prod_001',
    productName: 'Tomates Bio - Lot A',
    fromActor: {
      id: '4',
      name: 'ibrahima_traore',
      role: 'Transporteur',
    },
    toActor: {
      id: '5',
      name: 'aissatou_diop',
      role: 'Distributeur',
    },
    transactionType: 'TRANSPORT',
    status: 'COMPLETED',
    timestamp: '2024-02-20T14:30:00.000Z',
    location: {
      latitude: 14.7167,
      longitude: -17.4672,
      address: 'Dakar, Sénégal',
    },
    notes: 'Transport en camion réfrigéré - Température maintenue à 4°C',
    qrCode: 'QR_TOMATES_001',
  },
  {
    id: 'tx_003',
    productId: 'prod_001',
    productName: 'Tomates Bio - Lot A',
    fromActor: {
      id: '5',
      name: 'aissatou_diop',
      role: 'Distributeur',
    },
    toActor: {
      id: '6',
      name: 'moussa_ndiaye',
      role: 'Consommateur',
    },
    transactionType: 'DISTRIBUTION',
    status: 'COMPLETED',
    timestamp: '2024-02-21T10:15:00.000Z',
    location: {
      latitude: 14.7167,
      longitude: -17.4672,
      address: 'Marché Sandaga, Dakar, Sénégal',
    },
    notes: 'Vente au détail - Prix: 1500 FCFA/kg',
    qrCode: 'QR_TOMATES_001',
  },
  {
    id: 'tx_004',
    productId: 'prod_002',
    productName: 'Riz Bio - Lot B',
    fromActor: {
      id: '3',
      name: 'fatou_sarr',
      role: 'Producteur',
    },
    toActor: {
      id: '8',
      name: 'cheikh_ba',
      role: 'Transporteur',
    },
    transactionType: 'PRODUCTION',
    status: 'IN_PROGRESS',
    timestamp: '2024-02-22T06:00:00.000Z',
    location: {
      latitude: 14.6928,
      longitude: -17.4467,
      address: 'Ferme Sarr, Kaolack, Sénégal',
    },
    notes: 'Récolte de riz biologique - 200kg',
    qrCode: 'QR_RIZ_002',
  },
  {
    id: 'tx_005',
    productId: 'prod_003',
    productName: 'Mangues Bio - Lot C',
    fromActor: {
      id: '2',
      name: 'mamadou_diallo',
      role: 'Producteur',
    },
    toActor: {
      id: '4',
      name: 'ibrahima_traore',
      role: 'Transporteur',
    },
    transactionType: 'PRODUCTION',
    status: 'PENDING',
    timestamp: '2024-02-23T07:30:00.000Z',
    location: {
      latitude: 14.6928,
      longitude: -17.4467,
      address: 'Ferme Diallo, Thiès, Sénégal',
    },
    notes: 'Récolte de mangues biologiques - 75kg',
    qrCode: 'QR_MANGUES_003',
  },
  {
    id: 'tx_006',
    productId: 'prod_004',
    productName: 'Oignons Bio - Lot D',
    fromActor: {
      id: '3',
      name: 'fatou_sarr',
      role: 'Producteur',
    },
    toActor: {
      id: '8',
      name: 'cheikh_ba',
      role: 'Transporteur',
    },
    transactionType: 'PRODUCTION',
    status: 'COMPLETED',
    timestamp: '2024-02-18T09:45:00.000Z',
    location: {
      latitude: 14.6928,
      longitude: -17.4467,
      address: 'Ferme Sarr, Kaolack, Sénégal',
    },
    notes: 'Récolte d\'oignons biologiques - 100kg',
    qrCode: 'QR_OIGNONS_004',
  },
  {
    id: 'tx_007',
    productId: 'prod_004',
    productName: 'Oignons Bio - Lot D',
    fromActor: {
      id: '8',
      name: 'cheikh_ba',
      role: 'Transporteur',
    },
    toActor: {
      id: '5',
      name: 'aissatou_diop',
      role: 'Distributeur',
    },
    transactionType: 'TRANSPORT',
    status: 'COMPLETED',
    timestamp: '2024-02-19T11:20:00.000Z',
    location: {
      latitude: 14.7167,
      longitude: -17.4672,
      address: 'Dakar, Sénégal',
    },
    notes: 'Transport en camion - Livraison à Dakar',
    qrCode: 'QR_OIGNONS_004',
  },
  {
    id: 'tx_008',
    productId: 'prod_004',
    productName: 'Oignons Bio - Lot D',
    fromActor: {
      id: '5',
      name: 'aissatou_diop',
      role: 'Distributeur',
    },
    toActor: {
      id: '7',
      name: 'khadija_fall',
      role: 'Consommateur',
    },
    transactionType: 'CONSUMPTION',
    status: 'COMPLETED',
    timestamp: '2024-02-19T16:00:00.000Z',
    location: {
      latitude: 14.7167,
      longitude: -17.4672,
      address: 'Marché Sandaga, Dakar, Sénégal',
    },
    notes: 'Achat au détail - Prix: 800 FCFA/kg',
    qrCode: 'QR_OIGNONS_004',
  },
];

// Variable pour éviter les initialisations multiples
let isInitialized = false;

// Fonction pour initialiser les données simulées
export const initializeMockData = async () => {
  if (isInitialized) {
    return;
  }

  try {
    // Initialiser les utilisateurs
    const { UserStorage } = await import('./userStorage');
    const existingUsers = await UserStorage.getAllUsers();
    
    if (existingUsers.length === 0) {
      for (const user of mockUsers) {
        try {
          await UserStorage.saveUser({
            username: user.username,
            phone: user.phone,
            email: user.email,
            password: user.password,
            role: user.role as any,
          });
        } catch (error) {
          console.log('Utilisateur déjà existant:', user.username);
        }
      }
    }

    // Les transactions sont maintenant gérées localement
    console.log('Données simulées initialisées avec succès');

    isInitialized = true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des données simulées:', error);
  }
};
