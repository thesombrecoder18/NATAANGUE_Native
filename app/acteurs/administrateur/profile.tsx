import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function AdministrateurProfileScreen() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    phone: user?.phone || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.username || !formData.phone || !formData.email) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      // Ici on pourrait ajouter la logique de mise à jour
      Alert.alert('Succès', 'Profil mis à jour avec succès !');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la mise à jour du profil');
    }
  };

  const handleChangePassword = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.newPassword.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      // Ici on pourrait ajouter la logique de changement de mot de passe
      Alert.alert('Succès', 'Mot de passe modifié avec succès !');
      setIsChangingPassword(false);
      setFormData(prev => ({ 
        ...prev, 
        currentPassword: '', 
        newPassword: '', 
        confirmPassword: '' 
      }));
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors du changement de mot de passe');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.push('/(tabs)');
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
      {/* En-tête avec informations utilisateur */}
      <View style={[styles.header, { backgroundColor: Colors.roleColors.Administrateur }]}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <MaterialIcons name="admin-panel-settings" size={24} color="#FFFFFF" />
            <View style={styles.userDetails}>
              <Text style={styles.welcomeText}>Profil Administrateur</Text>
              <Text style={styles.roleText}>{user.username}</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Informations personnelles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informations Personnelles</Text>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => setIsEditing(!isEditing)}
            >
              <MaterialIcons 
                name={isEditing ? "close" : "edit"} 
                size={20} 
                color={Colors.roleColors.Administrateur} 
              />
              <Text style={styles.editButtonText}>
                {isEditing ? "Annuler" : "Modifier"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nom d'utilisateur</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.username}
                onChangeText={value => handleInputChange('username', value)}
                editable={isEditing}
                placeholder="admin"
                placeholderTextColor="#999"
              />
              <MaterialIcons name="person" size={20} color={Colors.roleColors.Administrateur} />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.phone}
                onChangeText={value => handleInputChange('phone', value)}
                editable={isEditing}
                placeholder="701234567"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
              <MaterialIcons name="phone" size={20} color={Colors.roleColors.Administrateur} />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
                editable={isEditing}
                placeholder="elimaneka19@gmail.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
              <MaterialIcons name="email" size={20} color={Colors.roleColors.Administrateur} />
            </View>
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <MaterialIcons name="save" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Changement de mot de passe */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sécurité</Text>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => setIsChangingPassword(!isChangingPassword)}
            >
              <MaterialIcons 
                name={isChangingPassword ? "close" : "lock"} 
                size={20} 
                color={Colors.roleColors.Administrateur} 
              />
              <Text style={styles.editButtonText}>
                {isChangingPassword ? "Annuler" : "Changer le mot de passe"}
              </Text>
            </TouchableOpacity>
          </View>

          {isChangingPassword && (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Mot de passe actuel</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.currentPassword}
                    onChangeText={value => handleInputChange('currentPassword', value)}
                    placeholder="Mot de passe actuel"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                  <MaterialIcons name="lock" size={20} color={Colors.roleColors.Administrateur} />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Nouveau mot de passe</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.newPassword}
                    onChangeText={value => handleInputChange('newPassword', value)}
                    placeholder="Nouveau mot de passe"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                  <MaterialIcons name="lock" size={20} color={Colors.roleColors.Administrateur} />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Confirmer le nouveau mot de passe</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChangeText={value => handleInputChange('confirmPassword', value)}
                    placeholder="Confirmer le nouveau mot de passe"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                  <MaterialIcons name="lock" size={20} color={Colors.roleColors.Administrateur} />
                </View>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
                <MaterialIcons name="security" size={20} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>Changer le mot de passe</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Informations du compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du Compte</Text>
          
          <View style={styles.infoCard}>
            <MaterialIcons name="admin-panel-settings" size={24} color={Colors.roleColors.Administrateur} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Rôle</Text>
              <Text style={styles.infoValue}>Administrateur</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <MaterialIcons name="calendar-today" size={24} color={Colors.roleColors.Administrateur} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Membre depuis</Text>
              <Text style={styles.infoValue}>
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <MaterialIcons name="security" size={24} color={Colors.roleColors.Administrateur} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Niveau d'accès</Text>
              <Text style={styles.infoValue}>Administrateur Principal</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 25,
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userDetails: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
    padding: 8,
  },
  logoutButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#E8F5E8',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.roleColors.Administrateur,
    marginLeft: 6,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 48,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#999999',
  },
  inputDisabled: {
    backgroundColor: '#FFFFFF',
    color: '#999999',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.roleColors.Administrateur,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});
