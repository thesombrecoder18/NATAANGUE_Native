import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function ProducteurProduitsScreen() {
  const { user, logout } = useAuth();
  const [produits, setProduits] = useState([
    {
      id: '1',
      nom: 'Tomates',
      quantite: '50 kg',
      prix: '1500 FCFA/kg',
      statut: 'Disponible',
      dateRecolte: '2024-02-20',
      localisation: 'Ferme Diallo, Thiès',
      qrCode: 'QR_TOMATES_001',
      notes: 'Récolte de tomates biologiques - 50kg'
    },
    {
      id: '2',
      nom: 'Riz',
      quantite: '200 kg',
      prix: '800 FCFA/kg',
      statut: 'Disponible',
      dateRecolte: '2024-02-22',
      localisation: 'Ferme Sarr, Kaolack',
      qrCode: 'QR_RIZ_002',
      notes: 'Récolte de riz biologique - 200kg'
    },
    {
      id: '3',
      nom: 'Mangues',
      quantite: '75 kg',
      prix: '2000 FCFA/kg',
      statut: 'Indisponible',
      dateRecolte: '2024-02-23',
      localisation: 'Ferme Diallo, Thiès',
      qrCode: 'QR_MANGUES_003',
      notes: 'Récolte de mangues biologiques - 75kg'
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduit, setEditingProduit] = useState<any>(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState<any>(null);
  const [newProduit, setNewProduit] = useState({
    nom: '',
    quantite: '',
    prix: '',
    statut: 'Disponible',
    dateRecolte: '',
    localisation: '',
    notes: ''
  });

  const handleLogout = async () => {
    await logout();
    router.push('/(tabs)');
  };

  const handleAddProduit = () => {
    if (!newProduit.nom || !newProduit.quantite || !newProduit.prix) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const produit = {
      id: Date.now().toString(),
      ...newProduit,
      qrCode: `QR_${newProduit.nom.replace(/\s+/g, '_').toUpperCase()}_${Date.now()}`,
      dateRecolte: newProduit.dateRecolte || new Date().toISOString().split('T')[0]
    };

    setProduits([...produits, produit]);
    setNewProduit({
      nom: '',
      quantite: '',
      prix: '',
      statut: 'Disponible',
      dateRecolte: '',
      localisation: '',
      notes: ''
    });
    setShowAddModal(false);
    Alert.alert('Succès', 'Produit ajouté avec succès');
  };

  const handleDeleteProduit = (id: string) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer ce produit ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setProduits(produits.filter(p => p.id !== id));
            Alert.alert('Succès', 'Produit supprimé');
          }
        }
      ]
    );
  };

  const handleToggleStatut = (id: string) => {
    setProduits(produits.map(produit => 
      produit.id === id 
        ? { ...produit, statut: produit.statut === 'Disponible' ? 'Indisponible' : 'Disponible' }
        : produit
    ));
  };

  const handleEditProduit = (produit: any) => {
    setEditingProduit(produit);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduit.nom || !editingProduit.quantite || !editingProduit.prix) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setProduits(produits.map(produit => 
      produit.id === editingProduit.id ? editingProduit : produit
    ));
    setShowEditModal(false);
    setEditingProduit(null);
    Alert.alert('Succès', 'Produit modifié avec succès');
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingProduit(null);
  };

  const handleProduitPress = (produit: any) => {
    setSelectedProduit(produit);
    setShowActionMenu(true);
  };

  const handleActionMenuClose = () => {
    setShowActionMenu(false);
    setSelectedProduit(null);
  };

  const handleModifierInfos = () => {
    if (selectedProduit) {
      setEditingProduit(selectedProduit);
      setShowActionMenu(false);
      setShowEditModal(true);
    }
  };

  const handleChangerStatut = () => {
    if (selectedProduit) {
      handleToggleStatut(selectedProduit.id);
      setShowActionMenu(false);
      setSelectedProduit(null);
    }
  };

  const handleSupprimer = () => {
    if (selectedProduit) {
      setShowActionMenu(false);
      setSelectedProduit(null);
      handleDeleteProduit(selectedProduit.id);
    }
  };

  const renderProduit = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.produitCard}
      onPress={() => handleProduitPress(item)}
    >
      <View style={styles.produitHeader}>
        <View style={styles.produitImageContainer}>
          <View style={styles.produitImage}>
            <MaterialIcons name="eco" size={40} color={Colors.roleColors.Producteur} />
          </View>
        </View>
        <View style={styles.produitInfo}>
          <Text style={styles.produitNom}>{item.nom}</Text>
          <Text style={styles.produitQuantite}>{item.quantite}</Text>
          <Text style={styles.produitPrix}>{item.prix}</Text>
          
          <View style={styles.produitDetails}>
            <View style={styles.detailRow}>
              <MaterialIcons name="calendar-today" size={14} color={Colors.roleColors.Producteur} />
              <Text style={styles.detailText}>{item.dateRecolte}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="location-on" size={14} color={Colors.roleColors.Producteur} />
              <Text style={styles.detailText}>{item.localisation}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="qr-code" size={14} color={Colors.roleColors.Producteur} />
              <Text style={styles.detailText}>{item.qrCode}</Text>
            </View>
          </View>
          
          <View style={styles.statutContainer}>
            <View style={[
              styles.statutBadge,
              { backgroundColor: item.statut === 'Disponible' ? '#4CAF50' : '#F44336' }
            ]}>
              <MaterialIcons 
                name={item.statut === 'Disponible' ? 'check' : 'close'} 
                size={12} 
                color="#FFFFFF" 
              />
              <Text style={styles.statutBadgeText}>{item.statut}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleProduitPress(item)}
        >
          <MaterialIcons name="more-vert" size={24} color="#666666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestion des Produits</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Statistiques */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="eco" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.statNumber}>{produits.length}</Text>
          <Text style={styles.statLabel}>Produits</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="category" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.statNumber}>{new Set(produits.map(p => p.type)).size}</Text>
          <Text style={styles.statLabel}>Types</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="trending-up" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Actifs</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <MaterialIcons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Nouveau Produit</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des produits */}
      <FlatList
        data={produits}
        renderItem={renderProduit}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal d'ajout */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouveau Produit</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nom du produit *</Text>
                <TextInput
                  style={styles.input}
                  value={newProduit.nom}
                  onChangeText={(text) => setNewProduit({...newProduit, nom: text})}
                  placeholder="Ex: Tomates"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Quantité *</Text>
                <TextInput
                  style={styles.input}
                  value={newProduit.quantite}
                  onChangeText={(text) => setNewProduit({...newProduit, quantite: text})}
                  placeholder="Ex: 50 kg"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Prix *</Text>
                <TextInput
                  style={styles.input}
                  value={newProduit.prix}
                  onChangeText={(text) => setNewProduit({...newProduit, prix: text})}
                  placeholder="Ex: 1500 FCFA/kg"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date de récolte</Text>
                <TextInput
                  style={styles.input}
                  value={newProduit.dateRecolte}
                  onChangeText={(text) => setNewProduit({...newProduit, dateRecolte: text})}
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Localisation</Text>
                <TextInput
                  style={styles.input}
                  value={newProduit.localisation}
                  onChangeText={(text) => setNewProduit({...newProduit, localisation: text})}
                  placeholder="Ex: Ferme Diallo, Thiès"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notes</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newProduit.notes}
                  onChangeText={(text) => setNewProduit({...newProduit, notes: text})}
                  placeholder="Notes sur le produit"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Statut</Text>
                <View style={styles.statutContainer}>
                  <TouchableOpacity
                    style={[
                      styles.statutOption,
                      { backgroundColor: newProduit.statut === 'Disponible' ? '#4CAF50' : '#E0E0E0' }
                    ]}
                    onPress={() => setNewProduit({...newProduit, statut: 'Disponible'})}
                  >
                    <MaterialIcons name="check" size={20} color={newProduit.statut === 'Disponible' ? '#FFFFFF' : '#666666'} />
                    <Text style={[styles.statutOptionText, { color: newProduit.statut === 'Disponible' ? '#FFFFFF' : '#666666' }]}>
                      Disponible
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.statutOption,
                      { backgroundColor: newProduit.statut === 'Indisponible' ? '#F44336' : '#E0E0E0' }
                    ]}
                    onPress={() => setNewProduit({...newProduit, statut: 'Indisponible'})}
                  >
                    <MaterialIcons name="close" size={20} color={newProduit.statut === 'Indisponible' ? '#FFFFFF' : '#666666'} />
                    <Text style={[styles.statutOptionText, { color: newProduit.statut === 'Indisponible' ? '#FFFFFF' : '#666666' }]}>
                      Indisponible
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddProduit}
              >
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de modification */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Modifier le produit</Text>
              <TouchableOpacity onPress={handleCancelEdit}>
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nom du produit *</Text>
                <TextInput
                  style={styles.input}
                  value={editingProduit?.nom || ''}
                  onChangeText={(text) => setEditingProduit({...editingProduit, nom: text})}
                  placeholder="Ex: Tomates"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Quantité *</Text>
                <TextInput
                  style={styles.input}
                  value={editingProduit?.quantite || ''}
                  onChangeText={(text) => setEditingProduit({...editingProduit, quantite: text})}
                  placeholder="Ex: 50 kg"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Prix *</Text>
                <TextInput
                  style={styles.input}
                  value={editingProduit?.prix || ''}
                  onChangeText={(text) => setEditingProduit({...editingProduit, prix: text})}
                  placeholder="Ex: 1500 FCFA/kg"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date de récolte</Text>
                <TextInput
                  style={styles.input}
                  value={editingProduit?.dateRecolte || ''}
                  onChangeText={(text) => setEditingProduit({...editingProduit, dateRecolte: text})}
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Localisation</Text>
                <TextInput
                  style={styles.input}
                  value={editingProduit?.localisation || ''}
                  onChangeText={(text) => setEditingProduit({...editingProduit, localisation: text})}
                  placeholder="Ex: Ferme Diallo, Thiès"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notes</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={editingProduit?.notes || ''}
                  onChangeText={(text) => setEditingProduit({...editingProduit, notes: text})}
                  placeholder="Notes sur le produit"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Statut</Text>
                <View style={styles.statutContainer}>
                  <TouchableOpacity
                    style={[
                      styles.statutOption,
                      { backgroundColor: editingProduit?.statut === 'Disponible' ? '#4CAF50' : '#E0E0E0' }
                    ]}
                    onPress={() => setEditingProduit({...editingProduit, statut: 'Disponible'})}
                  >
                    <MaterialIcons name="check" size={20} color={editingProduit?.statut === 'Disponible' ? '#FFFFFF' : '#666666'} />
                    <Text style={[styles.statutOptionText, { color: editingProduit?.statut === 'Disponible' ? '#FFFFFF' : '#666666' }]}>
                      Disponible
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.statutOption,
                      { backgroundColor: editingProduit?.statut === 'Indisponible' ? '#F44336' : '#E0E0E0' }
                    ]}
                    onPress={() => setEditingProduit({...editingProduit, statut: 'Indisponible'})}
                  >
                    <MaterialIcons name="close" size={20} color={editingProduit?.statut === 'Indisponible' ? '#FFFFFF' : '#666666'} />
                    <Text style={[styles.statutOptionText, { color: editingProduit?.statut === 'Indisponible' ? '#FFFFFF' : '#666666' }]}>
                      Indisponible
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelEdit}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Menu d'actions */}
      <Modal
        visible={showActionMenu && selectedProduit !== null}
        animationType="fade"
        transparent={true}
      >
        <TouchableOpacity 
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={handleActionMenuClose}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>{selectedProduit?.nom || 'Produit'}</Text>
              <TouchableOpacity onPress={handleActionMenuClose}>
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.menuActions}>
              <TouchableOpacity style={styles.menuAction} onPress={handleModifierInfos}>
                <MaterialIcons name="edit" size={24} color="#2196F3" />
                <Text style={styles.menuActionText}>Modifier les informations</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuAction} onPress={handleChangerStatut}>
                <MaterialIcons 
                  name={selectedProduit?.statut === 'Disponible' ? 'close' : 'check'} 
                  size={24} 
                  color={selectedProduit?.statut === 'Disponible' ? '#F44336' : '#4CAF50'} 
                />
                <Text style={styles.menuActionText}>
                  {selectedProduit?.statut === 'Disponible' ? 'Marquer comme indisponible' : 'Marquer comme disponible'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuAction} onPress={handleSupprimer}>
                <MaterialIcons name="delete" size={24} color="#F44336" />
                <Text style={styles.menuActionText}>Supprimer le produit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Navigation Bottom */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/produits')}>
          <MaterialIcons name="eco" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Produits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/scanner')}>
          <MaterialIcons name="qr-code-scanner" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/cultures')}>
          <MaterialIcons name="agriculture" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Cultures</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/parametres')}>
          <MaterialIcons name="settings" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.navText}>Paramètres</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.roleColors.Producteur,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: Colors.roleColors.Producteur,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  produitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  produitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  produitImageContainer: {
    marginRight: 12,
  },
  produitImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  produitInfo: {
    flex: 1,
  },
  produitNom: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  produitQuantite: {
    fontSize: 16,
    color: Colors.roleColors.Producteur,
    fontWeight: '600',
    marginBottom: 2,
  },
  produitPrix: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  statutContainer: {
    marginTop: 8,
  },
  statutBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statutBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  menuButton: {
    padding: 8,
  },
  statutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statutText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFEBEE',
  },
  produitDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
    color: '#333333',
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.roleColors.Producteur,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statutContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  produitDetails: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0'
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  detailText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 6,
    flex: 1
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  statutOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  statutOptionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '80%',
    maxWidth: 300,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuActions: {
    padding: 10,
  },
  menuAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  menuActionText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
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
