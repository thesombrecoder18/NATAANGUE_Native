// Palette de couleurs unifiée pour l'application Naatangue - THÈME VERT UNIFIÉ
export const Colors = {
  // Couleur principale - Vert Naatangue
  primary: '#4CAF50',
  
  // Variations du vert
  primaryLight: '#C8E6C9',
  primaryLighter: '#E8F5E8',
  primaryDark: '#388E3C',
  primaryAccent: '#66BB6A',
  
  // Couleurs de texte
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#888888',
  textWhite: '#FFFFFF',
  
  // Couleurs de fond
  background: '#F5F5F5',
  backgroundWhite: '#FFFFFF',
  
  // Couleurs d'état - TOUTES EN VERT
  success: '#4CAF50',
  warning: '#8BC34A', // Vert clair pour les avertissements
  error: '#D32F2F', // Rouge uniquement pour les erreurs critiques
  info: '#4CAF50',
  
  // Couleurs pour analytics - THÈME VERT
  green: '#4CAF50',
  greenLight: '#8BC34A',
  greenDark: '#2E7D32',
  greenAccent: '#66BB6A',
  
  // Couleurs d'interface
  border: '#C8E6C9',
  shadow: '#000000',
  lightGray: '#E0E0E0',
  white: '#FFFFFF',
  
  // Couleurs spécifiques aux rôles (toutes en vert pour cohérence)
  roleColors: {
    Producteur: '#4CAF50',
    Transporteur: '#4CAF50',
    Distributeur: '#66BB6A',
    Consommateur: '#2E7D32',
    Administrateur: '#4CAF50',
  },
  
  // Couleurs pour les statuts - THÈME VERT
  statusCompleted: '#4CAF50',
  statusInProgress: '#8BC34A',
  statusPending: '#C8E6C9',
  statusCancelled: '#D32F2F', // Rouge uniquement pour annulé
} as const;

// Thème unifié pour tous les rôles
export const getRoleColor = (role: string): string => {
  return Colors.primary; // Toujours le vert principal
};

// Couleurs pour les statistiques et cartes
export const getCardColor = (role: string): string => {
  return Colors.primary + '20'; // Vert avec 20% d'opacité
};
