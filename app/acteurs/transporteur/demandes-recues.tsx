import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import DemandeLivraisonService from '../../../services/demandeLivraisonService';

export default function TransporteurDemandesRecuesScreen() {
  const demandeService = DemandeLivraisonService.getInstance();
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les demandes au montage du composant
  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    try {
      setLoading(true);
      const demandesData = await demandeService.getDemandesDisponibles();
      setDemandes(demandesData);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccepterDemande = async (id: string) => {
    Alert.alert(
      'Accepter la demande',
      'Voulez-vous accepter cette demande de livraison ?\n\nVous serez responsable de cette livraison.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Accepter',
          onPress: async () => {
            try {
              // Simuler les informations du transporteur connecté
              const transporteurNom = 'Moussa Diop';
              const transporteurTelephone = '+221 77 111 22 33';
              
              await demandeService.accepterDemande(id, transporteurNom, transporteurTelephone);
              await loadDemandes(); // Recharger les demandes
              
              Alert.alert(
                'Demande acceptée',
                'Vous avez accepté cette demande.\n\nVous pouvez maintenant contacter le producteur et commencer la livraison.',
                [
                  {
                    text: 'Voir Mes Livraisons',
                    onPress: () => router.push('/acteurs/transporteur/livraisons')
                  },
                  { text: 'OK' }
                ]
              );
            } catch (error) {
              console.error('Erreur lors de l\'acceptation:', error);
              Alert.alert('Erreur', 'Impossible d\'accepter la demande');
            }
          }
        }
      ]
    );
  };

  const handleRefuserDemande = async (id: string) => {
    Alert.alert(
      'Refuser la demande',
      'Voulez-vous refuser cette demande de livraison ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Refuser',
          style: 'destructive',
          onPress: async () => {
            try {
              await demandeService.refuserDemande(id);
              await loadDemandes(); // Recharger les demandes
              Alert.alert('Demande refusée', 'La demande a été supprimée de votre liste');
            } catch (error) {
              console.error('Erreur lors du refus:', error);
              Alert.alert('Erreur', 'Impossible de refuser la demande');
            }
          }
        }
      ]
    );
  };

  const handleContactProducteur = (demande: any) => {
    Alert.alert(
      'Contacter le producteur',
      `Voulez-vous contacter ${demande.producteur} ?\n\nTéléphone: ${demande.telephoneProducteur}`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Appeler',
          onPress: () => {
            Alert.alert('Appel', `Appel vers ${demande.telephoneProducteur}...`);
          }
        },
        {
          text: 'Message',
          onPress: () => {
            Alert.alert('Message', `Message envoyé à ${demande.producteur}`);
          }
        }
      ]
    );
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Disponible': return '#2196F3';
      case 'Acceptée': return '#4CAF50';
      case 'En cours': return '#FF9800';
      case 'Terminée': return '#4CAF50';
      default: return '#999';
    }
  };

  const renderDemande = (demande: any) => (
    <View key={demande.id} style={styles.demandeCard}>
      <View style={styles.demandeHeader}>
        <View style={styles.demandeInfo}>
          <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
          <View style={styles.demandeDetails}>
            <Text style={styles.demandeProduit}>{demande.produit}</Text>
            <Text style={styles.demandeDestination}>Vers {demande.destination}</Text>
          </View>
        </View>
        <View style={[styles.statutBadge, { backgroundColor: getStatutColor(demande.statut) }]}>
          <Text style={styles.statutText}>{demande.statut}</Text>
        </View>
      </View>

      <View style={styles.demandeContent}>
        <View style={styles.demandeRow}>
          <MaterialIcons name="person" size={16} color="#666" />
          <Text style={styles.demandeLabel}>Producteur:</Text>
          <Text style={styles.demandeValue}>{demande.producteur}</Text>
        </View>
        <View style={styles.demandeRow}>
          <MaterialIcons name="inventory" size={16} color="#666" />
          <Text style={styles.demandeLabel}>Quantité:</Text>
          <Text style={styles.demandeValue}>{demande.quantite}</Text>
        </View>
        <View style={styles.demandeRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.demandeLabel}>Origine:</Text>
          <Text style={styles.demandeValue}>{demande.origine}</Text>
        </View>
        <View style={styles.demandeRow}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.demandeLabel}>Date:</Text>
          <Text style={styles.demandeValue}>{demande.dateLivraison} à {demande.heureLivraison}</Text>
        </View>
        <View style={styles.demandeRow}>
          <MaterialIcons name="attach-money" size={16} color="#666" />
          <Text style={styles.demandeLabel}>Prix proposé:</Text>
          <Text style={styles.demandeValue}>{demande.prixPropose}</Text>
        </View>
        <View style={styles.demandeRow}>
          <MaterialIcons name="straighten" size={16} color="#666" />
          <Text style={styles.demandeLabel}>Distance:</Text>
          <Text style={styles.demandeValue}>{demande.distance} ({demande.tempsEstime})</Text>
        </View>
        {demande.description && (
          <View style={styles.demandeRow}>
            <MaterialIcons name="description" size={16} color="#666" />
            <Text style={styles.demandeLabel}>Description:</Text>
            <Text style={styles.demandeValue}>{demande.description}</Text>
          </View>
        )}
        {demande.conditionsSpeciales && (
          <View style={styles.demandeRow}>
            <MaterialIcons name="warning" size={16} color="#666" />
            <Text style={styles.demandeLabel}>Conditions:</Text>
            <Text style={styles.demandeValue}>{demande.conditionsSpeciales}</Text>
          </View>
        )}
      </View>

      <View style={styles.demandeActions}>
        {demande.statut === 'Disponible' && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => handleAccepterDemande(demande.id)}
            >
              <MaterialIcons name="check" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Accepter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#F44336' }]}
              onPress={() => handleRefuserDemande(demande.id)}
            >
              <MaterialIcons name="close" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Refuser</Text>
            </TouchableOpacity>
          </>
        )}
        {demande.statut === 'Acceptée' && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
              onPress={() => handleContactProducteur(demande)}
            >
              <MaterialIcons name="phone" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
              onPress={() => router.push('/acteurs/transporteur/livraisons')}
            >
              <MaterialIcons name="local-shipping" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Livrer</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Demandes de Transport</Text>
          <TouchableOpacity onPress={loadDemandes}>
            <MaterialIcons name="refresh" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Statistiques */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{demandes.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="schedule" size={24} color="#2196F3" />
            <Text style={styles.statValue}>{demandes.filter(d => d.statut === 'Disponible').length}</Text>
            <Text style={styles.statLabel}>Disponibles</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{demandes.filter(d => d.statut === 'Acceptée').length}</Text>
            <Text style={styles.statLabel}>Acceptées</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="trending-up" size={24} color="#FF9800" />
            <Text style={styles.statValue}>{demandes.filter(d => d.statut === 'En cours').length}</Text>
            <Text style={styles.statLabel}>En cours</Text>
          </View>
        </View>

        {/* Message d'information */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <MaterialIcons name="info" size={24} color="#2196F3" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Comment ça marche ?</Text>
              <Text style={styles.infoText}>
                • Les producteurs demandent un transport{'\n'}
                • Vous pouvez accepter ou refuser{'\n'}
                • Une fois acceptée, appelez le producteur{'\n'}
                • Suivez vos livraisons dans "Mes Livraisons"
              </Text>
            </View>
          </View>
        </View>

        {/* Liste des demandes */}
        <View style={styles.demandesSection}>
          <Text style={styles.sectionTitle}>Demandes Disponibles</Text>
          {demandes.map(renderDemande)}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  demandesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  demandeCard: {
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
  demandeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  demandeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  demandeDetails: {
    marginLeft: 12,
  },
  demandeProduit: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  demandeDestination: {
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
  demandeContent: {
    marginBottom: 15,
  },
  demandeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  demandeLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    fontWeight: '500',
    minWidth: 80,
  },
  demandeValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    marginLeft: 8,
  },
  demandeActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
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
