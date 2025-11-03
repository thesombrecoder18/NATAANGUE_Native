import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

export default function TransporteurParametresScreen() {
  const handleSettingPress = (setting: string) => {
    Alert.alert(
      setting,
      `Fonctionnalité "${setting}" en cours de développement. Elle sera disponible dans une prochaine mise à jour.`,
      [{ text: 'OK' }]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contacter le Support',
      'Vous pouvez nous contacter par :\n\n📞 Téléphone: +221 33 123 45 67\n📧 Email: support@nataangue.sn\n💬 WhatsApp: +221 77 123 45 67',
      [{ text: 'OK' }]
    );
  };

  const handleAppInfo = () => {
    Alert.alert(
      'Informations sur l\'application',
      'Nataangue Mobile - Transporteur\n\nVersion: 1.0.0\nDéveloppé pour les transporteurs sénégalais\n\nApplication de traçabilité agricole pour la gestion des livraisons et entrepôts.',
      [{ text: 'OK' }]
    );
  };

  const handleHelp = () => {
    router.push('/guide-utilisation');
  };

  const handleRefreshData = () => {
    Alert.alert(
      'Actualiser les données',
      'Synchronisation avec le serveur en cours...',
      [{ text: 'OK' }]
    );
  };

  const settingsOptions = [
    {
      icon: 'phone',
      title: 'Contacter le Support',
      description: 'Appeler ou envoyer un message',
      onPress: handleContactSupport,
      color: '#2196F3'
    },
    {
      icon: 'help',
      title: 'Comment utiliser l\'app',
      description: 'Guide simple d\'utilisation',
      onPress: handleHelp,
      color: '#4CAF50'
    },
    {
      icon: 'refresh',
      title: 'Actualiser les données',
      description: 'Synchroniser avec le serveur',
      onPress: handleRefreshData,
      color: '#FF9800'
    },
    {
      icon: 'info',
      title: 'Informations sur l\'app',
      description: 'Version et détails de l\'application',
      onPress: handleAppInfo,
      color: '#9C27B0'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#4CAF50' }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Paramètres</Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Informations système */}
        <View style={styles.systemInfoSection}>
          <Text style={styles.sectionTitle}>Informations Système</Text>
          <View style={styles.systemInfoCard}>
            <View style={styles.systemInfoRow}>
              <MaterialIcons name="phone-android" size={20} color="#4CAF50" />
              <Text style={styles.systemInfoText}>Nataangue Mobile - Transporteur</Text>
            </View>
            <View style={styles.systemInfoRow}>
              <MaterialIcons name="update" size={20} color="#4CAF50" />
              <Text style={styles.systemInfoText}>Version 1.0.0</Text>
            </View>
            <View style={styles.systemInfoRow}>
              <MaterialIcons name="storage" size={20} color="#4CAF50" />
              <Text style={styles.systemInfoText}>Stockage local activé</Text>
            </View>
            <View style={styles.systemInfoRow}>
              <MaterialIcons name="sync" size={20} color="#4CAF50" />
              <Text style={styles.systemInfoText}>Synchronisation automatique</Text>
            </View>
          </View>
        </View>

        {/* Options principales */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Options</Text>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={option.onPress}
            >
              <View style={styles.optionContent}>
                <View style={[styles.optionIcon, { backgroundColor: option.color + '20' }]}>
                  <MaterialIcons name={option.icon as any} size={24} color={option.color} />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Informations sur le rôle */}
        <View style={styles.roleInfoSection}>
          <Text style={styles.sectionTitle}>Rôle Transporteur</Text>
          <View style={styles.roleInfoCard}>
            <View style={styles.roleInfoRow}>
              <MaterialIcons name="local-shipping" size={20} color="#4CAF50" />
              <Text style={styles.roleInfoText}>Gestion des livraisons</Text>
            </View>
            <View style={styles.roleInfoRow}>
              <MaterialIcons name="warehouse" size={20} color="#4CAF50" />
              <Text style={styles.roleInfoText}>Gestion des entrepôts</Text>
            </View>
            <View style={styles.roleInfoRow}>
              <MaterialIcons name="qr-code-scanner" size={20} color="#4CAF50" />
              <Text style={styles.roleInfoText}>Scan des produits</Text>
            </View>
            <View style={styles.roleInfoRow}>
              <MaterialIcons name="track-changes" size={20} color="#4CAF50" />
              <Text style={styles.roleInfoText}>Traçabilité complète</Text>
            </View>
          </View>
        </View>

        {/* Statistiques d'utilisation */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques d'Utilisation</Text>
          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Livraisons effectuées</Text>
              <Text style={styles.statValue}>24</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Produits transportés</Text>
              <Text style={styles.statValue}>156</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Entrepôts gérés</Text>
              <Text style={styles.statValue}>2</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Codes scannés</Text>
              <Text style={styles.statValue}>89</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color="#999" />
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/livraisons')}>
          <MaterialIcons name="local-shipping" size={24} color="#999" />
          <Text style={styles.navLabel}>Livraisons</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/scanner')}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#999" />
          <Text style={styles.navLabel}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/entrepots')}>
          <MaterialIcons name="warehouse" size={24} color="#999" />
          <Text style={styles.navLabel}>Entrepôts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/parametres')}>
          <MaterialIcons name="settings" size={24} color="#4CAF50" />
          <Text style={styles.navLabel}>Paramètres</Text>
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 24,
  },
  scrollContainer: {
    flex: 1,
  },
  systemInfoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  systemInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  systemInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  systemInfoText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  optionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  roleInfoSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  roleInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roleInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  roleInfoText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-evenly',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
});
