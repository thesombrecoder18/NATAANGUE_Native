import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function AdministrateurSettingsScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    // Logique de déconnexion
    await logout();
    router.push('/(tabs)');
  };

  const handleSecuritySettings = () => {
    Alert.alert(
      'Paramètres de Sécurité',
      'Fonctionnalités de sécurité:\n\n• Authentification à deux facteurs\n• Historique des connexions\n• Gestion des sessions\n• Politique de mots de passe',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Configurer', onPress: () => console.log('Configuration sécurité') }
      ]
    );
  };

  const handleLanguageSettings = () => {
    Alert.alert(
      'Paramètres de Langue',
      'Langues disponibles:\n\n• Français (actuel)\n• Anglais\n• Arabe\n• Wolof',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Changer', onPress: () => console.log('Changement de langue') }
      ]
    );
  };

  const handleBackupSettings = () => {
    Alert.alert(
      'Sauvegarde des Données',
      'Options de sauvegarde:\n\n• Sauvegarde automatique: Activée\n• Fréquence: Quotidienne\n• Dernière sauvegarde: Aujourd\'hui\n• Stockage: Local',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Sauvegarder', onPress: () => console.log('Sauvegarde manuelle') }
      ]
    );
  };

  const handleAnalyticsSettings = () => {
    Alert.alert(
      'Paramètres Analytics',
      'Statistiques disponibles:\n\n• Utilisateurs actifs\n• Transactions par jour\n• Performance système\n• Rapports détaillés',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Voir', onPress: () => console.log('Affichage analytics') }
      ]
    );
  };

  const handleStorageSettings = () => {
    Alert.alert(
      'Gestion du Stockage',
      'Informations de stockage:\n\n• Données utilisateurs: 2.5 MB\n• Transactions: 1.8 MB\n• Cache: 0.7 MB\n• Espace libre: 15.2 GB',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Nettoyer', onPress: () => console.log('Nettoyage du cache') }
      ]
    );
  };

  const handleHelpSettings = () => {
    Alert.alert(
      'Centre d\'Aide',
      'Ressources d\'aide:\n\n• Guide d\'utilisation\n• FAQ\n• Contact support\n• Documentation',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Ouvrir', onPress: () => console.log('Ouverture centre d\'aide') }
      ]
    );
  };

  const settingsOptions = [
    {
      icon: 'security',
      title: 'Sécurité',
      subtitle: 'Paramètres de sécurité',
      action: () => handleSecuritySettings()
    },
    {
      icon: 'language',
      title: 'Langue',
      subtitle: 'Français',
      action: () => handleLanguageSettings()
    },
    {
      icon: 'backup',
      title: 'Sauvegarde',
      subtitle: 'Dernière sauvegarde: Aujourd\'hui',
      action: () => handleBackupSettings()
    },
    {
      icon: 'analytics',
      title: 'Analytics',
      subtitle: 'Statistiques et rapports',
      action: () => handleAnalyticsSettings()
    },
    {
      icon: 'storage',
      title: 'Stockage',
      subtitle: 'Gestion des données',
      action: () => handleStorageSettings()
    },
    {
      icon: 'help',
      title: 'Aide',
      subtitle: 'Centre d\'aide et support',
      action: () => handleHelpSettings()
    }
  ];

  const handleOptionPress = (option: any) => {
    option.action();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Informations système */}
      <View style={styles.systemInfoSection}>
        <Text style={styles.systemInfoTitle}>Informations Système</Text>
        <View style={styles.systemInfoCard}>
          <View style={styles.systemInfoRow}>
            <MaterialIcons name="info" size={20} color={Colors.roleColors.Administrateur} />
            <Text style={styles.systemInfoText}>Version: 1.0.0</Text>
          </View>
          <View style={styles.systemInfoRow}>
            <MaterialIcons name="storage" size={20} color={Colors.roleColors.Administrateur} />
            <Text style={styles.systemInfoText}>Base de données: Opérationnelle</Text>
          </View>
          <View style={styles.systemInfoRow}>
            <MaterialIcons name="security" size={20} color={Colors.roleColors.Administrateur} />
            <Text style={styles.systemInfoText}>Sécurité: Activée</Text>
          </View>
          <View style={styles.systemInfoRow}>
            <MaterialIcons name="sync" size={20} color={Colors.roleColors.Administrateur} />
            <Text style={styles.systemInfoText}>Synchronisation: En temps réel</Text>
          </View>
        </View>
      </View>

      {/* Liste des options */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => handleOptionPress(option)}
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconContainer}>
                <MaterialIcons name={option.icon as any} size={24} color={Colors.roleColors.Administrateur} />
              </View>
            </View>
            
            <View style={styles.optionMiddle}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </View>
            
            <View style={styles.optionRight}>
              <MaterialIcons name="chevron-right" size={20} color="#666666" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/acteurs/administrateur/dashboard')}
        >
          <MaterialIcons name="dashboard" size={24} color="#4CAF50" />
          <Text style={[styles.navText, { color: '#4CAF50' }]}>Tableau de bord</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/acteurs/administrateur/transactions')}
        >
          <MaterialIcons name="receipt" size={24} color="#4CAF50" />
          <Text style={[styles.navText, { color: '#4CAF50' }]}>Transactions</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/acteurs/administrateur/users')}
        >
          <MaterialIcons name="people" size={24} color="#4CAF50" />
          <Text style={[styles.navText, { color: '#4CAF50' }]}>Utilisateurs</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color="#4CAF50" />
          <Text style={[styles.navText, { color: '#4CAF50' }]}>Paramètres</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionLeft: {
    marginRight: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.roleColors.Administrateur,
  },
  optionMiddle: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  systemInfoSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  systemInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  systemInfoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  systemInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  systemInfoText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 12,
    flex: 1,
  },
});
