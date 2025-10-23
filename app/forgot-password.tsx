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
import { UserStorage } from '../services/userStorage';

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse email');
      return;
    }

    // Vérifier si l'email existe
    const users = await UserStorage.getAllUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      Alert.alert('Erreur', 'Aucun compte trouvé avec cette adresse email');
      return;
    }

    // Générer et sauvegarder le code
    const resetCode = UserStorage.generateResetCode();
    await UserStorage.saveResetCode(email, resetCode);
    
    // Simuler l'envoi d'email (en production, utiliser un service d'email)
    Alert.alert(
      'Code envoyé !', 
      `Un code de réinitialisation a été envoyé à ${email}.\n\nCode de test: ${resetCode}`,
      [
        {
          text: 'OK',
          onPress: () => setStep('code')
        }
      ]
    );
  };

  const handleVerifyCode = async () => {
    if (!code) {
      Alert.alert('Erreur', 'Veuillez entrer le code reçu');
      return;
    }

    const isValid = await UserStorage.verifyResetCode(email, code);
    
    if (isValid) {
      setStep('password');
    } else {
      const canTryAgain = await UserStorage.incrementResetAttempts(email);
      setAttempts(attempts + 1);
      
      if (!canTryAgain) {
        Alert.alert(
          'Trop de tentatives', 
          'Vous avez dépassé le nombre maximum de tentatives. Veuillez demander un nouveau code.',
          [
            {
              text: 'Demander un nouveau code',
              onPress: () => {
                setStep('email');
                setCode('');
                setAttempts(0);
              }
            }
          ]
        );
      } else {
        Alert.alert('Code incorrect', `Tentative ${attempts + 1}/3. Veuillez réessayer.`);
      }
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const success = await UserStorage.updateUserPassword(email, newPassword);
    
    if (success) {
      Alert.alert(
        'Succès', 
        'Votre mot de passe a été modifié avec succès',
        [
          {
            text: 'OK',
            onPress: () => router.push('/login')
          }
        ]
      );
    } else {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la modification du mot de passe');
    }
  };

  const renderEmailStep = () => (
    <View style={styles.formContainer}>
      <Text style={styles.stepTitle}>Mot de passe oublié</Text>
      <Text style={styles.stepDescription}>
        Entrez votre adresse email pour recevoir un code de réinitialisation
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Adresse email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre adresse email"
            placeholderTextColor="#4CAF50"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <MaterialIcons name="email" size={20} color="#4CAF50" />
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSendCode}>
        <Text style={styles.primaryButtonText}>Envoyer le code</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={20} color="#4CAF50" />
        <Text style={styles.backButtonText}>Retour à la connexion</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCodeStep = () => (
    <View style={styles.formContainer}>
      <Text style={styles.stepTitle}>Vérification du code</Text>
      <Text style={styles.stepDescription}>
        Entrez le code à 6 chiffres envoyé à {email}
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Code de vérification</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez le code à 6 chiffres"
            placeholderTextColor="#4CAF50"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
          />
          <MaterialIcons name="security" size={20} color="#4CAF50" />
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyCode}>
        <Text style={styles.primaryButtonText}>Vérifier le code</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => {
          setStep('email');
          setCode('');
        }}
      >
        <Text style={styles.secondaryButtonText}>Changer d'email</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPasswordStep = () => (
    <View style={styles.formContainer}>
      <Text style={styles.stepTitle}>Nouveau mot de passe</Text>
      <Text style={styles.stepDescription}>
        Créez un nouveau mot de passe sécurisé
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre nouveau mot de passe"
            placeholderTextColor="#4CAF50"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <MaterialIcons name="lock" size={20} color="#4CAF50" />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmez votre nouveau mot de passe"
            placeholderTextColor="#4CAF50"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <MaterialIcons name="lock" size={20} color="#4CAF50" />
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleResetPassword}>
        <Text style={styles.primaryButtonText}>Modifier le mot de passe</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandName}>Naatangue</Text>
        <Text style={styles.mainTitle}>Réinitialisation</Text>
      </View>

      {step === 'email' && renderEmailStep()}
      {step === 'code' && renderCodeStep()}
      {step === 'password' && renderPasswordStep()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
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
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
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
  primaryButton: {
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
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
