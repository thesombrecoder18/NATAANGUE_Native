import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

export default function TransporteurEntrepotsScreen() {
  const [entrepots, setEntrepots] = useState([
    {
      id: '1',
      nom: 'Entrepôt Dakar',
      adresse: 'Zone Industrielle, Dakar',
      capacite: '1000 kg',
      stockActuel: '350 kg',
      temperature: '18°C',
      humidite: '65%',
      statut: 'Actif',
      produits: [
        { nom: 'Tomates Bio', quantite: '150 kg', dateEntree: '2024-02-20' },
        { nom: 'Riz Bio', quantite: '200 kg', dateEntree: '2024-02-18' }
      ]
    },
    {
      id: '2',
      nom: 'Entrepôt Thiès',
      adresse: 'Route de Mbour, Thiès',
      capacite: '800 kg',
      stockActuel: '200 kg',
      temperature: '20°C',
      humidite: '60%',
      statut: 'Actif',
      produits: [
        { nom: 'Oignons Bio', quantite: '200 kg', dateEntree: '2024-02-19' }
      ]
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedEntrepot, setSelectedEntrepot] = useState<any>(null);
  const [newEntrepot, setNewEntrepot] = useState({
    nom: '',
    adresse: '',
    capacite: '',
    temperature: '',
    humidite: ''
  });

  const handleAddEntrepot = () => {
    if (!newEntrepot.nom || !newEntrepot.adresse || !newEntrepot.capacite) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires');
      return;
    }

    const entrepot = {
      id: Date.now().toString(),
      ...newEntrepot,
      stockActuel: '0 kg',
      statut: 'Actif',
      produits: []
    };

    setEntrepots([entrepot, ...entrepots]);
    setNewEntrepot({
      nom: '',
      adresse: '',
      capacite: '',
      temperature: '',
      humidite: ''
    });
    setShowAddModal(false);
    Alert.alert('Succès', 'Entrepôt ajouté avec succès');
  };

  const handleDeleteEntrepot = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer cet entrepôt ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setEntrepots(entrepots.filter(entrepot => entrepot.id !== id));
            Alert.alert('Succès', 'Entrepôt supprimé');
          }
        }
      ]
    );
  };

  const handleViewStock = (entrepot: any) => {
    setSelectedEntrepot(entrepot);
    setShowStockModal(true);
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Actif': return '#4CAF50';
      case 'Maintenance': return '#FFA500';
      case 'Fermé': return '#F44336';
      default: return '#999';
    }
  };

  const renderEntrepot = (entrepot: any) => (
    <View key={entrepot.id} style={styles.entrepotCard}>
      <View style={styles.entrepotHeader}>
        <View style={styles.entrepotInfo}>
          <MaterialIcons name="warehouse" size={20} color="#4CAF50" />
          <View style={styles.entrepotDetails}>
            <Text style={styles.entrepotNom}>{entrepot.nom}</Text>
            <Text style={styles.entrepotAdresse}>{entrepot.adresse}</Text>
          </View>
        </View>
        <View style={[styles.statutBadge, { backgroundColor: getStatutColor(entrepot.statut) }]}>
          <Text style={styles.statutText}>{entrepot.statut}</Text>
        </View>
      </View>

      <View style={styles.entrepotContent}>
        <View style={styles.entrepotRow}>
          <Text style={styles.entrepotLabel}>Capacité:</Text>
          <Text style={styles.entrepotValue}>{entrepot.capacite}</Text>
        </View>
        <View style={styles.entrepotRow}>
          <Text style={styles.entrepotLabel}>Stock actuel:</Text>
          <Text style={styles.entrepotValue}>{entrepot.stockActuel}</Text>
        </View>
        <View style={styles.entrepotRow}>
          <Text style={styles.entrepotLabel}>Température:</Text>
          <Text style={styles.entrepotValue}>{entrepot.temperature}</Text>
        </View>
        <View style={styles.entrepotRow}>
          <Text style={styles.entrepotLabel}>Humidité:</Text>
          <Text style={styles.entrepotValue}>{entrepot.humidite}</Text>
        </View>
        <View style={styles.entrepotRow}>
          <Text style={styles.entrepotLabel}>Produits stockés:</Text>
          <Text style={styles.entrepotValue}>{entrepot.produits.length}</Text>
        </View>
      </View>

      <View style={styles.entrepotActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => handleViewStock(entrepot)}
        >
          <Text style={styles.actionButtonText}>Voir Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#F44336' }]}
          onPress={() => handleDeleteEntrepot(entrepot.id)}
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
          <Text style={styles.headerTitle}>Mes Entrepôts</Text>
          <TouchableOpacity onPress={() => setShowAddModal(true)}>
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Statistiques */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <MaterialIcons name="warehouse" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{entrepots.length}</Text>
            <Text style={styles.statLabel}>Entrepôts</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="inventory" size={24} color="#2196F3" />
            <Text style={styles.statValue}>
              {entrepots.reduce((total, e) => total + parseInt(e.stockActuel), 0)} kg
            </Text>
            <Text style={styles.statLabel}>Stock Total</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{entrepots.filter(e => e.statut === 'Actif').length}</Text>
            <Text style={styles.statLabel}>Actifs</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="warning" size={24} color="#FFA500" />
            <Text style={styles.statValue}>
              {entrepots.filter(e => e.statut === 'Maintenance').length}
            </Text>
            <Text style={styles.statLabel}>Maintenance</Text>
          </View>
        </View>

        {/* Liste des entrepôts */}
        <View style={styles.entrepotsSection}>
          <Text style={styles.sectionTitle}>Entrepôts</Text>
          {entrepots.map(renderEntrepot)}
        </View>
      </ScrollView>

      {/* Modal d'ajout d'entrepôt */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouvel Entrepôt</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <TextInput
                style={styles.input}
                placeholder="Nom de l'entrepôt *"
                value={newEntrepot.nom}
                onChangeText={(text) => setNewEntrepot({ ...newEntrepot, nom: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Adresse *"
                value={newEntrepot.adresse}
                onChangeText={(text) => setNewEntrepot({ ...newEntrepot, adresse: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Capacité * (ex: 1000 kg)"
                value={newEntrepot.capacite}
                onChangeText={(text) => setNewEntrepot({ ...newEntrepot, capacite: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Température (ex: 18°C)"
                value={newEntrepot.temperature}
                onChangeText={(text) => setNewEntrepot({ ...newEntrepot, temperature: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Humidité (ex: 65%)"
                value={newEntrepot.humidite}
                onChangeText={(text) => setNewEntrepot({ ...newEntrepot, humidite: text })}
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
                onPress={handleAddEntrepot}
              >
                <Text style={styles.saveButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de visualisation du stock */}
      <Modal visible={showStockModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Stock - {selectedEntrepot?.nom}</Text>
              <TouchableOpacity onPress={() => setShowStockModal(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {selectedEntrepot && (
                <>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockLabel}>Capacité totale:</Text>
                    <Text style={styles.stockValue}>{selectedEntrepot.capacite}</Text>
                  </View>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockLabel}>Stock actuel:</Text>
                    <Text style={styles.stockValue}>{selectedEntrepot.stockActuel}</Text>
                  </View>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockLabel}>Température:</Text>
                    <Text style={styles.stockValue}>{selectedEntrepot.temperature}</Text>
                  </View>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockLabel}>Humidité:</Text>
                    <Text style={styles.stockValue}>{selectedEntrepot.humidite}</Text>
                  </View>

                  <Text style={styles.produitsTitle}>Produits stockés:</Text>
                  {selectedEntrepot.produits.map((produit: any, index: number) => (
                    <View key={index} style={styles.produitItem}>
                      <MaterialIcons name="inventory" size={20} color="#4CAF50" />
                      <View style={styles.produitInfo}>
                        <Text style={styles.produitNom}>{produit.nom}</Text>
                        <Text style={styles.produitDetails}>
                          {produit.quantite} - Entré le {produit.dateEntree}
                        </Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowStockModal(false)}
              >
                <Text style={styles.cancelButtonText}>Fermer</Text>
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
          <MaterialIcons name="local-shipping" size={24} color="#999" />
          <Text style={styles.navLabel}>Livraisons</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/scanner')}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#999" />
          <Text style={styles.navLabel}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/transporteur/entrepots')}>
          <MaterialIcons name="warehouse" size={24} color="#4CAF50" />
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
  entrepotsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  entrepotCard: {
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
  entrepotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  entrepotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  entrepotDetails: {
    marginLeft: 12,
  },
  entrepotNom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  entrepotAdresse: {
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
  entrepotContent: {
    marginBottom: 15,
  },
  entrepotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entrepotLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  entrepotValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  entrepotActions: {
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
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  stockLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  stockValue: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  produitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 15,
  },
  produitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  produitInfo: {
    marginLeft: 12,
    flex: 1,
  },
  produitNom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  produitDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
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
