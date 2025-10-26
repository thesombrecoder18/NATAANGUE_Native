import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function ProducteurCulturesScreen() {
  const { user, logout } = useAuth();
  const [cultures, setCultures] = useState([
    {
      id: '1',
      nom: 'Champ de Tomates',
      produit: 'Tomates',
      taille: 'Grand',
      datePlantation: '2024-01-15',
      statut: 'En pousse',
      localisation: 'Ferme Diallo, Thiès',
      notes: 'Tomates biologiques'
    },
    {
      id: '2',
      nom: 'Champ de Riz',
      produit: 'Riz',
      taille: 'Très Grand',
      datePlantation: '2024-01-20',
      statut: 'En pousse',
      localisation: 'Ferme Sarr, Kaolack',
      notes: 'Riz biologique'
    },
    {
      id: '3',
      nom: 'Champ de Mangues',
      produit: 'Mangues',
      taille: 'Moyen',
      datePlantation: '2023-06-01',
      statut: 'En fleurs',
      localisation: 'Ferme Diallo, Thiès',
      notes: 'Mangues biologiques'
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCulture, setNewCulture] = useState({
    nom: '',
    produit: '',
    taille: 'Moyen',
    datePlantation: '',
    statut: 'En pousse',
    localisation: '',
    notes: ''
  });

  const handleLogout = async () => {
    await logout();
    router.push('/(tabs)');
  };

  const handleAddCulture = () => {
    if (!newCulture.nom || !newCulture.produit) {
      Alert.alert('Erreur', 'Veuillez remplir au moins le nom et le produit');
      return;
    }

    const culture = {
      id: Date.now().toString(),
      ...newCulture
    };

    setCultures([...cultures, culture]);
    setNewCulture({
      nom: '',
      produit: '',
      taille: 'Moyen',
      datePlantation: '',
      statut: 'En pousse',
      localisation: '',
      notes: ''
    });
    setShowAddModal(false);
    Alert.alert('Succès', 'Culture ajoutée avec succès');
  };

  const handleDeleteCulture = (id: string) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cette culture ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setCultures(cultures.filter(c => c.id !== id));
            Alert.alert('Succès', 'Culture supprimée');
          }
        }
      ]
    );
  };

  const handleUpdateStatut = (id: string, newStatut: string) => {
    setCultures(cultures.map(culture => 
      culture.id === id ? { ...culture, statut: newStatut } : culture
    ));
    Alert.alert('Succès', `Statut mis à jour: ${newStatut}`);
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En croissance': return '#4CAF50';
      case 'En floraison': return '#FF9800';
      case 'En récolte': return '#2196F3';
      case 'Terminée': return '#9C27B0';
      default: return '#666666';
    }
  };

  const renderCulture = ({ item }: { item: any }) => (
    <View style={styles.cultureCard}>
      <View style={styles.cultureHeader}>
        <View style={styles.cultureInfo}>
          <Text style={styles.cultureNom}>{item.nom}</Text>
          <Text style={styles.cultureProduit}>{item.produit}</Text>
        </View>
        <View style={styles.cultureActions}>
          <TouchableOpacity
            style={[styles.statutBadge, { backgroundColor: getStatutColor(item.statut) + '20' }]}
            onPress={() => {
              const statuts = ['En pousse', 'En fleurs', 'Prêt à récolter', 'Terminé'];
              const currentIndex = statuts.indexOf(item.statut);
              const nextStatut = statuts[(currentIndex + 1) % statuts.length];
              handleUpdateStatut(item.id, nextStatut);
            }}
          >
            <Text style={[styles.statutText, { color: getStatutColor(item.statut) }]}>
              {item.statut}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteCulture(item.id)}
          >
            <MaterialIcons name="delete" size={20} color="#FF5252" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.cultureDetails}>
        <View style={styles.detailRow}>
          <MaterialIcons name="straighten" size={16} color={Colors.roleColors.Producteur} />
          <Text style={styles.detailText}>Taille: {item.taille}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="calendar-today" size={16} color={Colors.roleColors.Producteur} />
          <Text style={styles.detailText}>Plantation: {item.datePlantation}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="event" size={16} color={Colors.roleColors.Producteur} />
          <Text style={styles.detailText}>Récolte: {item.dateRecolte}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="trending-up" size={16} color={Colors.roleColors.Producteur} />
          <Text style={styles.detailText}>Rendement: {item.rendementAttendu}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="location-on" size={16} color={Colors.roleColors.Producteur} />
          <Text style={styles.detailText}>{item.localisation}</Text>
        </View>
        {item.notes && (
          <Text style={styles.notes}>{item.notes}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Cultures</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Statistiques */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="agriculture" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.statNumber}>{cultures.length}</Text>
          <Text style={styles.statLabel}>Parcelles</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="straighten" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.statNumber}>3.5</Text>
          <Text style={styles.statLabel}>Ha total</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="trending-up" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statLabel}>T attendues</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <MaterialIcons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Nouvelle Culture</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des cultures */}
      <FlatList
        data={cultures}
        renderItem={renderCulture}
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
              <Text style={styles.modalTitle}>Nouvelle Culture</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nom de la parcelle *</Text>
                <TextInput
                  style={styles.input}
                  value={newCulture.nom}
                  onChangeText={(text) => setNewCulture({...newCulture, nom: text})}
                  placeholder="Ex: Parcelle Tomates A"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Produit *</Text>
                <TextInput
                  style={styles.input}
                  value={newCulture.produit}
                  onChangeText={(text) => setNewCulture({...newCulture, produit: text})}
                  placeholder="Ex: Tomates Bio"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Taille du champ</Text>
                <View style={styles.tailleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tailleOption,
                      { backgroundColor: newCulture.taille === 'Petit' ? Colors.roleColors.Producteur : '#E0E0E0' }
                    ]}
                    onPress={() => setNewCulture({...newCulture, taille: 'Petit'})}
                  >
                    <Text style={[styles.tailleOptionText, { color: newCulture.taille === 'Petit' ? '#FFFFFF' : '#666666' }]}>
                      Petit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tailleOption,
                      { backgroundColor: newCulture.taille === 'Moyen' ? Colors.roleColors.Producteur : '#E0E0E0' }
                    ]}
                    onPress={() => setNewCulture({...newCulture, taille: 'Moyen'})}
                  >
                    <Text style={[styles.tailleOptionText, { color: newCulture.taille === 'Moyen' ? '#FFFFFF' : '#666666' }]}>
                      Moyen
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tailleOption,
                      { backgroundColor: newCulture.taille === 'Grand' ? Colors.roleColors.Producteur : '#E0E0E0' }
                    ]}
                    onPress={() => setNewCulture({...newCulture, taille: 'Grand'})}
                  >
                    <Text style={[styles.tailleOptionText, { color: newCulture.taille === 'Grand' ? '#FFFFFF' : '#666666' }]}>
                      Grand
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tailleOption,
                      { backgroundColor: newCulture.taille === 'Très Grand' ? Colors.roleColors.Producteur : '#E0E0E0' }
                    ]}
                    onPress={() => setNewCulture({...newCulture, taille: 'Très Grand'})}
                  >
                    <Text style={[styles.tailleOptionText, { color: newCulture.taille === 'Très Grand' ? '#FFFFFF' : '#666666' }]}>
                      Très Grand
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date de plantation</Text>
                <TextInput
                  style={styles.input}
                  value={newCulture.datePlantation}
                  onChangeText={(text) => setNewCulture({...newCulture, datePlantation: text})}
                  placeholder="Ex: 15 janvier 2024"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Localisation</Text>
                <TextInput
                  style={styles.input}
                  value={newCulture.localisation}
                  onChangeText={(text) => setNewCulture({...newCulture, localisation: text})}
                  placeholder="Ex: Ferme Diallo, Thiès"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notes</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newCulture.notes}
                  onChangeText={(text) => setNewCulture({...newCulture, notes: text})}
                  placeholder="Notes sur la culture"
                  multiline
                  numberOfLines={3}
                />
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
                onPress={handleAddCulture}
              >
                <Text style={styles.saveButtonText}>Créer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  cultureCard: {
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
  cultureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cultureInfo: {
    flex: 1,
  },
  cultureNom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  cultureProduit: {
    fontSize: 14,
    color: Colors.roleColors.Producteur,
    fontWeight: '500',
  },
  cultureActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statutBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statutText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFEBEE',
  },
  cultureDetails: {
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
  notes: {
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
  tailleContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tailleOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 70,
    alignItems: 'center',
  },
  tailleOptionText: {
    fontSize: 14,
    fontWeight: '600',
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
