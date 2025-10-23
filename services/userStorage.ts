import { Platform } from 'react-native';

export interface User {
  id: string;
  username: string;
  phone: string;
  email?: string;
  password: string;
  role: 'Producteur' | 'Transporteur' | 'Distributeur' | 'Consommateur';
  createdAt: string;
}

export interface PasswordResetCode {
  email: string;
  code: string;
  attempts: number;
  createdAt: string;
  expiresAt: string;
}

// Stockage local simple avec localStorage (web) ou AsyncStorage (mobile)
const getStorage = () => {
  if (Platform.OS === 'web') {
    return {
      getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
      setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
      removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
    };
  } else {
    // Pour React Native, on utilise un stockage en mémoire temporaire
    return {
      getItem: (key: string) => Promise.resolve(null),
      setItem: (key: string, value: string) => Promise.resolve(),
      removeItem: (key: string) => Promise.resolve(),
    };
  }
};

const USERS_KEY = '@naatangue_users';
const CURRENT_USER_KEY = '@naatangue_current_user';
const RESET_CODES_KEY = '@naatangue_reset_codes';

// Stockage temporaire en mémoire
let memoryStorage: { [key: string]: string } = {};

export class UserStorage {
  // Sauvegarder un nouvel utilisateur
  static async saveUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    try {
      const users = await this.getAllUsers();
      const newUser: User = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      users.push(newUser);
      const storage = getStorage();
      await storage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Stockage en mémoire pour React Native
      if (Platform.OS !== 'web') {
        memoryStorage[USERS_KEY] = JSON.stringify(users);
      }
      
      return newUser;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
      throw error;
    }
  }

  // Récupérer tous les utilisateurs
  static async getAllUsers(): Promise<User[]> {
    try {
      const storage = getStorage();
      let usersJson = await storage.getItem(USERS_KEY);
      
      // Fallback sur le stockage en mémoire pour React Native
      if (!usersJson && Platform.OS !== 'web') {
        usersJson = memoryStorage[USERS_KEY];
      }
      
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return [];
    }
  }

  // Authentifier un utilisateur
  static async authenticateUser(identifier: string, password: string): Promise<User | null> {
    try {
      const users = await this.getAllUsers();
      const user = users.find(u => 
        (u.username === identifier || u.phone === identifier || u.email === identifier) && 
        u.password === password
      );
      return user || null;
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      return null;
    }
  }

  // Sauvegarder l'utilisateur connecté
  static async setCurrentUser(user: User): Promise<void> {
    try {
      const storage = getStorage();
      await storage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      
      // Stockage en mémoire pour React Native
      if (Platform.OS !== 'web') {
        memoryStorage[CURRENT_USER_KEY] = JSON.stringify(user);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'utilisateur connecté:', error);
    }
  }

  // Récupérer l'utilisateur connecté
  static async getCurrentUser(): Promise<User | null> {
    try {
      const storage = getStorage();
      let userJson = await storage.getItem(CURRENT_USER_KEY);
      
      // Fallback sur le stockage en mémoire pour React Native
      if (!userJson && Platform.OS !== 'web') {
        userJson = memoryStorage[CURRENT_USER_KEY];
      }
      
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error);
      return null;
    }
  }

  // Déconnecter l'utilisateur
  static async logout(): Promise<void> {
    try {
      const storage = getStorage();
      await storage.removeItem(CURRENT_USER_KEY);
      
      // Nettoyer le stockage en mémoire pour React Native
      if (Platform.OS !== 'web') {
        delete memoryStorage[CURRENT_USER_KEY];
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }

  // Vérifier si un utilisateur existe déjà
  static async userExists(identifier: string): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      return users.some(u => 
        u.username === identifier || u.phone === identifier || u.email === identifier
      );
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      return false;
    }
  }

  // Générer un code de réinitialisation
  static generateResetCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Sauvegarder un code de réinitialisation
  static async saveResetCode(email: string, code: string): Promise<void> {
    try {
      const resetCodes = await this.getAllResetCodes();
      const newResetCode: PasswordResetCode = {
        email,
        code,
        attempts: 0,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
      };
      
      // Supprimer les anciens codes pour cet email
      const filteredCodes = resetCodes.filter(rc => rc.email !== email);
      filteredCodes.push(newResetCode);
      
      const storage = getStorage();
      await storage.setItem(RESET_CODES_KEY, JSON.stringify(filteredCodes));
      
      if (Platform.OS !== 'web') {
        memoryStorage[RESET_CODES_KEY] = JSON.stringify(filteredCodes);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du code de réinitialisation:', error);
    }
  }

  // Récupérer tous les codes de réinitialisation
  static async getAllResetCodes(): Promise<PasswordResetCode[]> {
    try {
      const storage = getStorage();
      let codesJson = await storage.getItem(RESET_CODES_KEY);
      
      if (!codesJson && Platform.OS !== 'web') {
        codesJson = memoryStorage[RESET_CODES_KEY];
      }
      
      return codesJson ? JSON.parse(codesJson) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des codes:', error);
      return [];
    }
  }

  // Vérifier un code de réinitialisation
  static async verifyResetCode(email: string, code: string): Promise<boolean> {
    try {
      const resetCodes = await this.getAllResetCodes();
      const resetCode = resetCodes.find(rc => rc.email === email && rc.code === code);
      
      if (!resetCode) {
        return false;
      }
      
      // Vérifier si le code n'a pas expiré
      const now = new Date();
      const expiresAt = new Date(resetCode.expiresAt);
      
      if (now > expiresAt) {
        // Supprimer le code expiré
        await this.removeResetCode(email);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification du code:', error);
      return false;
    }
  }

  // Incrémenter les tentatives de code
  static async incrementResetAttempts(email: string): Promise<boolean> {
    try {
      const resetCodes = await this.getAllResetCodes();
      const resetCode = resetCodes.find(rc => rc.email === email);
      
      if (!resetCode) {
        return false;
      }
      
      resetCode.attempts += 1;
      
      const storage = getStorage();
      await storage.setItem(RESET_CODES_KEY, JSON.stringify(resetCodes));
      
      if (Platform.OS !== 'web') {
        memoryStorage[RESET_CODES_KEY] = JSON.stringify(resetCodes);
      }
      
      return resetCode.attempts < 3;
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des tentatives:', error);
      return false;
    }
  }

  // Supprimer un code de réinitialisation
  static async removeResetCode(email: string): Promise<void> {
    try {
      const resetCodes = await this.getAllResetCodes();
      const filteredCodes = resetCodes.filter(rc => rc.email !== email);
      
      const storage = getStorage();
      await storage.setItem(RESET_CODES_KEY, JSON.stringify(filteredCodes));
      
      if (Platform.OS !== 'web') {
        memoryStorage[RESET_CODES_KEY] = JSON.stringify(filteredCodes);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du code:', error);
    }
  }

  // Mettre à jour le mot de passe d'un utilisateur
  static async updateUserPassword(email: string, newPassword: string): Promise<boolean> {
    try {
      const users = await this.getAllUsers();
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        return false;
      }
      
      users[userIndex].password = newPassword;
      
      const storage = getStorage();
      await storage.setItem(USERS_KEY, JSON.stringify(users));
      
      if (Platform.OS !== 'web') {
        memoryStorage[USERS_KEY] = JSON.stringify(users);
      }
      
      // Supprimer le code de réinitialisation après utilisation
      await this.removeResetCode(email);
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error);
      return false;
    }
  }
}
