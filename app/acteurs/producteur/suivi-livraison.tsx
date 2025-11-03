import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function ProducteurSuiviLivraisonScreen() {
  const [livraisons, setLivraisons] = useState([
    {
      id: '1',
      produit: 'Tomates Bio',
      quantite: '50 kg',
      transporteur: 'Moussa Diop',
      telephone: '+221 77 123 45 67',
      vehicule: 'Camion 001',
      destination: 'Marché Sandaga, Dakar',
      statut: 'En cours',
      progression: 65,
      tempsRestant: '2h 30min',
      positionActuelle: 'Route de Thiès, km 45',
      derniereMiseAJour: 'Il y a 5 min',
      temperature: '4°C',
      humidite: '85%',
      coordonnees: {
        latitude: 14.6928,
        longitude: -17.4467
      },
      trajet: [
        { latitude: 14.6928, longitude: -17.4467, label: 'Départ - Ferme Diallo' },
        { latitude: 14.7167, longitude: -17.4672, label: 'En route vers Dakar' },
        { latitude: 14.7167, longitude: -17.4672, label: 'Arrivée - Marché Sandaga' }
      ]
    },
    {
      id: '2',
      produit: 'Riz Bio',
      quantite: '200 kg',
      transporteur: 'Amadou Fall',
      telephone: '+221 78 987 65 43',
      vehicule: 'Camion 002',
      destination: 'Entrepôt Thiès',
      statut: 'Livré',
      progression: 100,
      tempsRestant: 'Terminé',
      positionActuelle: 'Entrepôt Thiès',
      derniereMiseAJour: 'Il y a 1h',
      temperature: '18°C',
      humidite: '70%',
      coordonnees: {
        latitude: 14.7167,
        longitude: -17.4672
      },
      trajet: [
        { latitude: 14.6928, longitude: -17.4467, label: 'Départ - Ferme Ba' },
        { latitude: 14.7167, longitude: -17.4672, label: 'Arrivée - Entrepôt Thiès' }
      ]
    }
  ]);

  const [selectedLivraison, setSelectedLivraison] = useState(livraisons[0]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Simulation de mise à jour en temps réel
    const interval = setInterval(() => {
      setLivraisons(prevLivraisons => 
        prevLivraisons.map(livraison => {
          if (livraison.statut === 'En cours') {
            return {
              ...livraison,
              derniereMiseAJour: 'Il y a 2 min',
              progression: Math.min(livraison.progression + 1, 100)
            };
          }
          return livraison;
        })
      );
    }, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  const handleCallTransporteur = (livraison: any) => {
    Alert.alert(
      'Contacter le transporteur',
      `Voulez-vous contacter ${livraison.transporteur} ?\n\nTéléphone: ${livraison.telephone}`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Appeler',
          onPress: () => {
            Alert.alert(
              'Appel en cours',
              `Appel vers ${livraison.telephone}...\n\nLe transporteur sera notifié de votre appel.`,
              [{ text: 'OK' }]
            );
          }
        },
        {
          text: 'Message',
          onPress: () => {
            Alert.alert(
              'Message envoyé',
              `Message envoyé à ${livraison.transporteur}.\n\nIl recevra une notification et pourra vous répondre.`,
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const handleViewMap = (livraison: any) => {
    setSelectedLivraison(livraison);
    setShowMap(true);
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En cours': return '#FF9800';
      case 'Livré': return '#4CAF50';
      case 'En attente': return '#2196F3';
      case 'Retardé': return '#F44336';
      default: return '#999';
    }
  };

  const renderLivraison = (livraison: any) => (
    <View key={livraison.id} style={styles.livraisonCard}>
      <View style={styles.livraisonHeader}>
        <View style={styles.livraisonInfo}>
          <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
          <View style={styles.livraisonDetails}>
            <Text style={styles.livraisonProduit}>{livraison.produit}</Text>
            <Text style={styles.livraisonDestination}>Vers {livraison.destination}</Text>
          </View>
        </View>
        <View style={[styles.statutBadge, { backgroundColor: getStatutColor(livraison.statut) }]}>
          <Text style={styles.statutText}>{livraison.statut}</Text>
        </View>
      </View>

      <View style={styles.livraisonContent}>
        <View style={styles.livraisonRow}>
          <MaterialIcons name="person" size={16} color="#666" />
          <Text style={styles.livraisonLabel}>Transporteur:</Text>
          <Text style={styles.livraisonValue}>{livraison.transporteur}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <MaterialIcons name="inventory" size={16} color="#666" />
          <Text style={styles.livraisonLabel}>Quantité:</Text>
          <Text style={styles.livraisonValue}>{livraison.quantite}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <MaterialIcons name="local-shipping" size={16} color="#666" />
          <Text style={styles.livraisonLabel}>Véhicule:</Text>
          <Text style={styles.livraisonValue}>{livraison.vehicule}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.livraisonLabel}>Position:</Text>
          <Text style={styles.livraisonValue}>{livraison.positionActuelle}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.livraisonLabel}>Temps restant:</Text>
          <Text style={styles.livraisonValue}>{livraison.tempsRestant}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <MaterialIcons name="update" size={16} color="#666" />
          <Text style={styles.livraisonLabel}>Dernière MAJ:</Text>
          <Text style={styles.livraisonValue}>{livraison.derniereMiseAJour}</Text>
        </View>
      </View>

      {/* Barre de progression */}
      <View style={styles.progressionSection}>
        <Text style={styles.progressionLabel}>Progression: {livraison.progression}%</Text>
        <View style={styles.progressionBar}>
          <View 
            style={[
              styles.progressionFill, 
              { 
                width: `${livraison.progression}%`,
                backgroundColor: getStatutColor(livraison.statut)
              }
            ]} 
          />
        </View>
      </View>

      {/* Conditions de transport */}
      <View style={styles.conditionsSection}>
        <Text style={styles.conditionsTitle}>Conditions de Transport</Text>
        <View style={styles.conditionsRow}>
          <View style={styles.conditionItem}>
            <MaterialIcons name="thermostat" size={20} color="#FF5722" />
            <Text style={styles.conditionLabel}>Température</Text>
            <Text style={styles.conditionValue}>{livraison.temperature}</Text>
          </View>
          <View style={styles.conditionItem}>
            <MaterialIcons name="water-drop" size={20} color="#2196F3" />
            <Text style={styles.conditionLabel}>Humidité</Text>
            <Text style={styles.conditionValue}>{livraison.humidite}</Text>
          </View>
        </View>
      </View>

      <View style={styles.livraisonActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.mapButton]}
          onPress={() => handleViewMap(livraison)}
        >
          <MaterialIcons name="map" size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Voir Carte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => handleCallTransporteur(livraison)}
        >
          <MaterialIcons name="phone" size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Appeler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suivi de Livraison</Text>
        <TouchableOpacity onPress={() => Alert.alert('Actualiser', 'Données actualisées')}>
          <MaterialIcons name="refresh" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Statistiques */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{livraisons.length}</Text>
            <Text style={styles.statLabel}>Livraisons</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="schedule" size={24} color="#FF9800" />
            <Text style={styles.statValue}>{livraisons.filter(l => l.statut === 'En cours').length}</Text>
            <Text style={styles.statLabel}>En cours</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{livraisons.filter(l => l.statut === 'Livré').length}</Text>
            <Text style={styles.statLabel}>Livrées</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="schedule" size={24} color="#2196F3" />
            <Text style={styles.statValue}>{livraisons.filter(l => l.statut === 'En attente').length}</Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
        </View>

        {/* Liste des livraisons */}
        <View style={styles.livraisonsSection}>
          <Text style={styles.sectionTitle}>Mes Livraisons</Text>
          {livraisons.map(renderLivraison)}
        </View>
      </ScrollView>

      {/* Modal Carte */}
      {showMap && (
        <View style={styles.mapModal}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Suivi GPS - {selectedLivraison.produit}</Text>
            <TouchableOpacity onPress={() => setShowMap(false)}>
              <MaterialIcons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.mapContainer}>
            {/* Simulation de carte */}
            <View style={styles.mapPlaceholder}>
              <MaterialIcons name="map" size={60} color="#4CAF50" />
              <Text style={styles.mapPlaceholderText}>Carte GPS</Text>
              <Text style={styles.mapPlaceholderSubtext}>
                Position: {selectedLivraison.positionActuelle}
              </Text>
              <Text style={styles.mapPlaceholderSubtext}>
                Progression: {selectedLivraison.progression}%
              </Text>
            </View>
          </View>

          <View style={styles.mapInfo}>
            <View style={styles.mapInfoRow}>
              <MaterialIcons name="location-on" size={20} color="#4CAF50" />
              <Text style={styles.mapInfoText}>{selectedLivraison.positionActuelle}</Text>
            </View>
            <View style={styles.mapInfoRow}>
              <MaterialIcons name="schedule" size={20} color="#FF9800" />
              <Text style={styles.mapInfoText}>{selectedLivraison.tempsRestant}</Text>
            </View>
            <View style={styles.mapInfoRow}>
              <MaterialIcons name="person" size={20} color="#2196F3" />
              <Text style={styles.mapInfoText}>{selectedLivraison.transporteur}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color="#999" />
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/produits')}>
          <MaterialIcons name="eco" size={24} color="#999" />
          <Text style={styles.navLabel}>Produits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/scanner')}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#999" />
          <Text style={styles.navLabel}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/cultures')}>
          <MaterialIcons name="agriculture" size={24} color="#999" />
          <Text style={styles.navLabel}>Cultures</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/parametres')}>
          <MaterialIcons name="settings" size={24} color="#999" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
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
    fontSize: 20,
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
  livraisonsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  livraisonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  livraisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  livraisonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  livraisonDetails: {
    marginLeft: 12,
  },
  livraisonProduit: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  livraisonDestination: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statutBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statutText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  livraisonContent: {
    marginBottom: 15,
  },
  livraisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  livraisonLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    fontWeight: '500',
    minWidth: 100,
  },
  livraisonValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    marginLeft: 8,
  },
  progressionSection: {
    marginBottom: 15,
  },
  progressionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  progressionBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressionFill: {
    height: '100%',
    borderRadius: 4,
  },
  conditionsSection: {
    marginBottom: 15,
  },
  conditionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  conditionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  conditionItem: {
    alignItems: 'center',
    flex: 1,
  },
  conditionLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  conditionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  livraisonActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  mapButton: {
    backgroundColor: '#2196F3',
  },
  callButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  mapModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    margin: 20,
    borderRadius: 12,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 10,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  mapInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  mapInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapInfoText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 10,
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
