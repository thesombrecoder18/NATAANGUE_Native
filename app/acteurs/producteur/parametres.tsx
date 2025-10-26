import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function ProducteurParametresScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/(tabs)');
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contacter le Support',
      'Besoin d\'aide ?\n\n• Téléphone: +221 33 123 45 67\n• Email: support@nataangue.sn\n• WhatsApp: +221 77 123 45 67',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Appeler', onPress: () => console.log('Appel support') }
      ]
    );
  };

  const handleHowToUse = () => {
    Alert.alert(
      'Comment utiliser l\'app',
      'Guide simple:\n\n• Ajouter vos produits\n• Marquer vos champs\n• Prendre des photos\n• Voir vos ventes',
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Voir guide', onPress: () => console.log('Ouverture guide') }
      ]
    );
  };

  const handleRefreshData = () => {
    Alert.alert(
      'Actualiser les données',
      'Vos données seront synchronisées avec le serveur',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Actualiser', onPress: () => {
          Alert.alert('Succès', 'Données actualisées');
        }}
      ]
    );
  };

  const handleAppInfo = () => {
    Alert.alert(
      'Informations sur l\'app',
      'Nataangue Mobile\nVersion 1.0.0\n\nApplication de traçabilité agricole pour les producteurs sénégalais',
      [
        { text: 'Fermer', style: 'cancel' }
      ]
    );
  };

  const settingsOptions = [
    {
      icon: 'phone',
      title: 'Contacter le Support',
      subtitle: 'Appeler ou envoyer un message',
      action: () => handleContactSupport()
    },
    {
      icon: 'help',
      title: 'Comment utiliser l\'app',
      subtitle: 'Guide simple d\'utilisation',
      action: () => handleHowToUse()
    },
    {
      icon: 'refresh',
      title: 'Actualiser les données',
      subtitle: 'Synchroniser avec le serveur',
      action: () => handleRefreshData()
    },
    {
      icon: 'info',
      title: 'Informations sur l\'app',
      subtitle: 'Version et détails de l\'application',
      action: () => handleAppInfo()
    }
  ];

  const handleOptionPress = (option: any) => {
    option.action();
  };

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
            <MaterialIcons name="info" size={20} color={Colors.roleColors.Producteur} />
            <Text style={styles.systemInfoText}>Version: 1.0.0</Text>
          </View>
          <View style={styles.systemInfoRow}>
            <MaterialIcons name="storage" size={20} color={Colors.roleColors.Producteur} />
            <Text style={styles.systemInfoText}>Base de données: Opérationnelle</Text>
          </View>
          <View style={styles.systemInfoRow}>
            <MaterialIcons name="security" size={20} color={Colors.roleColors.Producteur} />
            <Text style={styles.systemInfoText}>Sécurité: Activée</Text>
          </View>
          <View style={styles.systemInfoRow}>
            <MaterialIcons name="sync" size={20} color={Colors.roleColors.Producteur} />
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
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <MaterialIcons name={option.icon as any} size={24} color={Colors.roleColors.Producteur} />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Navigation Bottom */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/produits')}>
          <MaterialIcons name="eco" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Produits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/scanner')}>
          <MaterialIcons name="qr-code-scanner" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/cultures')}>
          <MaterialIcons name="agriculture" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Cultures</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/parametres')}>
          <MaterialIcons name="settings" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Paramètres</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuButton: {
    padding: 8,
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
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
});
