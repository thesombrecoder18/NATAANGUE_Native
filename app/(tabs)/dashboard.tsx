import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, getCardColor, getRoleColor } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/(tabs)');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Producteur': return 'agriculture';
      case 'Transporteur': return 'local-shipping';
      case 'Distributeur': return 'store';
      case 'Consommateur': return 'person';
      default: return 'person';
    }
  };

  // Utilisation du thème vert unifié
  const roleColor = getRoleColor(user?.role || '');

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'Producteur':
        return 'Gérez vos cultures, créez des lots et suivez vos récoltes pour une traçabilité complète.';
      case 'Transporteur':
        return 'Suivez et mettez à jour le statut de transport de vos produits dans la chaîne de traçabilité.';
      case 'Distributeur':
        return 'Gérez votre inventaire et vendez des produits traçables à vos clients.';
      case 'Consommateur':
        return 'Scannez les QR codes pour découvrir l\'histoire complète de vos produits.';
      default:
        return 'Bienvenue dans l\'écosystème de traçabilité agricole Naatangue.';
    }
  };

  const getRoleActions = (role: string) => {
    switch (role) {
      case 'Producteur':
        return [
          { icon: 'add-circle', title: 'Créer un Lot', action: () => {} },
          { icon: 'qr-code-scanner', title: 'Scanner QR Code', action: () => {} },
          { icon: 'assessment', title: 'Mes Récoltes', action: () => {} },
        ];
      case 'Transporteur':
        return [
          { icon: 'local-shipping', title: 'Mes Transports', action: () => {} },
          { icon: 'qr-code-scanner', title: 'Scanner QR Code', action: () => {} },
          { icon: 'update', title: 'Mettre à Jour', action: () => {} },
        ];
      case 'Distributeur':
        return [
          { icon: 'inventory', title: 'Mon Inventaire', action: () => {} },
          { icon: 'qr-code-scanner', title: 'Scanner QR Code', action: () => {} },
          { icon: 'sell', title: 'Vendre', action: () => {} },
        ];
      case 'Consommateur':
        return [
          { icon: 'qr-code-scanner', title: 'Scanner QR Code', action: () => {} },
          { icon: 'history', title: 'Mon Historique', action: () => {} },
          { icon: 'favorite', title: 'Mes Favoris', action: () => {} },
        ];
      default:
        return [];
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const roleIcon = getRoleIcon(user.role);
  const roleDescription = getRoleDescription(user.role);
  const roleActions = getRoleActions(user.role);

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec informations utilisateur */}
      <View style={[styles.header, { backgroundColor: roleColor }]}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name={roleIcon} size={40} color="#FFFFFF" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.username}</Text>
            <Text style={styles.userRole}>{user.role}</Text>
            <Text style={styles.userPhone}>{user.phone}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Message de bienvenue personnalisé */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Bienvenue, {user.username} !</Text>
        <Text style={styles.welcomeSubtitle}>Vous êtes connecté en tant que {user.role}</Text>
        <Text style={styles.roleDescription}>{roleDescription}</Text>
      </View>

      {/* Actions spécifiques au rôle */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Actions Disponibles</Text>
        <View style={styles.actionsGrid}>
          {roleActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { borderColor: roleColor }]}
              onPress={action.action}
            >
              <MaterialIcons name={action.icon} size={32} color={roleColor} />
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Statistiques rapides */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: getCardColor(user.role) }]}>
          <MaterialIcons name="trending-up" size={24} color={roleColor} />
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Activités</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: getCardColor(user.role) }]}>
          <MaterialIcons name="qr-code" size={24} color={roleColor} />
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>QR Scannés</Text>
        </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
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
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  roleDescription: {
    fontSize: 14,
    color: Colors.textLight,
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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
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
});
