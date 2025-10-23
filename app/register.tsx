import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    role: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.username || !formData.phone || !formData.password || !formData.role) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!acceptTerms) {
      Alert.alert('Erreur', 'Veuillez accepter les Termes & Conditions');
      return;
    }
    
    try {
      const success = await register({
        username: formData.username,
        phone: formData.phone,
        email: formData.email || '',
        password: formData.password,
        role: formData.role as 'Producteur' | 'Transporteur' | 'Distributeur' | 'Consommateur',
      });
      
      if (success) {
        Alert.alert('Succès', 'Inscription réussie !', [
          {
            text: 'OK',
            onPress: () => {
              router.push('/(tabs)/dashboard');
            },
          },
        ]);
      } else {
        Alert.alert('Erreur', 'Ce nom d\'utilisateur, téléphone ou email est déjà utilisé');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
    }
  };

  const roles = [
    'Producteur',
    'Transporteur', 
    'Distributeur',
    'Consommateur'
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Bouton Retour */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)')}
        >
          <MaterialIcons name="arrow-back" size={24} color="#4CAF50" />
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>

      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.brandName}>Naatangue</Text>
        <Text style={styles.mainTitle}>Créer votre compte Naatangue</Text>
        <Text style={styles.subtitle}>Rejoignez la communauté pour une traçabilité transparente.</Text>
      </View>

      {/* Formulaire d'inscription */}
      <View style={styles.formContainer}>
        {/* Nom d'utilisateur */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nom d'utilisateur</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre nom d'utilisateur"
              placeholderTextColor="#4CAF50"
              value={formData.username}
              onChangeText={value => handleInputChange('username', value)}
            />
            <MaterialIcons name="person" size={20} color="#4CAF50" />
          </View>
        </View>

        {/* Numéro de téléphone */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Numéro de téléphone</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre numéro de téléphone"
              placeholderTextColor="#4CAF50"
              value={formData.phone}
              onChangeText={value => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
            <MaterialIcons name="phone" size={20} color="#4CAF50" />
          </View>
        </View>

        {/* Adresse e-mail (facultatif) */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Adresse e-mail <Text style={styles.optionalText}>(facultatif)</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre adresse e-mail"
              placeholderTextColor="#4CAF50"
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              keyboardType="email-address"
            />
            <MaterialIcons name="email" size={20} color="#4CAF50" />
          </View>
        </View>

        {/* Mot de passe */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mot de passe</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre mot de passe"
              placeholderTextColor="#4CAF50"
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
              secureTextEntry
            />
            <MaterialIcons name="visibility-off" size={20} color="#4CAF50" />
          </View>
        </View>

        {/* Rôle */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Vous êtes un :</Text>
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => {
              if (Platform.OS === 'android') {
                setShowRoleModal(true);
              } else {
                Alert.alert(
                  'Sélectionner votre rôle',
                  'Choisissez votre rôle dans la chaîne de traçabilité agricole :',
                  [
                    { 
                      text: '🌱 Producteur\nCultive et produit les denrées', 
                      onPress: () => handleInputChange('role', 'Producteur') 
                    },
                    { 
                      text: '🚛 Transporteur\nTransporte les produits', 
                      onPress: () => handleInputChange('role', 'Transporteur') 
                    },
                    { 
                      text: '🏪 Distributeur\nRevend les produits', 
                      onPress: () => handleInputChange('role', 'Distributeur') 
                    },
                    { 
                      text: '👤 Consommateur\nAchète et consomme les produits', 
                      onPress: () => handleInputChange('role', 'Consommateur') 
                    },
                    { text: 'Annuler', style: 'cancel' }
                  ],
                  { cancelable: true }
                );
              }
            }}
          >
            <Text style={[styles.input, { color: formData.role ? '#333333' : '#4CAF50' }]}>
              {formData.role || 'Sélectionnez votre rôle'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {/* Checkbox Termes & Conditions */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            {acceptTerms && <MaterialIcons name="check" size={16} color="#4CAF50" />}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            J'accepte les <Text style={styles.linkText}>Termes & Conditions</Text> et la <Text style={styles.linkText}>Politique de Confidentialité</Text>.
          </Text>
        </View>

        {/* Bouton d'inscription */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>S'inscrire</Text>
        </TouchableOpacity>

        {/* Lien de connexion */}
        <TouchableOpacity 
          style={styles.loginLinkContainer}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginLinkText}>
            Déjà un compte ? <Text style={styles.loginLink}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal pour sélection de rôle sur Android */}
      <Modal
        visible={showRoleModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRoleModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sélectionner votre rôle</Text>
            <Text style={styles.modalDescription}>
              Choisissez votre rôle dans la chaîne de traçabilité agricole
            </Text>
            
            <View style={styles.roleOptions}>
              <TouchableOpacity
                style={styles.roleOption}
                onPress={() => {
                  handleInputChange('role', 'Producteur');
                  setShowRoleModal(false);
                }}
              >
                <MaterialIcons name="agriculture" size={24} color="#4CAF50" />
                <View style={styles.roleTextContainer}>
                  <Text style={styles.roleTitle}>Producteur</Text>
                  <Text style={styles.roleDescription}>Cultive et produit les denrées</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.roleOption}
                onPress={() => {
                  handleInputChange('role', 'Transporteur');
                  setShowRoleModal(false);
                }}
              >
                <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
                <View style={styles.roleTextContainer}>
                  <Text style={styles.roleTitle}>Transporteur</Text>
                  <Text style={styles.roleDescription}>Transporte les produits</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.roleOption}
                onPress={() => {
                  handleInputChange('role', 'Distributeur');
                  setShowRoleModal(false);
                }}
              >
                <MaterialIcons name="store" size={24} color="#4CAF50" />
                <View style={styles.roleTextContainer}>
                  <Text style={styles.roleTitle}>Distributeur</Text>
                  <Text style={styles.roleDescription}>Revend les produits</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.roleOption}
                onPress={() => {
                  handleInputChange('role', 'Consommateur');
                  setShowRoleModal(false);
                }}
              >
                <MaterialIcons name="person" size={24} color="#4CAF50" />
                <View style={styles.roleTextContainer}>
                  <Text style={styles.roleTitle}>Consommateur</Text>
                  <Text style={styles.roleDescription}>Achète et consomme les produits</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowRoleModal(false)}
            >
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButtonContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E8F5E8',
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  optionalText: {
    color: '#FFD54F',
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  linkText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#333333',
  },
  loginLink: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  // Styles pour le modal de sélection de rôle
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  roleOptions: {
    marginBottom: 20,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8F5E8',
  },
  roleTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  modalCancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  modalCancelText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});
