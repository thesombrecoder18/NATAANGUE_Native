import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function DistributeurDashboardScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.push('/(tabs)');
          }
        }
      ]
    );
  };

  const handleProfile = () => {
    console.log('Profil Distributeur');
  };

  const distributeurActions = [
    { icon: 'inventory', title: 'Mon Inventaire', action: () => console.log('Mon Inventaire') },
    { icon: 'qr-code-scanner', title: 'Scanner QR Code', action: () => console.log('Scanner QR Code') },
    { icon: 'sell', title: 'Vendre', action: () => console.log('Vendre') },
    { icon: 'store', title: 'Ma Boutique', action: () => console.log('Ma Boutique') },
    { icon: 'people', title: 'Clients', action: () => console.log('Clients') },
    { icon: 'history', title: 'Historique', action: () => console.log('Historique') },
  ];

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* En-tête avec informations utilisateur */}
      <View style={[styles.header, { backgroundColor: Colors.roleColors.Distributeur }]}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <MaterialIcons name="store" size={32} color="#FFFFFF" />
            <View style={styles.userDetails}>
              <Text style={styles.welcomeText}>Bonjour, {user.username} !</Text>
              <Text style={styles.roleText}>Distributeur</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.profileButton} onPress={handleProfile}>
              <MaterialIcons name="person" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Message de bienvenue */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Tableau de Bord Distributeur</Text>
          <Text style={styles.welcomeSubtitle}>
            Gérez votre inventaire et vendez des produits traçables à vos clients.
          </Text>
        </View>

        {/* Actions principales */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Actions Principales</Text>
          <View style={styles.actionsGrid}>
            {distributeurActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { borderColor: Colors.roleColors.Distributeur }]}
                onPress={action.action}
              >
                <MaterialIcons name={action.icon as any} size={32} color={Colors.roleColors.Distributeur} />
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Mes Statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: Colors.roleColors.Distributeur + '20' }]}>
              <MaterialIcons name="inventory" size={24} color={Colors.roleColors.Distributeur} />
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Produits</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: Colors.roleColors.Distributeur + '20' }]}>
              <MaterialIcons name="sell" size={24} color={Colors.roleColors.Distributeur} />
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Ventes</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: Colors.roleColors.Distributeur + '20' }]}>
              <MaterialIcons name="people" size={24} color={Colors.roleColors.Distributeur} />
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Clients</Text>
            </View>
          </View>
        </View>

        {/* Informations supplémentaires */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Mon Inventaire</Text>
          <View style={styles.infoCard}>
            <MaterialIcons name="inventory" size={20} color={Colors.roleColors.Distributeur} />
            <Text style={styles.infoText}>Tomates Bio - 25kg disponibles</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="inventory" size={20} color={Colors.roleColors.Distributeur} />
            <Text style={styles.infoText}>Oignons Bio - 50kg disponibles</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="inventory" size={20} color={Colors.roleColors.Distributeur} />
            <Text style={styles.infoText}>Riz Bio - En attente de réception</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userDetails: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  roleText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    marginRight: 15,
    padding: 8,
  },
  logoutButton: {
    padding: 8,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: Colors.backgroundWhite,
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '30%',
    backgroundColor: Colors.backgroundWhite,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: 8,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 12,
    flex: 1,
  },
});
