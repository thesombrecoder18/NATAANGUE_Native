import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function AdministrateurTransactionsScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    // Logique de déconnexion
    await logout();
    router.push('/(tabs)');
  };

  // Données simulées des transactions
  const transactions = [
    {
      id: '12345',
      date: '25 Octobre 2023',
      status: 'Livré',
      statusColor: '#4CAF50',
      icon: 'local-shipping',
      type: 'Transport'
    },
    {
      id: '67890',
      date: '24 Octobre 2023',
      status: 'En cours',
      statusColor: '#FF9800',
      icon: 'motorcycle',
      type: 'Livraison'
    },
    {
      id: '54321',
      date: '23 Octobre 2023',
      status: 'Annulé',
      statusColor: '#F44336',
      icon: 'store',
      type: 'Vente'
    },
    {
      id: '98765',
      date: '22 Octobre 2023',
      status: 'Livré',
      statusColor: '#4CAF50',
      icon: 'receipt',
      type: 'Facture'
    },
    {
      id: '11223',
      date: '21 Octobre 2023',
      status: 'En cours',
      statusColor: '#FF9800',
      icon: 'person',
      type: 'Utilisateur'
    }
  ];

  const getStatusDot = (statusColor: string) => (
    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
  );

  const handleTransactionPress = (transactionId: string) => {
    console.log('Transaction sélectionnée:', transactionId);
    router.push('/acteurs/administrateur/transaction-details');
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
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Liste des transactions */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {transactions.map((transaction, index) => (
          <TouchableOpacity
            key={index}
            style={styles.transactionCard}
            onPress={() => handleTransactionPress(transaction.id)}
          >
            <View style={styles.transactionLeft}>
              <View style={styles.iconContainer}>
                <MaterialIcons name={transaction.icon as any} size={24} color={Colors.roleColors.Administrateur} />
              </View>
            </View>
            
            <View style={styles.transactionMiddle}>
              <Text style={styles.transactionId}>Transaction #{transaction.id}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            
            <View style={styles.transactionRight}>
              <View style={styles.statusContainer}>
                {getStatusDot(transaction.statusColor)}
                <Text style={[styles.statusText, { color: transaction.statusColor }]}>
                  {transaction.status}
                </Text>
              </View>
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
        
        <TouchableOpacity style={styles.navItem}>
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
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/acteurs/administrateur/settings')}
        >
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
  transactionCard: {
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
  transactionLeft: {
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
  transactionMiddle: {
    flex: 1,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666666',
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
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
});
