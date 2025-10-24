import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';
import { UserStorage } from '../../../services/userStorage';

export default function AdministrateurUsersScreen() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [userStatuses, setUserStatuses] = useState<{[key: string]: boolean}>({});
  const [newUser, setNewUser] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    role: 'Producteur'
  });
  const [userPermissions, setUserPermissions] = useState({
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canDeactivate: false
  });
  const [filterRole, setFilterRole] = useState('Tous');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/(tabs)');
  };

  // Charger les utilisateurs au montage du composant
  React.useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await UserStorage.getAllUsers();
      setUsers(allUsers);
      // Initialiser les statuts comme actifs par défaut
      const statuses: {[key: string]: boolean} = {};
      allUsers.forEach(user => {
        statuses[user.id] = true; // Par défaut tous les utilisateurs sont actifs
      });
      setUserStatuses(statuses);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  const getStatusDot = (statusColor: string) => (
    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Producteur': return 'agriculture';
      case 'Transporteur': return 'local-shipping';
      case 'Distributeur': return 'store';
      case 'Consommateur': return 'person';
      case 'Administrateur': return 'admin-panel-settings';
      default: return 'person';
    }
  };

  const handleUserPress = (selectedUser: any) => {
    setSelectedUser(selectedUser);
    setShowPermissionsModal(true);
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.phone || !newUser.email || !newUser.password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      await UserStorage.saveUser(newUser);
      Alert.alert('Succès', 'Utilisateur ajouté avec succès !');
      setShowAddModal(false);
      setNewUser({ username: '', phone: '', email: '', password: '', role: 'Producteur' });
      loadUsers();
    } catch (error) {
      Alert.alert('Erreur', error instanceof Error ? error.message : 'Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  const handleDeleteUser = async () => {
    if (!adminPassword) {
      Alert.alert('Erreur', 'Veuillez entrer votre mot de passe administrateur');
      return;
    }

    try {
      // Vérifier le mot de passe administrateur
      const adminUser = await UserStorage.getUserByEmail(user?.email || '');
      if (adminUser && adminUser.password !== adminPassword) {
        Alert.alert('Erreur', 'Mot de passe administrateur incorrect');
        return;
      }

      await UserStorage.deleteUser(selectedUser.id);
      Alert.alert('Succès', 'Utilisateur supprimé avec succès !');
      setShowDeleteModal(false);
      setAdminPassword('');
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      Alert.alert('Erreur', error instanceof Error ? error.message : 'Erreur lors de la suppression de l\'utilisateur');
    }
  };

  const handleUpdatePermissions = async () => {
    try {
      // Ici on pourrait sauvegarder les permissions dans une base de données
      Alert.alert('Succès', 'Permissions mises à jour avec succès !');
      setShowPermissionsModal(false);
      setSelectedUser(null);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la mise à jour des permissions');
    }
  };

  const confirmDeleteUser = (userToDelete: any) => {
    setSelectedUser(userToDelete);
    setShowDeleteModal(true);
  };

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const roleMatch = filterRole === 'Tous' || user.role === filterRole;
    const isActive = userStatuses[user.id] !== false; // true par défaut si non défini
    const statusMatch = filterStatus === 'Tous' || 
      (filterStatus === 'Actif' && isActive) || 
      (filterStatus === 'Inactif' && !isActive);
    return roleMatch && statusMatch;
  });

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const clearFilters = () => {
    setFilterRole('Tous');
    setFilterStatus('Tous');
    setShowFilterModal(false);
  };

  const handleDeactivateUser = async (userToDeactivate: any) => {
    const isCurrentlyActive = userStatuses[userToDeactivate.id] !== false;
    const action = isCurrentlyActive ? 'désactiver' : 'réactiver';
    
    Alert.alert(
      `${isCurrentlyActive ? 'Désactiver' : 'Réactiver'} l'utilisateur`,
      `Êtes-vous sûr de vouloir ${action} ${userToDeactivate.username} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: isCurrentlyActive ? 'Désactiver' : 'Réactiver',
          style: 'destructive',
          onPress: async () => {
            try {
              setUserStatuses(prev => ({
                ...prev,
                [userToDeactivate.id]: !isCurrentlyActive
              }));
              Alert.alert('Succès', `Utilisateur ${action} avec succès !`);
            } catch (error) {
              Alert.alert('Erreur', `Erreur lors de la ${action} de l'utilisateur`);
            }
          }
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Utilisateurs</Text>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setShowFilterModal(true)}
        >
          <MaterialIcons name="filter-list" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Bouton d'ajout */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setShowAddModal(true)}
        >
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Ajouter un utilisateur</Text>
        </TouchableOpacity>
      </View>

      {/* Indicateur de filtre actif */}
      {(filterRole !== 'Tous' || filterStatus !== 'Tous') && (
        <View style={styles.filterIndicator}>
          <Text style={styles.filterText}>
            Filtres actifs: {filterRole !== 'Tous' ? filterRole : ''} {filterStatus !== 'Tous' ? filterStatus : ''}
          </Text>
          <TouchableOpacity onPress={clearFilters}>
            <MaterialIcons name="clear" size={16} color={Colors.roleColors.Administrateur} />
          </TouchableOpacity>
        </View>
      )}

      {/* Liste des utilisateurs */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredUsers.map((userItem, index) => (
          <View key={index} style={styles.userCard}>
            <TouchableOpacity
              style={styles.userCardContent}
              onPress={() => handleUserPress(userItem)}
            >
              <View style={styles.userLeft}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name={getRoleIcon(userItem.role) as any} size={24} color={Colors.roleColors.Administrateur} />
                </View>
              </View>
              
              <View style={styles.userMiddle}>
                <Text style={styles.userName}>{userItem.username}</Text>
                <Text style={styles.userRole}>{userItem.role}</Text>
                <Text style={styles.userContact}>{userItem.email}</Text>
              </View>
              
              <View style={styles.userRight}>
                <View style={styles.statusContainer}>
                  {getStatusDot(userStatuses[userItem.id] !== false ? '#4CAF50' : '#F44336')}
                  <Text style={[styles.statusText, { color: userStatuses[userItem.id] !== false ? '#4CAF50' : '#F44336' }]}>
                    {userStatuses[userItem.id] !== false ? 'Actif' : 'Inactif'}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#666666" />
              </View>
            </TouchableOpacity>
            
            <View style={styles.userActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleUserPress(userItem)}
              >
                <MaterialIcons name="settings" size={16} color={Colors.roleColors.Administrateur} />
                <Text style={styles.actionButtonText}>Permissions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.deactivateButton]}
                onPress={() => handleDeactivateUser(userItem)}
              >
                <MaterialIcons 
                  name={userStatuses[userItem.id] !== false ? "block" : "check-circle"} 
                  size={16} 
                  color="#FF9800" 
                />
                <Text style={[styles.actionButtonText, { color: '#FF9800' }]}>
                  {userStatuses[userItem.id] !== false ? 'Inactif' : 'Actif'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => confirmDeleteUser(userItem)}
              >
                <MaterialIcons name="delete" size={16} color="#F44336" />
                <Text style={[styles.actionButtonText, { color: '#F44336' }]}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal d'ajout d'utilisateur */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter un utilisateur</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Nom d'utilisateur"
              value={newUser.username}
              onChangeText={(text) => setNewUser({...newUser, username: text})}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Téléphone"
              value={newUser.phone}
              onChangeText={(text) => setNewUser({...newUser, phone: text})}
              keyboardType="phone-pad"
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={newUser.email}
              onChangeText={(text) => setNewUser({...newUser, email: text})}
              keyboardType="email-address"
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Mot de passe"
              value={newUser.password}
              onChangeText={(text) => setNewUser({...newUser, password: text})}
              secureTextEntry
            />
            
            <View style={styles.roleSelector}>
              <Text style={styles.roleLabel}>Rôle:</Text>
              <View style={styles.roleOptions}>
                {['Producteur', 'Transporteur', 'Distributeur', 'Consommateur'].map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.roleOption,
                      newUser.role === role && styles.roleOptionSelected
                    ]}
                    onPress={() => setNewUser({...newUser, role})}
                  >
                    <Text style={[
                      styles.roleOptionText,
                      newUser.role === role && styles.roleOptionTextSelected
                    ]}>
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.modalButtonCancelText}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonConfirm}
                onPress={handleAddUser}
              >
                <Text style={styles.modalButtonConfirmText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de suppression */}
      <Modal
        visible={showDeleteModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Supprimer l'utilisateur</Text>
            <Text style={styles.modalSubtitle}>
              Êtes-vous sûr de vouloir supprimer {selectedUser?.username} ?
            </Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Mot de passe administrateur"
              value={adminPassword}
              onChangeText={setAdminPassword}
              secureTextEntry
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonCancelText}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButtonConfirm, styles.deleteButton]}
                onPress={handleDeleteUser}
              >
                <Text style={styles.modalButtonConfirmText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de gestion des permissions */}
      <Modal
        visible={showPermissionsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPermissionsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gestion des permissions</Text>
            <Text style={styles.modalSubtitle}>
              Utilisateur: {selectedUser?.username}
            </Text>
            
            <View style={styles.permissionsContainer}>
              <TouchableOpacity 
                style={styles.permissionItem}
                onPress={() => setUserPermissions({...userPermissions, canCreate: !userPermissions.canCreate})}
              >
                <MaterialIcons 
                  name={userPermissions.canCreate ? "check-box" : "check-box-outline-blank"} 
                  size={24} 
                  color={Colors.roleColors.Administrateur} 
                />
                <Text style={styles.permissionText}>Créer des éléments</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.permissionItem}
                onPress={() => setUserPermissions({...userPermissions, canRead: !userPermissions.canRead})}
              >
                <MaterialIcons 
                  name={userPermissions.canRead ? "check-box" : "check-box-outline-blank"} 
                  size={24} 
                  color={Colors.roleColors.Administrateur} 
                />
                <Text style={styles.permissionText}>Lire des éléments</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.permissionItem}
                onPress={() => setUserPermissions({...userPermissions, canUpdate: !userPermissions.canUpdate})}
              >
                <MaterialIcons 
                  name={userPermissions.canUpdate ? "check-box" : "check-box-outline-blank"} 
                  size={24} 
                  color={Colors.roleColors.Administrateur} 
                />
                <Text style={styles.permissionText}>Modifier des éléments</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.permissionItem}
                onPress={() => setUserPermissions({...userPermissions, canDelete: !userPermissions.canDelete})}
              >
                <MaterialIcons 
                  name={userPermissions.canDelete ? "check-box" : "check-box-outline-blank"} 
                  size={24} 
                  color={Colors.roleColors.Administrateur} 
                />
                <Text style={styles.permissionText}>Supprimer des éléments</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.permissionItem}
                onPress={() => setUserPermissions({...userPermissions, canManageUsers: !userPermissions.canManageUsers})}
              >
                <MaterialIcons 
                  name={userPermissions.canManageUsers ? "check-box" : "check-box-outline-blank"} 
                  size={24} 
                  color={Colors.roleColors.Administrateur} 
                />
                <Text style={styles.permissionText}>Gérer les utilisateurs</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.permissionItem}
                onPress={() => setUserPermissions({...userPermissions, canViewAnalytics: !userPermissions.canViewAnalytics})}
              >
                <MaterialIcons 
                  name={userPermissions.canViewAnalytics ? "check-box" : "check-box-outline-blank"} 
                  size={24} 
                  color={Colors.roleColors.Administrateur} 
                />
                <Text style={styles.permissionText}>Voir les analytics</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.permissionItem}
                onPress={() => setUserPermissions({...userPermissions, canDeactivate: !userPermissions.canDeactivate})}
              >
                <MaterialIcons 
                  name={userPermissions.canDeactivate ? "check-box" : "check-box-outline-blank"} 
                  size={24} 
                  color={Colors.roleColors.Administrateur} 
                />
                <Text style={styles.permissionText}>Rendre inactif</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setShowPermissionsModal(false)}
              >
                <Text style={styles.modalButtonCancelText}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonConfirm}
                onPress={handleUpdatePermissions}
              >
                <Text style={styles.modalButtonConfirmText}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de filtrage */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrer les utilisateurs</Text>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Rôle:</Text>
              <View style={styles.filterOptions}>
                {['Tous', 'Producteur', 'Transporteur', 'Distributeur', 'Consommateur', 'Administrateur'].map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.filterOption,
                      filterRole === role && styles.filterOptionSelected
                    ]}
                    onPress={() => setFilterRole(role)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filterRole === role && styles.filterOptionTextSelected
                    ]}>
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Statut:</Text>
              <View style={styles.filterOptions}>
                {['Tous', 'Actif', 'Inactif'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.filterOption,
                      filterStatus === status && styles.filterOptionSelected
                    ]}
                    onPress={() => setFilterStatus(status)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filterStatus === status && styles.filterOptionTextSelected
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.modalButtonCancelText}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonConfirm}
                onPress={applyFilters}
              >
                <Text style={styles.modalButtonConfirmText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
        
        <TouchableOpacity style={styles.navItem}>
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
  userCard: {
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
  userLeft: {
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
  userMiddle: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  userContact: {
    fontSize: 12,
    color: '#999999',
  },
  userRight: {
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
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.roleColors.Administrateur,
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
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  userCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F8F8F8',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    color: Colors.roleColors.Administrateur,
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  deactivateButton: {
    backgroundColor: '#FFF3E0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  roleSelector: {
    marginBottom: 15,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  roleOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
  },
  roleOptionSelected: {
    backgroundColor: Colors.roleColors.Administrateur,
    borderColor: Colors.roleColors.Administrateur,
  },
  roleOptionText: {
    fontSize: 12,
    color: '#666666',
  },
  roleOptionTextSelected: {
    color: '#FFFFFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButtonCancel: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
    marginRight: 10,
  },
  modalButtonCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
  },
  modalButtonConfirm: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.roleColors.Administrateur,
    marginLeft: 10,
  },
  modalButtonConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  permissionsContainer: {
    marginBottom: 20,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  permissionText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 12,
  },
  filterButton: {
    padding: 8,
  },
  filterIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 14,
    color: Colors.roleColors.Administrateur,
    fontWeight: '500',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
  },
  filterOptionSelected: {
    backgroundColor: Colors.roleColors.Administrateur,
    borderColor: Colors.roleColors.Administrateur,
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666666',
  },
  filterOptionTextSelected: {
    color: '#FFFFFF',
  },
});
