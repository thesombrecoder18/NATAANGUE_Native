// Rôles des utilisateurs dans l'application NAATANGUE
export const USER_ROLES = {
  PRODUCER: 'producer',
  TRANSPORTER: 'transporter',
  DISTRIBUTOR: 'distributor',
  CONSUMER: 'consumer',
};

export const ROLE_LABELS = {
  [USER_ROLES.PRODUCER]: 'Producteur',
  [USER_ROLES.TRANSPORTER]: 'Transporteur',
  [USER_ROLES.DISTRIBUTOR]: 'Distributeur',
  [USER_ROLES.CONSUMER]: 'Consommateur',
};

export const ROLE_DESCRIPTIONS = {
  [USER_ROLES.PRODUCER]: 'Crée et gère les lots de produits agricoles',
  [USER_ROLES.TRANSPORTER]: 'Transporte les produits entre les acteurs',
  [USER_ROLES.DISTRIBUTOR]: 'Distribue et vend les produits',
  [USER_ROLES.CONSUMER]: 'Vérifie et évalue la qualité des produits',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.PRODUCER]: [
    'create_lot',
    'update_lot_status',
    'view_own_lots',
    'scan_qr_code',
  ],
  [USER_ROLES.TRANSPORTER]: [
    'scan_qr_code',
    'update_transport_status',
    'view_transport_lots',
  ],
  [USER_ROLES.DISTRIBUTOR]: [
    'scan_qr_code',
    'update_distribution_status',
    'view_distribution_lots',
  ],
  [USER_ROLES.CONSUMER]: [
    'scan_qr_code',
    'view_lot_history',
    'rate_product',
    'add_comment',
  ],
};

export default USER_ROLES;
