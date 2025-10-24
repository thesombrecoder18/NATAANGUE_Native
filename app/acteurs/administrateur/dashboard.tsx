import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function AdministrateurDashboardScreen() {
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
    router.push('/acteurs/administrateur/profile');
  };

  const administrateurActions = [
    { icon: 'dashboard', title: 'Tableau de Bord', action: () => console.log('Tableau de Bord') },
    { icon: 'list-alt', title: 'Liste des Transactions', action: () => router.push('/acteurs/administrateur/transactions') },
    { icon: 'people', title: 'Gestion Utilisateurs', action: () => router.push('/acteurs/administrateur/users') },
    { icon: 'settings', title: 'Paramètres', action: () => router.push('/acteurs/administrateur/settings') },
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
      <View style={[styles.header, { backgroundColor: Colors.roleColors.Administrateur }]}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <MaterialIcons name="admin-panel-settings" size={32} color="#FFFFFF" />
            <View style={styles.userDetails}>
              <Text style={styles.welcomeText}>Bienvenue, {user.username} !</Text>
              <Text style={styles.roleText}>Administrateur</Text>
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
          <Text style={styles.welcomeTitle}>Tableau de Bord Administrateur</Text>
          <Text style={styles.welcomeSubtitle}>
            Gérez le système, surveillez les transactions et assurez la traçabilité complète de la chaîne agricole.
          </Text>
        </View>

        {/* Actions principales */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Actions Principales</Text>
          <View style={styles.actionsGrid}>
            {administrateurActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { borderColor: Colors.roleColors.Administrateur }]}
                onPress={action.action}
              >
                <MaterialIcons name={action.icon as any} size={32} color={Colors.roleColors.Administrateur} />
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques Globales</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: '#E8F5E8' }]}>
              <MaterialIcons name="people" size={24} color={Colors.roleColors.Administrateur} />
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Utilisateurs</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#E8F5E8' }]}>
              <MaterialIcons name="swap-horiz" size={24} color={Colors.roleColors.Administrateur} />
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Transactions</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#E8F5E8' }]}>
              <MaterialIcons name="trending-up" size={24} color={Colors.roleColors.Administrateur} />
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statLabel}>Actives</Text>
            </View>
          </View>
        </View>

        {/* Informations supplémentaires */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informations Système</Text>
          <View style={styles.infoCard}>
            <MaterialIcons name="info" size={20} color={Colors.roleColors.Administrateur} />
            <Text style={styles.infoText}>Système de traçabilité opérationnel</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="security" size={20} color={Colors.roleColors.Administrateur} />
            <Text style={styles.infoText}>Sécurité blockchain activée</Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="sync" size={20} color={Colors.roleColors.Administrateur} />
            <Text style={styles.infoText}>Synchronisation en temps réel</Text>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.roleColors.Administrateur,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
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
    backgroundColor: '#E8F5E8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
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
  infoText: {
    fontSize: 15,
    color: '#333333',
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
});
