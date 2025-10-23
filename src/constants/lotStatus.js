// Statuts des lots dans le système NAATANGUE
export const LOT_STATUS = {
  CREATED: 'created',
  IN_TRANSPORT: 'in_transport',
  IN_STORAGE: 'in_storage',
  IN_DISTRIBUTION: 'in_distribution',
  VERIFIED: 'verified',
  COMPLETED: 'completed',
};

export const STATUS_LABELS = {
  [LOT_STATUS.CREATED]: 'Créé',
  [LOT_STATUS.IN_TRANSPORT]: 'En Transport',
  [LOT_STATUS.IN_STORAGE]: 'En Stockage',
  [LOT_STATUS.IN_DISTRIBUTION]: 'En Distribution',
  [LOT_STATUS.VERIFIED]: 'Vérifié',
  [LOT_STATUS.COMPLETED]: 'Terminé',
};

export const STATUS_DESCRIPTIONS = {
  [LOT_STATUS.CREATED]: 'Le lot a été créé par le producteur',
  [LOT_STATUS.IN_TRANSPORT]: 'Le lot est en cours de transport',
  [LOT_STATUS.IN_STORAGE]: 'Le lot est stocké chez le distributeur',
  [LOT_STATUS.IN_DISTRIBUTION]: 'Le lot est en cours de distribution',
  [LOT_STATUS.VERIFIED]: 'Le lot a été vérifié par le consommateur',
  [LOT_STATUS.COMPLETED]: 'Le cycle de traçabilité est terminé',
};

export const STATUS_COLORS = {
  [LOT_STATUS.CREATED]: '#4CAF50',
  [LOT_STATUS.IN_TRANSPORT]: '#2196F3',
  [LOT_STATUS.IN_STORAGE]: '#FF9800',
  [LOT_STATUS.IN_DISTRIBUTION]: '#9C27B0',
  [LOT_STATUS.VERIFIED]: '#4CAF50',
  [LOT_STATUS.COMPLETED]: '#4CAF50',
};

export const STATUS_FLOW = [
  LOT_STATUS.CREATED,
  LOT_STATUS.IN_TRANSPORT,
  LOT_STATUS.IN_STORAGE,
  LOT_STATUS.IN_DISTRIBUTION,
  LOT_STATUS.VERIFIED,
  LOT_STATUS.COMPLETED,
];

export default LOT_STATUS;
