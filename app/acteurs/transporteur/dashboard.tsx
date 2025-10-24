import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function TransporteurDashboardScreen() {
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
    console.log('Profil Transporteur');
  };

  const transporteurActions = [
    { icon: 'local-shipping', title: 'Mes Transports', action: () => console.log('Mes Transports') },
    { icon: 'qr-code-scanner', title: 'Scanner QR Code', action: () => console.log('Scanner QR Code') },
    { icon: 'update', title: 'Mettre à Jour', action: () => console.log('Mettre à Jour') },
    { icon: 'location-on', title: 'Suivi GPS', action: () => console.log('Suivi GPS') },
    { icon: 'schedule', title: 'Planning', action: () => console.log('Planning') },
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
      <View style={[styles.header, { backgroundColor: Colors.roleColors.Transporteur }]}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <MaterialIcons name="local-shipping" size={32} color="#FFFFFF" />
            <View style={styles.userDetails}>
              <Text style={styles.welcomeText}>Bonjour, {user.username} !</Text>
              <Text style={styles.roleText}>Transporteur</Text>
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
          <Text style={styles.welcomeTitle}>Tableau de Bord Transporteur</Text>
          <Text style={styles.welcomeSubtitle}>
            Suivez et mettez à jour le statut de transport de vos produits dans la chaîne de traçabilité.
          </Text>
        </View>

        {/* Actions principales */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Actions Principales</Text>
          <View style={styles.actionsGrid}>
            {transporteurActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { borderColor: Colors.roleColors.Transporteur }]}
                onPress={action.action}
              >
                <MaterialIcons name={action.icon as any} size={32} color={Colors.roleColors.Transporteur} />
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Mes Statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: Colors.roleColors.Transporteur + '20' }]}>
              <MaterialIcons name="local-shipping" size={24} color={Colors.roleColors.Transporteur} />
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Transports</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: Colors.roleColors.Transporteur + '20' }]}>
              <MaterialIcons name="trending-up" size={24} color={Colors.roleColors.Transporteur} />
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>En Cours</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: Colors.roleColors.Transporteur + '20' }]}>
              <MaterialIcons name="check-circle" size={24} color={Colors.roleColors.Transporteur} />
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Terminés</Text>
            </View>
          </View>
        </View>

        {/* Informations supplémentaires */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Mes Transports</Text>
          <View style={styles.infoCard}>
            <MaterialIcons name="local-shipping" size={20} color={Colors.roleColors.Transporteur} />
            <Text style={styles.infoText}>Tomates Bio - En cours de transport</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="local-shipping" size={20} color={Colors.roleColors.Transporteur} />
            <Text style={styles.infoText}>Oignons Bio - Livraison terminée</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="local-shipping" size={20} color={Colors.roleColors.Transporteur} />
            <Text style={styles.infoText}>Riz Bio - En attente de chargement</Text>
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
