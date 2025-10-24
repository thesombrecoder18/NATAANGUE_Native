import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function TransactionDetailsScreen() {
  const { user, logout } = useAuth();

  // Données simulées détaillées de la transaction
  const transactionDetails = {
    id: '12345',
    productName: 'Tomates Bio - Lot A',
    productId: 'prod_001',
    quantity: '50 kg',
    status: 'Livré',
    statusColor: '#4CAF50',
    qrCode: 'QR_TOMATES_001',
    createdAt: '25 Octobre 2023',
    completedAt: '25 Octobre 2023',
    
    // Traçabilité complète
    traceability: [
      {
        step: 1,
        title: 'Production',
        actor: 'Mamadou Diallo',
        role: 'Producteur',
        location: 'Ferme Diallo, Thiès, Sénégal',
        timestamp: '25 Octobre 2023 - 08:00',
        status: 'Terminé',
        statusColor: '#4CAF50',
        details: 'Récolte de tomates biologiques - 50kg',
        coordinates: { latitude: 14.6928, longitude: -17.4467 }
      },
      {
        step: 2,
        title: 'Transport',
        actor: 'Ibrahima Traore',
        role: 'Transporteur',
        location: 'Dakar, Sénégal',
        timestamp: '25 Octobre 2023 - 14:30',
        status: 'Terminé',
        statusColor: '#4CAF50',
        details: 'Transport en camion réfrigéré - Température maintenue à 4°C',
        coordinates: { latitude: 14.7167, longitude: -17.4672 }
      },
      {
        step: 3,
        title: 'Distribution',
        actor: 'Aissatou Diop',
        role: 'Distributeur',
        location: 'Marché Sandaga, Dakar, Sénégal',
        timestamp: '25 Octobre 2023 - 16:00',
        status: 'Terminé',
        statusColor: '#4CAF50',
        details: 'Vente au détail - Prix: 1500 FCFA/kg',
        coordinates: { latitude: 14.7167, longitude: -17.4672 }
      }
    ],
    
    // Informations produit
    productInfo: {
      type: 'Légumes',
      variety: 'Tomates cerises',
      certification: 'Bio certifié',
      harvestDate: '24 Octobre 2023',
      expiryDate: '30 Octobre 2023',
      storage: 'Réfrigéré à 4°C',
      packaging: 'Cagettes en bois'
    },
    
    // Informations qualité
    qualityInfo: {
      temperature: '4°C',
      humidity: '85%',
      ph: '6.2',
      pesticides: 'Aucun',
      organic: 'Oui',
      certification: 'Certifié Bio'
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/(tabs)');
  };

  const getStatusDot = (statusColor: string) => (
    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
  );

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
        <Text style={styles.headerTitle}>Détails Transaction</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Informations générales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Générales</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID Transaction:</Text>
              <Text style={styles.infoValue}>#{transactionDetails.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Produit:</Text>
              <Text style={styles.infoValue}>{transactionDetails.productName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Quantité:</Text>
              <Text style={styles.infoValue}>{transactionDetails.quantity}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Statut:</Text>
              <View style={styles.statusContainer}>
                {getStatusDot(transactionDetails.statusColor)}
                <Text style={[styles.statusText, { color: transactionDetails.statusColor }]}>
                  {transactionDetails.status}
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>QR Code:</Text>
              <Text style={styles.infoValue}>{transactionDetails.qrCode}</Text>
            </View>
          </View>
        </View>

        {/* Traçabilité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traçabilité Complète</Text>
          {transactionDetails.traceability.map((step, index) => (
            <View key={index} style={styles.traceabilityCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.step}</Text>
                </View>
                <View style={styles.stepInfo}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepActor}>{step.actor} - {step.role}</Text>
                </View>
                <View style={styles.stepStatus}>
                  {getStatusDot(step.statusColor)}
                  <Text style={[styles.stepStatusText, { color: step.statusColor }]}>
                    {step.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.stepDetails}>
                <View style={styles.detailRow}>
                  <MaterialIcons name="location-on" size={16} color={Colors.roleColors.Administrateur} />
                  <Text style={styles.detailText}>{step.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="access-time" size={16} color={Colors.roleColors.Administrateur} />
                  <Text style={styles.detailText}>{step.timestamp}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="info" size={16} color={Colors.roleColors.Administrateur} />
                  <Text style={styles.detailText}>{step.details}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Informations produit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Produit</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type:</Text>
              <Text style={styles.infoValue}>{transactionDetails.productInfo.type}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Variété:</Text>
              <Text style={styles.infoValue}>{transactionDetails.productInfo.variety}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Certification:</Text>
              <Text style={styles.infoValue}>{transactionDetails.productInfo.certification}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date de récolte:</Text>
              <Text style={styles.infoValue}>{transactionDetails.productInfo.harvestDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date d'expiration:</Text>
              <Text style={styles.infoValue}>{transactionDetails.productInfo.expiryDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Stockage:</Text>
              <Text style={styles.infoValue}>{transactionDetails.productInfo.storage}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Emballage:</Text>
              <Text style={styles.infoValue}>{transactionDetails.productInfo.packaging}</Text>
            </View>
          </View>
        </View>

        {/* Informations qualité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Qualité</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Température:</Text>
              <Text style={styles.infoValue}>{transactionDetails.qualityInfo.temperature}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Humidité:</Text>
              <Text style={styles.infoValue}>{transactionDetails.qualityInfo.humidity}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>pH:</Text>
              <Text style={styles.infoValue}>{transactionDetails.qualityInfo.ph}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Pesticides:</Text>
              <Text style={styles.infoValue}>{transactionDetails.qualityInfo.pesticides}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Biologique:</Text>
              <Text style={styles.infoValue}>{transactionDetails.qualityInfo.organic}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Certification:</Text>
              <Text style={styles.infoValue}>{transactionDetails.qualityInfo.certification}</Text>
            </View>
          </View>
        </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  traceabilityCard: {
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
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.roleColors.Administrateur,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  stepActor: {
    fontSize: 14,
    color: '#666666',
  },
  stepStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepStatusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  stepDetails: {
    marginLeft: 44,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
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
