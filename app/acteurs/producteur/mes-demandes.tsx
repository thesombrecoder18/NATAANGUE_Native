import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import DemandeLivraisonService from '../../../services/demandeLivraisonService';

export default function ProducteurMesDemandesScreen() {
  const demandeService = DemandeLivraisonService.getInstance();
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDemande, setNewDemande] = useState({
    produit: '',
    quantite: '',
    origine: '',
    destination: '',
    dateLivraison: '',
    heureLivraison: '',
    prixPropose: '',
    description: '',
    conditionsSpeciales: ''
  });

  // Charger les demandes au montage du composant
  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    try {
      setLoading(true);
      // Simuler l'ID du producteur connecté
      const producteurId = 'Ferme Diallo';
      const demandesData = await demandeService.getDemandesProducteur(producteurId);
      setDemandes(demandesData);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDemande = async () => {
    if (!newDemande.produit || !newDemande.destination || !newDemande.quantite) {
      Alert.alert('Attention', 'Veuillez remplir au moins le produit, la quantité et la destination');
      return;
    }

    try {
      const demandeData = {
        produit: newDemande.produit,
        quantite: newDemande.quantite,
        producteur: 'Ferme Diallo', // Simuler le producteur connecté
        telephoneProducteur: '+221 77 123 45 67',
        origine: newDemande.origine || 'Ferme Diallo, Thiès',
        destination: newDemande.destination,
        dateLivraison: newDemande.dateLivraison,
        heureLivraison: newDemande.heureLivraison,
        prixPropose: newDemande.prixPropose,
        description: newDemande.description,
        conditionsSpeciales: newDemande.conditionsSpeciales
      };

      await demandeService.creerDemande(demandeData);
      
      setNewDemande({
        produit: '',
        quantite: '',
        origine: '',
        destination: '',
        dateLivraison: '',
        heureLivraison: '',
        prixPropose: '',
        description: '',
        conditionsSpeciales: ''
      });
      setShowAddModal(false);
      
      // Recharger les demandes
      await loadDemandes();
      
      Alert.alert('Parfait !', 'Votre demande de transport a été envoyée. Les chauffeurs peuvent maintenant la voir.');
    } catch (error) {
      console.error('Erreur lors de la création de la demande:', error);
      Alert.alert('Problème', 'Impossible d\'envoyer votre demande. Réessayez plus tard.');
    }
  };

  const handleAnnulerDemande = async (id: string) => {
    Alert.alert(
      'Annuler la demande',
      'Voulez-vous vraiment annuler cette demande ?',
      [
        { text: 'Non', style: 'cancel' },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: async () => {
            try {
              await demandeService.annulerDemande(id);
              await loadDemandes(); // Recharger les demandes
              Alert.alert('OK', 'Demande annulée');
            } catch (error) {
              console.error('Erreur lors de l\'annulation:', error);
              Alert.alert('Problème', 'Impossible d\'annuler. Réessayez plus tard.');
            }
          }
        }
      ]
    );
  };

  const handleContactTransporteur = (demande: any) => {
    Alert.alert(
      'Contacter le transporteur',
      `Voulez-vous contacter ${demande.transporteurAccepte} ?\n\nTéléphone: ${demande.telephoneTransporteur}`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Appeler',
          onPress: () => {
            Alert.alert('Appel', `Appel vers ${demande.telephoneTransporteur}...`);
          }
        },
        {
          text: 'Message',
          onPress: () => {
            Alert.alert('Message', `Message envoyé à ${demande.transporteurAccepte}`);
          }
        }
      ]
    );
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En attente': return '#2196F3';
      case 'Acceptée': return '#4CAF50';
      case 'En cours': return '#FF9800';
      case 'Terminée': return '#4CAF50';
      case 'Annulée': return '#F44336';
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
        {demande.transporteurAccepte && (
          <View style={styles.demandeRow}>
            <MaterialIcons name="person" size={16} color="#666" />
            <Text style={styles.demandeLabel}>Transporteur:</Text>
            <Text style={styles.demandeValue}>{demande.transporteurAccepte}</Text>
          </View>
        )}
        {demande.description && (
          <View style={styles.demandeRow}>
            <MaterialIcons name="description" size={16} color="#666" />
            <Text style={styles.demandeLabel}>Description:</Text>
            <Text style={styles.demandeValue}>{demande.description}</Text>
          </View>
        )}
      </View>

      <View style={styles.demandeActions}>
        {demande.statut === 'En attente' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F44336' }]}
            onPress={() => handleAnnulerDemande(demande.id)}
          >
            <Text style={styles.actionButtonText}>Annuler</Text>
          </TouchableOpacity>
        )}
        {demande.statut === 'Acceptée' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => handleContactTransporteur(demande)}
          >
            <MaterialIcons name="phone" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Contacter</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
          onPress={() => router.push('/acteurs/producteur/suivi-livraison')}
        >
          <MaterialIcons name="track-changes" size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Suivre</Text>
        </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Mes Demandes de Transport</Text>
          <TouchableOpacity onPress={() => setShowAddModal(true)}>
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
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
            <Text style={styles.statValue}>{demandes.filter(d => d.statut === 'En attente').length}</Text>
            <Text style={styles.statLabel}>En attente</Text>
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

        {/* Message d'aide simple */}
        <View style={styles.helpSection}>
          <View style={styles.helpCard}>
            <MaterialIcons name="help" size={24} color="#4CAF50" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Comment ça marche ?</Text>
              <Text style={styles.helpText}>
                • Créez une demande de transport{'\n'}
                • Les chauffeurs voient votre demande{'\n'}
                • Un chauffeur accepte votre demande{'\n'}
                • Vous pouvez l'appeler pour discuter
              </Text>
            </View>
          </View>
        </View>

        {/* Liste des demandes */}
        <View style={styles.demandesSection}>
          <Text style={styles.sectionTitle}>Mes Demandes de Transport</Text>
          {demandes.map(renderDemande)}
        </View>
      </ScrollView>

      {/* Modal d'ajout */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Demander un Transport</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.inputLabel}>Quel produit voulez-vous transporter ? *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Tomates, Riz, Mangues..."
                value={newDemande.produit}
                onChangeText={(text) => setNewDemande({ ...newDemande, produit: text })}
              />
              
              <Text style={styles.inputLabel}>Combien de kilos ? *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 50 kg, 100 kg..."
                value={newDemande.quantite}
                onChangeText={(text) => setNewDemande({ ...newDemande, quantite: text })}
              />
              
              <Text style={styles.inputLabel}>Où aller chercher ?</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Ma ferme à Thiès"
                value={newDemande.origine}
                onChangeText={(text) => setNewDemande({ ...newDemande, origine: text })}
              />
              
              <Text style={styles.inputLabel}>Où livrer ? *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Marché Sandaga, Dakar"
                value={newDemande.destination}
                onChangeText={(text) => setNewDemande({ ...newDemande, destination: text })}
              />
              
              <Text style={styles.inputLabel}>Quand livrer ?</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Demain matin, Lundi..."
                value={newDemande.dateLivraison}
                onChangeText={(text) => setNewDemande({ ...newDemande, dateLivraison: text })}
              />
              
              <Text style={styles.inputLabel}>Combien payer ?</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 5000 FCFA"
                value={newDemande.prixPropose}
                onChangeText={(text) => setNewDemande({ ...newDemande, prixPropose: text })}
              />
              
              <Text style={styles.inputLabel}>Message pour le chauffeur</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ex: Produit fragile, appeler avant de venir..."
                value={newDemande.description}
                onChangeText={(text) => setNewDemande({ ...newDemande, description: text })}
                multiline
                numberOfLines={3}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddDemande}
              >
                <Text style={styles.saveButtonText}>Demander Transport</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/transporteurs')}>
          <MaterialIcons name="local-shipping" size={24} color="#999" />
          <Text style={styles.navLabel}>Transporteurs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/suivi-livraison')}>
          <MaterialIcons name="track-changes" size={24} color="#999" />
          <Text style={styles.navLabel}>Suivi</Text>
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
  helpSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  helpCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  helpContent: {
    marginLeft: 12,
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#4CAF50',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
