import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

export default function ProducteurTransporteursScreen() {
  const [transporteurs, setTransporteurs] = useState([
    {
      id: '1',
      nom: 'Moussa Diop',
      entreprise: 'Transport Diop SARL',
      telephone: '+221 77 123 45 67',
      email: 'moussa@transportdiop.sn',
      localisation: 'Dakar, Sénégal',
      distance: '15 km',
      evaluation: 4.8,
      avis: 24,
      prixKm: '500 FCFA',
      capacite: '1000 kg',
      typeVehicule: 'Camion frigorifique',
      disponibilite: 'Disponible',
      specialites: ['Légumes', 'Fruits', 'Céréales'],
      statut: 'En ligne',
      derniereActivite: 'Il y a 5 min'
    },
    {
      id: '2',
      nom: 'Amadou Fall',
      entreprise: 'Logistique Fall',
      telephone: '+221 78 987 65 43',
      email: 'amadou@logistique.sn',
      localisation: 'Thiès, Sénégal',
      distance: '8 km',
      evaluation: 4.6,
      avis: 18,
      prixKm: '450 FCFA',
      capacite: '800 kg',
      typeVehicule: 'Camion standard',
      disponibilite: 'Disponible',
      specialites: ['Légumes', 'Céréales'],
      statut: 'En ligne',
      derniereActivite: 'Il y a 10 min'
    },
    {
      id: '3',
      nom: 'Ibrahima Traoré',
      entreprise: 'Transport Express',
      telephone: '+221 76 555 44 33',
      email: 'ibrahima@express.sn',
      localisation: 'Saint-Louis, Sénégal',
      distance: '45 km',
      evaluation: 4.9,
      avis: 32,
      prixKm: '600 FCFA',
      capacite: '1200 kg',
      typeVehicule: 'Camion frigorifique',
      disponibilite: 'Occupé',
      specialites: ['Fruits', 'Légumes'],
      statut: 'Hors ligne',
      derniereActivite: 'Il y a 2h'
    }
  ]);

  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedTransporteur, setSelectedTransporteur] = useState<any>(null);
  const [message, setMessage] = useState('');

  const handleContactTransporteur = (transporteur: any) => {
    setSelectedTransporteur(transporteur);
    setShowContactModal(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un message');
      return;
    }

    // Simulation d'envoi de message avec plus de réalisme
    Alert.alert(
      'Message envoyé',
      `Votre message a été envoyé à ${selectedTransporteur?.nom}.\n\nLe transporteur recevra une notification et pourra vous répondre.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowContactModal(false);
            setMessage('');
            setSelectedTransporteur(null);
            // Simulation d'ajout à l'historique des messages
            console.log(`Message envoyé à ${selectedTransporteur?.nom}: ${message}`);
          }
        }
      ]
    );
  };

  const handleCallTransporteur = (transporteur: any) => {
    Alert.alert(
      'Appeler le transporteur',
      `Voulez-vous appeler ${transporteur.nom} ?\n\nTéléphone: ${transporteur.telephone}`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Appeler',
          onPress: () => {
            Alert.alert('Appel', 'Fonctionnalité d\'appel en cours de développement');
          }
        }
      ]
    );
  };

  const handleRequestTransport = (transporteur: any) => {
    Alert.alert(
      'Demander un transport',
      `Voulez-vous faire une demande de transport à ${transporteur.nom} ?\n\nCette demande sera ajoutée à votre suivi de livraison.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Demander',
          onPress: () => {
            Alert.alert(
              'Demande envoyée', 
              `Demande de transport envoyée à ${transporteur.nom}.\n\nVous pouvez suivre l'état de votre demande dans "Suivi Livraison".`,
              [
                {
                  text: 'Voir Suivi',
                  onPress: () => router.push('/acteurs/producteur/suivi-livraison')
                },
                { text: 'OK' }
              ]
            );
            // Simulation d'ajout d'une nouvelle livraison
            console.log(`Demande de transport envoyée à ${transporteur.nom}`);
          }
        }
      ]
    );
  };

  const getDisponibiliteColor = (disponibilite: string) => {
    switch (disponibilite) {
      case 'Disponible': return '#4CAF50';
      case 'Occupé': return '#FF9800';
      case 'Hors ligne': return '#F44336';
      default: return '#999';
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En ligne': return '#4CAF50';
      case 'Hors ligne': return '#F44336';
      default: return '#999';
    }
  };

  const renderTransporteur = (transporteur: any) => (
    <View key={transporteur.id} style={styles.transporteurCard}>
      <View style={styles.transporteurHeader}>
        <View style={styles.transporteurInfo}>
          <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
          <View style={styles.transporteurDetails}>
            <Text style={styles.transporteurNom}>{transporteur.nom}</Text>
            <Text style={styles.transporteurEntreprise}>{transporteur.entreprise}</Text>
          </View>
        </View>
        <View style={styles.transporteurStatus}>
          <View style={[styles.statutBadge, { backgroundColor: getStatutColor(transporteur.statut) }]}>
            <Text style={styles.statutText}>{transporteur.statut}</Text>
          </View>
          <View style={[styles.disponibiliteBadge, { backgroundColor: getDisponibiliteColor(transporteur.disponibilite) }]}>
            <Text style={styles.disponibiliteText}>{transporteur.disponibilite}</Text>
          </View>
        </View>
      </View>

      <View style={styles.transporteurContent}>
        <View style={styles.transporteurRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.transporteurLabel}>Localisation:</Text>
          <Text style={styles.transporteurValue}>{transporteur.localisation} ({transporteur.distance})</Text>
        </View>
        <View style={styles.transporteurRow}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.transporteurLabel}>Évaluation:</Text>
          <Text style={styles.transporteurValue}>{transporteur.evaluation}/5 ({transporteur.avis} avis)</Text>
        </View>
        <View style={styles.transporteurRow}>
          <MaterialIcons name="attach-money" size={16} color="#4CAF50" />
          <Text style={styles.transporteurLabel}>Prix:</Text>
          <Text style={styles.transporteurValue}>{transporteur.prixKm}/km</Text>
        </View>
        <View style={styles.transporteurRow}>
          <MaterialIcons name="inventory" size={16} color="#2196F3" />
          <Text style={styles.transporteurLabel}>Capacité:</Text>
          <Text style={styles.transporteurValue}>{transporteur.capacite}</Text>
        </View>
        <View style={styles.transporteurRow}>
          <MaterialIcons name="local-shipping" size={16} color="#FF9800" />
          <Text style={styles.transporteurLabel}>Véhicule:</Text>
          <Text style={styles.transporteurValue}>{transporteur.typeVehicule}</Text>
        </View>
        <View style={styles.transporteurRow}>
          <MaterialIcons name="category" size={16} color="#9C27B0" />
          <Text style={styles.transporteurLabel}>Spécialités:</Text>
          <Text style={styles.transporteurValue}>{transporteur.specialites.join(', ')}</Text>
        </View>
        <View style={styles.transporteurRow}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.transporteurLabel}>Dernière activité:</Text>
          <Text style={styles.transporteurValue}>{transporteur.derniereActivite}</Text>
        </View>
      </View>

      <View style={styles.transporteurActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.contactButton]}
          onPress={() => handleContactTransporteur(transporteur)}
        >
          <MaterialIcons name="message" size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Contacter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => handleCallTransporteur(transporteur)}
        >
          <MaterialIcons name="phone" size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Appeler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.requestButton]}
          onPress={() => handleRequestTransport(transporteur)}
          disabled={transporteur.disponibilite !== 'Disponible'}
        >
          <MaterialIcons name="local-shipping" size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Demander</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transporteurs Disponibles</Text>
        <TouchableOpacity onPress={() => Alert.alert('Filtres', 'Fonctionnalité de filtres en cours de développement')}>
          <MaterialIcons name="filter-list" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Statistiques */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <MaterialIcons name="local-shipping" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{transporteurs.length}</Text>
            <Text style={styles.statLabel}>Transporteurs</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{transporteurs.filter(t => t.disponibilite === 'Disponible').length}</Text>
            <Text style={styles.statLabel}>Disponibles</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="schedule" size={24} color="#FF9800" />
            <Text style={styles.statValue}>{transporteurs.filter(t => t.disponibilite === 'Occupé').length}</Text>
            <Text style={styles.statLabel}>Occupés</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="offline-pin" size={24} color="#F44336" />
            <Text style={styles.statValue}>{transporteurs.filter(t => t.statut === 'Hors ligne').length}</Text>
            <Text style={styles.statLabel}>Hors ligne</Text>
          </View>
        </View>

        {/* Liste des transporteurs */}
        <View style={styles.transporteursSection}>
          <Text style={styles.sectionTitle}>Transporteurs Proches</Text>
          {transporteurs.map(renderTransporteur)}
        </View>
      </ScrollView>

      {/* Modal de contact */}
      <Modal visible={showContactModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Contacter {selectedTransporteur?.nom}</Text>
              <TouchableOpacity onPress={() => setShowContactModal(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.contactInfo}>
                <View style={styles.contactRow}>
                  <MaterialIcons name="phone" size={20} color="#4CAF50" />
                  <Text style={styles.contactText}>{selectedTransporteur?.telephone}</Text>
                </View>
                <View style={styles.contactRow}>
                  <MaterialIcons name="email" size={20} color="#4CAF50" />
                  <Text style={styles.contactText}>{selectedTransporteur?.email}</Text>
                </View>
                <View style={styles.contactRow}>
                  <MaterialIcons name="location-on" size={20} color="#4CAF50" />
                  <Text style={styles.contactText}>{selectedTransporteur?.localisation}</Text>
                </View>
              </View>

              <TextInput
                style={styles.messageInput}
                placeholder="Votre message..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowContactModal(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.sendButton]}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color="#999" />
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/produits')}>
          <MaterialIcons name="eco" size={24} color="#999" />
          <Text style={styles.navLabel}>Produits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/scanner')}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#999" />
          <Text style={styles.navLabel}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/cultures')}>
          <MaterialIcons name="agriculture" size={24} color="#999" />
          <Text style={styles.navLabel}>Cultures</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/parametres')}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  transporteursSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  transporteurCard: {
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
  transporteurHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transporteurInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transporteurDetails: {
    marginLeft: 12,
  },
  transporteurNom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  transporteurEntreprise: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  transporteurStatus: {
    alignItems: 'flex-end',
  },
  statutBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statutText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  disponibiliteBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  disponibiliteText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  transporteurContent: {
    marginBottom: 15,
  },
  transporteurRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  transporteurLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    fontWeight: '500',
    minWidth: 80,
  },
  transporteurValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    marginLeft: 8,
  },
  transporteurActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  contactButton: {
    backgroundColor: '#2196F3',
  },
  callButton: {
    backgroundColor: '#4CAF50',
  },
  requestButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
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
  contactInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 10,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
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
  sendButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
