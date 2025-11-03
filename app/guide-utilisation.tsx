import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';

export default function GuideUtilisationScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Guide d'Utilisation</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bienvenue dans Nataangue !</Text>
          <Text style={styles.sectionText}>
            Cette application vous aide à gérer vos produits agricoles et à trouver des transporteurs facilement.
          </Text>
        </View>

        {/* Pour les Producteurs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👨‍🌾 Pour les Producteurs</Text>
          
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Ajouter vos produits</Text>
              <Text style={styles.stepText}>
                Allez dans "Mes Produits" et ajoutez vos récoltes avec des photos.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Demander un transport</Text>
              <Text style={styles.stepText}>
                Dans "Mes Demandes", créez une demande. Les chauffeurs la verront.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Attendre l'acceptation</Text>
              <Text style={styles.stepText}>
                Un chauffeur acceptera votre demande. Vous pourrez l'appeler.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Suivre la livraison</Text>
              <Text style={styles.stepText}>
                Dans "Suivi Livraison", voyez où est votre produit en temps réel.
              </Text>
            </View>
          </View>
        </View>

        {/* Pour les Transporteurs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚚 Pour les Transporteurs</Text>
          
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Voir les demandes</Text>
              <Text style={styles.stepText}>
                Dans "Demandes Reçues", voyez toutes les demandes des producteurs.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Accepter une demande</Text>
              <Text style={styles.stepText}>
                Si une demande vous intéresse, cliquez sur "Accepter".
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Appeler le producteur</Text>
              <Text style={styles.stepText}>
                Contactez le producteur pour organiser la récupération.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Scanner et livrer</Text>
              <Text style={styles.stepText}>
                Utilisez le scanner pour marquer les produits et livrez-les.
              </Text>
            </View>
          </View>
        </View>

        {/* Conseils */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Conseils Importants</Text>
          
          <View style={styles.tipCard}>
            <MaterialIcons name="lightbulb" size={20} color="#FF9800" />
            <Text style={styles.tipText}>
              Prenez toujours des photos de vos produits pour mieux les vendre.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <MaterialIcons name="phone" size={20} color="#FF9800" />
            <Text style={styles.tipText}>
              Appelez toujours avant de venir chercher les produits.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <MaterialIcons name="schedule" size={20} color="#FF9800" />
            <Text style={styles.tipText}>
              Respectez les horaires convenus avec le producteur.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <MaterialIcons name="security" size={20} color="#FF9800" />
            <Text style={styles.tipText}>
              Manipulez les produits avec précaution pour éviter les pertes.
            </Text>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🆘 Besoin d'Aide ?</Text>
          <Text style={styles.sectionText}>
            Si vous avez des questions ou des problèmes :
          </Text>
          
          <View style={styles.contactCard}>
            <MaterialIcons name="phone" size={24} color="#4CAF50" />
            <Text style={styles.contactText}>+221 33 123 45 67</Text>
          </View>
          
          <View style={styles.contactCard}>
            <MaterialIcons name="message" size={24} color="#4CAF50" />
            <Text style={styles.contactText}>WhatsApp: +221 77 123 45 67</Text>
          </View>
          
          <View style={styles.contactCard}>
            <MaterialIcons name="email" size={24} color="#4CAF50" />
            <Text style={styles.contactText}>support@nataangue.sn</Text>
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
    backgroundColor: '#4CAF50',
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 10,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#E65100',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 10,
    fontWeight: '500',
  },
});
