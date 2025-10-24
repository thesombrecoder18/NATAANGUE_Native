import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.emailOrPhone || !formData.password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    
    try {
      const success = await login(formData.emailOrPhone, formData.password);
      
      if (success) {
        Alert.alert('Succès', 'Connexion réussie !', [
          {
            text: 'OK',
            onPress: () => {
              // Redirection vers le dashboard spécifique selon le rôle
              // Utiliser l'utilisateur du contexte
              if (user) {
                const role = user.role.toLowerCase();
                if (role === 'producteur') {
                  router.push('/acteurs/producteur/dashboard');
                } else if (role === 'transporteur') {
                  router.push('/acteurs/transporteur/dashboard');
                } else if (role === 'distributeur') {
                  router.push('/acteurs/distributeur/dashboard');
                } else if (role === 'consommateur') {
                  router.push('/acteurs/consommateur/dashboard');
                } else if (role === 'administrateur') {
                  router.push('/acteurs/administrateur/dashboard');
                } else {
                  router.push('/(tabs)');
                }
              } else {
                router.push('/(tabs)');
              }
            },
          },
        ]);
      } else {
        Alert.alert('Erreur', 'Identifiants incorrects');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
    }
  };

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
        <Text style={styles.mainTitle}>Se connecter</Text>
        <Text style={styles.subtitle}>Accédez à votre compte pour une traçabilité transparente.</Text>
      </View>

      {/* Formulaire de connexion */}
      <View style={styles.formContainer}>
        {/* Nom d'utilisateur ou Téléphone */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nom d'utilisateur ou Téléphone</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre nom d'utilisateur ou téléphone"
              placeholderTextColor="#4CAF50"
              value={formData.emailOrPhone}
              onChangeText={value => handleInputChange('emailOrPhone', value)}
            />
            <MaterialIcons name="person" size={20} color="#4CAF50" />
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
            <MaterialIcons name="lock" size={20} color="#4CAF50" />
          </View>
        </View>

        {/* Lien mot de passe oublié */}
        <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={() => router.push('/forgot-password')}
        >
          <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        {/* Bouton de connexion */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>

        {/* Lien de création de compte */}
        <TouchableOpacity 
          style={styles.registerLinkContainer}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.registerLinkText}>
            Pas de compte ? <Text style={styles.registerLink}>S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
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
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLinkContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  registerLinkText: {
    fontSize: 16,
    color: '#333333',
  },
  registerLink: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});