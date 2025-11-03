import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

export default function TransporteurScannerScreen() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [scannedCodes, setScannedCodes] = useState([
    {
      id: '1',
      code: 'QR_TOMATES_001',
      produit: 'Tomates Bio',
      producteur: 'Ferme Diallo',
      quantite: '50 kg',
      dateScan: '20 février 2024',
      statut: 'En transport',
      destination: 'Dakar',
      chauffeur: 'Moussa Diop',
      vehicule: 'Camion 001',
      notes: 'Produit en bon état',
      // Détails enrichis du produit
      details: {
        type: 'Légumes',
        variete: 'Tomates cerises',
        certification: 'Bio certifié',
        dateRecolte: '19 février 2024',
        dateExpiration: '26 février 2024',
        conditionsTransport: 'Réfrigéré à 4°C',
        emballage: 'Cagettes en bois',
        origine: 'Ferme Diallo, Thiès',
        instructionsSpeciales: 'Manipuler avec précaution',
        contactProducteur: '+221 77 123 45 67',
        prixVente: '1500 FCFA/kg',
        qualite: {
          temperature: '4°C',
          humidite: '85%',
          pesticides: 'Aucun',
          organique: 'Oui'
        }
      }
    },
    {
      id: '2',
      code: 'QR_RIZ_002',
      produit: 'Riz Bio',
      producteur: 'Ferme Ba',
      quantite: '200 kg',
      dateScan: '18 février 2024',
      statut: 'Livré',
      destination: 'Saint-Louis',
      chauffeur: 'Amadou Fall',
      vehicule: 'Camion 002',
      notes: 'Livraison terminée',
      // Détails enrichis du produit
      details: {
        type: 'Céréales',
        variete: 'Riz parfumé',
        certification: 'Bio certifié',
        dateRecolte: '15 février 2024',
        dateExpiration: '15 mars 2024',
        conditionsTransport: 'Température ambiante',
        emballage: 'Sacs de 50kg',
        origine: 'Ferme Ba, Kaolack',
        instructionsSpeciales: 'Éviter l\'humidité',
        contactProducteur: '+221 78 987 65 43',
        prixVente: '800 FCFA/kg',
        qualite: {
          temperature: '18°C',
          humidite: '70%',
          pesticides: 'Aucun',
          organique: 'Oui'
        }
      }
    },
    {
      id: '3',
      code: 'QR_OIGNONS_003',
      produit: 'Oignons Bio',
      producteur: 'Ferme Sarr',
      quantite: '100 kg',
      dateScan: '19 février 2024',
      statut: 'En stock',
      destination: 'Thiès',
      chauffeur: 'Ibrahima Traoré',
      vehicule: 'Camion 001',
      notes: 'Stocké à l\'entrepôt',
      // Détails enrichis du produit
      details: {
        type: 'Légumes',
        variete: 'Oignons jaunes',
        certification: 'Bio certifié',
        dateRecolte: '18 février 2024',
        dateExpiration: '25 février 2024',
        conditionsTransport: 'Température fraîche',
        emballage: 'Filets',
        origine: 'Ferme Sarr, Thiès',
        instructionsSpeciales: 'Ventilation importante',
        contactProducteur: '+221 76 555 44 33',
        prixVente: '1200 FCFA/kg',
        qualite: {
          temperature: '15°C',
          humidite: '75%',
          pesticides: 'Aucun',
          organique: 'Oui'
        }
      }
    }
  ]);

  const handleScanQR = () => {
    Alert.alert(
      'Scanner QR Code',
      'Fonctionnalité de scan en cours de développement. Pour l\'instant, vous pouvez ajouter manuellement un produit scanné.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Ajouter Manuellement', 
          onPress: () => {
            const newCode = {
              id: Date.now().toString(),
              code: `QR_MANUAL_${Date.now()}`,
              produit: 'Produit Scanné',
              producteur: 'Producteur',
              quantite: '50 kg',
              dateScan: new Date().toLocaleDateString('fr-FR'),
              statut: 'En transport',
              destination: 'Destination',
              chauffeur: 'Chauffeur',
              vehicule: 'Véhicule',
              notes: 'Ajouté manuellement'
            };
            setScannedCodes([newCode, ...scannedCodes]);
            Alert.alert('Succès', 'Produit ajouté avec succès');
          }
        }
      ]
    );
  };

  const handleUpdateStatut = (id: string, nouveauStatut: string) => {
    setScannedCodes(scannedCodes.map(code => 
      code.id === id ? { ...code, statut: nouveauStatut } : code
    ));
    Alert.alert('Succès', `Statut mis à jour : ${nouveauStatut}`);
  };

  const handleDeleteCode = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer ce code scanné ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setScannedCodes(scannedCodes.filter(code => code.id !== id));
            Alert.alert('Succès', 'Code supprimé');
          }
        }
      ]
    );
  };

  const handleViewDetails = (code: any) => {
    setSelectedProduct(code);
    setShowDetailsModal(true);
  };

  const handleContactProducteur = (product: any) => {
    Alert.alert(
      'Contacter le producteur',
      `Voulez-vous contacter ${product.producteur} ?\n\nTéléphone: ${product.details.contactProducteur}`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Appeler',
          onPress: () => {
            Alert.alert(
              'Appel en cours',
              `Appel vers ${product.details.contactProducteur}...\n\nLe producteur sera notifié de votre appel.`,
              [{ text: 'OK' }]
            );
          }
        },
        {
          text: 'Message',
          onPress: () => {
            Alert.alert(
              'Message envoyé',
              `Message envoyé à ${product.producteur}.\n\nIl recevra une notification et pourra vous répondre.`,
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En transport': return '#FFA500';
      case 'Livré': return '#4CAF50';
      case 'En stock': return '#2196F3';
      default: return '#999';
    }
  };

  const renderScannedCode = (code: any) => (
    <View key={code.id} style={styles.codeCard}>
      <View style={styles.codeHeader}>
        <View style={styles.codeInfo}>
          <MaterialIcons name="qr-code" size={20} color="#4CAF50" />
          <View style={styles.codeDetails}>
            <Text style={styles.codeProduit}>{code.produit}</Text>
            <Text style={styles.codeCode}>Code: {code.code}</Text>
          </View>
        </View>
        <View style={[styles.statutBadge, { backgroundColor: getStatutColor(code.statut) }]}>
          <Text style={styles.statutText}>{code.statut}</Text>
        </View>
      </View>

      <View style={styles.codeContent}>
        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>Producteur:</Text>
          <Text style={styles.codeValue}>{code.producteur}</Text>
        </View>
        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>Quantité:</Text>
          <Text style={styles.codeValue}>{code.quantite}</Text>
        </View>
        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>Destination:</Text>
          <Text style={styles.codeValue}>{code.destination}</Text>
        </View>
        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>Chauffeur:</Text>
          <Text style={styles.codeValue}>{code.chauffeur}</Text>
        </View>
        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>Véhicule:</Text>
          <Text style={styles.codeValue}>{code.vehicule}</Text>
        </View>
        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>Date scan:</Text>
          <Text style={styles.codeValue}>{code.dateScan}</Text>
        </View>
        {code.notes && (
          <View style={styles.codeRow}>
            <Text style={styles.codeLabel}>Notes:</Text>
            <Text style={styles.codeValue}>{code.notes}</Text>
          </View>
        )}
      </View>

      <View style={styles.codeActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
          onPress={() => handleViewDetails(code)}
        >
          <Text style={styles.actionButtonText}>Voir Détails</Text>
        </TouchableOpacity>
        {code.statut === 'En stock' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#FFA500' }]}
            onPress={() => handleUpdateStatut(code.id, 'En transport')}
          >
            <Text style={styles.actionButtonText}>Démarrer Transport</Text>
          </TouchableOpacity>
        )}
        {code.statut === 'En transport' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => handleUpdateStatut(code.id, 'Livré')}
          >
            <Text style={styles.actionButtonText}>Marquer Livré</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#F44336' }]}
          onPress={() => handleDeleteCode(code.id)}
        >
          <Text style={styles.actionButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#4CAF50' }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scanner QR</Text>
          <TouchableOpacity onPress={handleScanQR}>
            <MaterialIcons name="qr-code-scanner" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Zone de scan */}
        <View style={styles.scanSection}>
          <View style={styles.scanArea}>
            <MaterialIcons name="qr-code-scanner" size={60} color="#4CAF50" />
            <Text style={styles.scanTitle}>Scanner un QR Code</Text>
            <Text style={styles.scanDescription}>
              Scannez le QR code d'un produit pour le récupérer ou le livrer
            </Text>
            <TouchableOpacity style={styles.scanButton} onPress={handleScanQR}>
              <Text style={styles.scanButtonText}>Scanner</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Actions rapides */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push('/acteurs/transporteur/livraisons')}
            >
              <MaterialIcons name="local-shipping" size={32} color="#4CAF50" />
              <Text style={styles.quickActionText}>Mes Livraisons</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push('/acteurs/transporteur/entrepots')}
            >
              <MaterialIcons name="warehouse" size={32} color="#4CAF50" />
              <Text style={styles.quickActionText}>Mes Entrepôts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistiques */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <MaterialIcons name="qr-code" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{scannedCodes.length}</Text>
            <Text style={styles.statLabel}>Codes Scannés</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="local-shipping" size={24} color="#FFA500" />
            <Text style={styles.statValue}>{scannedCodes.filter(c => c.statut === 'En transport').length}</Text>
            <Text style={styles.statLabel}>En Transport</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{scannedCodes.filter(c => c.statut === 'Livré').length}</Text>
            <Text style={styles.statLabel}>Livrés</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="warehouse" size={24} color="#2196F3" />
            <Text style={styles.statValue}>{scannedCodes.filter(c => c.statut === 'En stock').length}</Text>
            <Text style={styles.statLabel}>En Stock</Text>
          </View>
        </View>

        {/* Historique des scans */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Historique des Scans</Text>
          {scannedCodes.map(renderScannedCode)}
        </View>
      </ScrollView>

      {/* Modal Détails Produit */}
      {showDetailsModal && selectedProduct && (
        <View style={styles.detailsModal}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Détails du Produit</Text>
            <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
              <MaterialIcons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.detailsContent}>
            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>Informations Générales</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Produit:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.produit}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Type:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.type}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Variété:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.variete}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Certification:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.certification}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Quantité:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.quantite}</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>Origine et Dates</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Origine:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.origine}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Date récolte:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.dateRecolte}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Date expiration:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.dateExpiration}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Prix vente:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.prixVente}</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>Conditions de Transport</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Conditions:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.conditionsTransport}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Emballage:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.emballage}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Instructions:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.instructionsSpeciales}</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>Qualité</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Température:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.qualite.temperature}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Humidité:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.qualite.humidite}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Pesticides:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.qualite.pesticides}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Organique:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.qualite.organique}</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>Contact Producteur</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Producteur:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.producteur}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Téléphone:</Text>
                <Text style={styles.detailsValue}>{selectedProduct.details.contactProducteur}</Text>
              </View>
              <TouchableOpacity
                style={styles.contactProducteurButton}
                onPress={() => handleContactProducteur(selectedProduct)}
              >
                <MaterialIcons name="phone" size={18} color="#FFFFFF" />
                <Text style={styles.contactProducteurButtonText}>Contacter Producteur</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.detailsFooter}>
            <TouchableOpacity
              style={styles.detailsCloseButton}
              onPress={() => setShowDetailsModal(false)}
            >
              <Text style={styles.detailsCloseButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
          <MaterialIcons name="qr-code-scanner" size={24} color="#4CAF50" />
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
  scanSection: {
    padding: 20,
  },
  scanArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  scanDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 10,
    textAlign: 'center',
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
  historySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  codeCard: {
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
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  codeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  codeDetails: {
    marginLeft: 12,
  },
  codeProduit: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  codeCode: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statutBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statutText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  codeContent: {
    marginBottom: 15,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  codeLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  codeValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  codeActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
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
  detailsModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  detailsContent: {
    flex: 1,
    padding: 20,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailsLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    minWidth: 120,
  },
  detailsValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  detailsFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  detailsCloseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailsCloseButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactProducteurButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  contactProducteurButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
});
