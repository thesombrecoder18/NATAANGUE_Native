import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { useAuth } from '../../../contexts/AuthContext';

export default function ProducteurScannerScreen() {
  const { user, logout } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCodes, setScannedCodes] = useState([
    {
      id: '1',
      code: '001',
      produit: 'Tomates',
      photo: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=T',
      dateScan: '20 février 2024',
      statut: 'Vendu'
    },
    {
      id: '2',
      code: '002',
      produit: 'Riz',
      photo: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=R',
      dateScan: '22 février 2024',
      statut: 'En stock'
    }
  ]);

  const handleLogout = async () => {
    await logout();
    router.push('/(tabs)');
  };

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulation du scan
    setTimeout(() => {
      const newCode = {
        id: Date.now().toString(),
        code: `QR_SCAN_${Date.now()}`,
        produit: 'Produit Scanné',
        lot: 'Lot Test',
        dateScan: new Date().toLocaleString(),
        statut: 'En attente'
      };
      setScannedCodes([newCode, ...scannedCodes]);
      setIsScanning(false);
      Alert.alert('Scan Réussi', `Code scanné: ${newCode.code}`);
    }, 2000);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleTakePhoto = () => {
    Alert.alert(
      'Prendre une photo',
      'Prendre une photo de votre produit pour le marquer',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Prendre photo', onPress: () => {
          const newCode = {
            id: Date.now().toString(),
            code: String(scannedCodes.length + 1).padStart(3, '0'),
            produit: 'Nouveau Produit',
            photo: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=N',
            dateScan: new Date().toLocaleDateString('fr-FR'),
            statut: 'En stock'
          };
          setScannedCodes([newCode, ...scannedCodes]);
          Alert.alert('Succès', 'Produit marqué avec succès');
        }}
      ]
    );
  };

  const handleToggleStatus = (id: string) => {
    setScannedCodes(scannedCodes.map(code => 
      code.id === id ? { 
        ...code, 
        statut: code.statut === 'En stock' ? 'Vendu' : 'En stock' 
      } : code
    ));
    Alert.alert('Succès', 'Statut mis à jour');
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Vendu': return '#4CAF50';
      case 'En stock': return '#FF9800';
      default: return '#666666';
    }
  };

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marquer mes Produits</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Zone de marquage */}
      <View style={styles.scanContainer}>
        <View style={styles.scanArea}>
          <MaterialIcons 
            name="camera-alt" 
            size={80} 
            color={Colors.roleColors.Producteur} 
          />
          <Text style={styles.scanTitle}>
            Marquer un Produit
          </Text>
          <Text style={styles.scanSubtitle}>
            Prenez une photo de votre produit pour le marquer et le suivre
          </Text>
        </View>

        <View style={styles.scanActions}>
          <TouchableOpacity style={styles.scanButton} onPress={handleTakePhoto}>
            <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
            <Text style={styles.scanButtonText}>Prendre une Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Actions rapides */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/acteurs/producteur/produits')}>
          <MaterialIcons name="eco" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.actionButtonText}>Mes Produits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/acteurs/producteur/cultures')}>
          <MaterialIcons name="agriculture" size={24} color={Colors.roleColors.Producteur} />
          <Text style={styles.actionButtonText}>Mes Champs</Text>
        </TouchableOpacity>
      </View>

      {/* Mes produits marqués */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Mes Produits Marqués</Text>
        {scannedCodes.map((code) => (
          <View key={code.id} style={styles.scanItem}>
            <View style={styles.scanImageContainer}>
              <View style={styles.scanImage}>
                <MaterialIcons name="eco" size={24} color={Colors.roleColors.Producteur} />
              </View>
            </View>
            <View style={styles.scanInfo}>
              <Text style={styles.scanCode}>#{code.code}</Text>
              <Text style={styles.scanProduit}>{code.produit}</Text>
              <Text style={styles.scanDate}>{code.dateScan}</Text>
            </View>
            <View style={styles.scanActions}>
              <TouchableOpacity
                style={[styles.statutBadge, { backgroundColor: getStatutColor(code.statut) + '20' }]}
                onPress={() => handleToggleStatus(code.id)}
              >
                <Text style={[styles.statutText, { color: getStatutColor(code.statut) }]}>
                  {code.statut}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

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
  scanContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanArea: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 15,
    marginBottom: 8,
  },
  scanSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  scanActions: {
    marginTop: 20,
  },
  scanButton: {
    backgroundColor: Colors.roleColors.Producteur,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  stopButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 12,
    color: Colors.roleColors.Producteur,
    fontWeight: '600',
    marginLeft: 6,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  scanItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  scanImageContainer: {
    marginRight: 12,
  },
  scanImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanInfo: {
    flex: 1,
  },
  scanCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  scanProduit: {
    fontSize: 12,
    color: Colors.roleColors.Producteur,
    marginBottom: 2,
  },
  scanDate: {
    fontSize: 11,
    color: '#666666',
  },
  scanActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statutBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statutText: {
    fontSize: 10,
    fontWeight: '600',
  },
  validateButton: {
    backgroundColor: Colors.roleColors.Producteur,
    borderRadius: 12,
    padding: 6,
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
