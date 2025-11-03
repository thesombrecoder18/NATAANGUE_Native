export type AppNotification = {
  id: string;
  title: string;
  message: string;
  createdAt: number;
  roleTarget?: 'Producteur' | 'Transporteur' | 'Distributeur' | 'Tous';
};

type Listener = (n: AppNotification) => void;

class NotificationService {
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(notification: Omit<AppNotification, 'id' | 'createdAt'>) {
    const n: AppNotification = {
      id: Date.now().toString(),
      createdAt: Date.now(),
      ...notification,
    };
    this.listeners.forEach(l => l(n));
  }
}

export const notificationService = new NotificationService();


