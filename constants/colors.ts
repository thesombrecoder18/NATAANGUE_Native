// Palette de couleurs unifiée pour l'application Naatangue
export const Colors = {
  // Couleur principale - Vert Naatangue
  primary: '#4CAF50',
  
  // Variations du vert
  primaryLight: '#C8E6C9',
  primaryLighter: '#E8F5E8',
  primaryDark: '#388E3C',
  
  // Couleurs de texte
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#888888',
  textWhite: '#FFFFFF',
  
  // Couleurs de fond
  background: '#F5F5F5',
  backgroundWhite: '#FFFFFF',
  
  // Couleurs d'état
  success: '#4CAF50',
  warning: '#FFD54F',
  error: '#F44336',
  info: '#2196F3',
  
  // Couleurs d'interface
  border: '#C8E6C9',
  shadow: '#000000',
  
  // Couleurs spécifiques aux rôles (toutes en vert pour cohérence)
  roleColors: {
    Producteur: '#4CAF50',
    Transporteur: '#4CAF50',
    Distributeur: '#4CAF50',
    Consommateur: '#4CAF50',
  }
} as const;

// Thème unifié pour tous les rôles
export const getRoleColor = (role: string): string => {
  return Colors.primary; // Toujours le vert principal
};

// Couleurs pour les statistiques et cartes
export const getCardColor = (role: string): string => {
  return Colors.primary + '20'; // Vert avec 20% d'opacité
};
