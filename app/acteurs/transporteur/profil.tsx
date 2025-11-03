import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

export default function TransporteurProfilScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nom: 'Moussa Diop',
    telephone: '+221 77 123 45 67',
    adresse: 'Dakar, Sénégal',
    entreprise: 'Transport Diop SARL',
    numeroPermis: 'PERM123456',
    typeVehicule: 'Camion frigorifique'
  });

  const [passwordInfo, setPasswordInfo] = useState({
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmerMotDePasse: ''
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Succès', 'Informations mises à jour avec succès');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Réinitialiser les données si nécessaire
  };

  const handleChangePassword = () => {
    if (!passwordInfo.ancienMotDePasse || !passwordInfo.nouveauMotDePasse || !passwordInfo.confirmerMotDePasse) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (passwordInfo.nouveauMotDePasse !== passwordInfo.confirmerMotDePasse) {
      Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (passwordInfo.nouveauMotDePasse.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    Alert.alert('Succès', 'Mot de passe modifié avec succès');
    setPasswordInfo({
      ancienMotDePasse: '',
      nouveauMotDePasse: '',
      confirmerMotDePasse: ''
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#4CAF50' }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mon Profil</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            <MaterialIcons name="logout" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Informations personnelles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informations Personnelles</Text>
            {!isEditing ? (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <MaterialIcons name="edit" size={24} color="#4CAF50" />
              </TouchableOpacity>
            ) : (
              <View style={styles.editActions}>
                <TouchableOpacity onPress={handleCancel}>
                  <MaterialIcons name="close" size={24} color="#F44336" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                  <MaterialIcons name="check" size={24} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nom complet</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.nom}
                  onChangeText={(text) => setUserInfo({ ...userInfo, nom: text })}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.nom}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Téléphone</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.telephone}
                  onChangeText={(text) => setUserInfo({ ...userInfo, telephone: text })}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.telephone}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Adresse</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.adresse}
                  onChangeText={(text) => setUserInfo({ ...userInfo, adresse: text })}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.adresse}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Entreprise</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.entreprise}
                  onChangeText={(text) => setUserInfo({ ...userInfo, entreprise: text })}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.entreprise}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Numéro de permis</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.numeroPermis}
                  onChangeText={(text) => setUserInfo({ ...userInfo, numeroPermis: text })}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.numeroPermis}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type de véhicule</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.typeVehicule}
                  onChangeText={(text) => setUserInfo({ ...userInfo, typeVehicule: text })}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.typeVehicule}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Sécurité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sécurité</Text>
          
          <View style={styles.infoCard}>
            <TouchableOpacity style={styles.securityRow} onPress={handleChangePassword}>
              <View style={styles.securityInfo}>
                <MaterialIcons name="lock" size={24} color="#4CAF50" />
                <View style={styles.securityDetails}>
                  <Text style={styles.securityTitle}>Changer le mot de passe</Text>
                  <Text style={styles.securityDescription}>Modifiez votre mot de passe pour plus de sécurité</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Informations du compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du Compte</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rôle</Text>
              <Text style={styles.infoValue}>Transporteur</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Membre depuis</Text>
              <Text style={styles.infoValue}>Janvier 2024</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Niveau d'accès</Text>
              <Text style={styles.infoValue}>Transport et Logistique</Text>
            </View>
          </View>
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
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  infoInput: {
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityDetails: {
    marginLeft: 15,
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  securityDescription: {
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
