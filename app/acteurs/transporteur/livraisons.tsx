import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

export default function TransporteurLivraisonsScreen() {
  const [livraisons, setLivraisons] = useState([
    {
      id: '1',
      produit: 'Tomates Bio',
      producteur: 'Ferme Diallo',
      destination: 'Dakar',
      statut: 'En cours',
      dateDepart: '2024-02-20',
      quantite: '50 kg',
      prixTransport: '5000 FCFA',
      chauffeur: 'Moussa Diop',
      vehicule: 'Camion 001',
      notes: 'Livraison urgente'
    },
    {
      id: '2',
      produit: 'Riz Bio',
      producteur: 'Ferme Ba',
      destination: 'Saint-Louis',
      statut: 'Terminée',
      dateDepart: '2024-02-18',
      quantite: '200 kg',
      prixTransport: '8000 FCFA',
      chauffeur: 'Amadou Fall',
      vehicule: 'Camion 002',
      notes: 'Livraison normale'
    },
    {
      id: '3',
      produit: 'Oignons Bio',
      producteur: 'Ferme Sarr',
      destination: 'Thiès',
      statut: 'En attente',
      dateDepart: '2024-02-22',
      quantite: '100 kg',
      prixTransport: '3000 FCFA',
      chauffeur: 'Ibrahima Traoré',
      vehicule: 'Camion 001',
      notes: 'En attente de chargement'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newLivraison, setNewLivraison] = useState({
    produit: '',
    producteur: '',
    destination: '',
    quantite: '',
    prixTransport: '',
    chauffeur: '',
    vehicule: '',
    notes: ''
  });

  const handleAddLivraison = () => {
    if (!newLivraison.produit || !newLivraison.destination || !newLivraison.quantite) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires');
      return;
    }

    const livraison = {
      id: Date.now().toString(),
      ...newLivraison,
      statut: 'En attente',
      dateDepart: new Date().toISOString().split('T')[0]
    };

    setLivraisons([livraison, ...livraisons]);
    setNewLivraison({
      produit: '',
      producteur: '',
      destination: '',
      quantite: '',
      prixTransport: '',
      chauffeur: '',
      vehicule: '',
      notes: ''
    });
    setShowAddModal(false);
    Alert.alert('Succès', 'Livraison ajoutée avec succès');
  };

  const handleUpdateStatut = (id: string, nouveauStatut: string) => {
    setLivraisons(livraisons.map(livraison => 
      livraison.id === id ? { ...livraison, statut: nouveauStatut } : livraison
    ));
    Alert.alert('Succès', `Statut mis à jour : ${nouveauStatut}`);
  };

  const handleDeleteLivraison = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer cette livraison ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setLivraisons(livraisons.filter(livraison => livraison.id !== id));
            Alert.alert('Succès', 'Livraison supprimée');
          }
        }
      ]
    );
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En cours': return '#FFA500';
      case 'Terminée': return '#4CAF50';
      case 'En attente': return '#2196F3';
      default: return '#999';
    }
  };

  const renderLivraison = (livraison: any) => (
    <View key={livraison.id} style={styles.livraisonCard}>
      <View style={styles.livraisonHeader}>
        <View style={styles.livraisonInfo}>
          <MaterialIcons name="local-shipping" size={20} color="#4CAF50" />
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
          <Text style={styles.livraisonLabel}>Producteur:</Text>
          <Text style={styles.livraisonValue}>{livraison.producteur}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <Text style={styles.livraisonLabel}>Quantité:</Text>
          <Text style={styles.livraisonValue}>{livraison.quantite}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <Text style={styles.livraisonLabel}>Prix transport:</Text>
          <Text style={styles.livraisonValue}>{livraison.prixTransport}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <Text style={styles.livraisonLabel}>Chauffeur:</Text>
          <Text style={styles.livraisonValue}>{livraison.chauffeur}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <Text style={styles.livraisonLabel}>Véhicule:</Text>
          <Text style={styles.livraisonValue}>{livraison.vehicule}</Text>
        </View>
        <View style={styles.livraisonRow}>
          <Text style={styles.livraisonLabel}>Date départ:</Text>
          <Text style={styles.livraisonValue}>{livraison.dateDepart}</Text>
        </View>
        {livraison.notes && (
          <View style={styles.livraisonRow}>
            <Text style={styles.livraisonLabel}>Notes:</Text>
            <Text style={styles.livraisonValue}>{livraison.notes}</Text>
          </View>
        )}
      </View>

      <View style={styles.livraisonActions}>
        {livraison.statut === 'En attente' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#FFA500' }]}
            onPress={() => handleUpdateStatut(livraison.id, 'En cours')}
          >
            <Text style={styles.actionButtonText}>Démarrer</Text>
          </TouchableOpacity>
        )}
        {livraison.statut === 'En cours' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => handleUpdateStatut(livraison.id, 'Terminée')}
          >
            <Text style={styles.actionButtonText}>Terminer</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#F44336' }]}
          onPress={() => handleDeleteLivraison(livraison.id)}
        >
          <Text style={styles.actionButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#4CAF50' }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mes Livraisons</Text>
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
            <Text style={styles.statValue}>{livraisons.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="schedule" size={24} color="#2196F3" />
            <Text style={styles.statValue}>{livraisons.filter(l => l.statut === 'En attente').length}</Text>
            <Text style={styles.statLabel}>En attente</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="trending-up" size={24} color="#FFA500" />
            <Text style={styles.statValue}>{livraisons.filter(l => l.statut === 'En cours').length}</Text>
            <Text style={styles.statLabel}>En cours</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{livraisons.filter(l => l.statut === 'Terminée').length}</Text>
            <Text style={styles.statLabel}>Terminées</Text>
          </View>
        </View>

        {/* Liste des livraisons */}
        <View style={styles.livraisonsSection}>
          <Text style={styles.sectionTitle}>Livraisons</Text>
          {livraisons.map(renderLivraison)}
        </View>
      </ScrollView>

      {/* Modal d'ajout */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouvelle Livraison</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <TextInput
                style={styles.input}
                placeholder="Produit *"
                value={newLivraison.produit}
                onChangeText={(text) => setNewLivraison({ ...newLivraison, produit: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Producteur"
                value={newLivraison.producteur}
                onChangeText={(text) => setNewLivraison({ ...newLivraison, producteur: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Destination *"
                value={newLivraison.destination}
                onChangeText={(text) => setNewLivraison({ ...newLivraison, destination: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantité *"
                value={newLivraison.quantite}
                onChangeText={(text) => setNewLivraison({ ...newLivraison, quantite: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Prix transport"
                value={newLivraison.prixTransport}
                onChangeText={(text) => setNewLivraison({ ...newLivraison, prixTransport: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Chauffeur"
                value={newLivraison.chauffeur}
                onChangeText={(text) => setNewLivraison({ ...newLivraison, chauffeur: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Véhicule"
                value={newLivraison.vehicule}
                onChangeText={(text) => setNewLivraison({ ...newLivraison, vehicule: text })}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Notes"
                value={newLivraison.notes}
                onChangeText={(text) => setNewLivraison({ ...newLivraison, notes: text })}
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
                onPress={handleAddLivraison}
              >
                <Text style={styles.saveButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color="#999" />
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/livraisons')}>
          <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
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
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  livraisonLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  livraisonValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  livraisonActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
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
