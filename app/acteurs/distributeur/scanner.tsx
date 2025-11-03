import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

type ScanItem = {
  id: string;
  code: string;
  produit: string;
  provenance: string;
  statut: 'Reçu' | 'En attente';
  details: {
    type: string;
    variete: string;
    dateRecolte: string;
    producteur: string;
  };
};

const initial: ScanItem[] = [
  { id: 's1', code: '001', produit: 'Tomates bio', provenance: 'Ferme Diallo', statut: 'En attente', details: { type: 'Légume', variete: 'Tomate cerise', dateRecolte: '20/02/2025', producteur: 'Ferme Diallo' } },
];

export default function DistributeurScannerScreen() {
  const [items, setItems] = useState<ScanItem[]>(initial);
  const [selected, setSelected] = useState<ScanItem | null>(null);

  const handleScan = () => {
    Alert.alert('Scan simulé', 'Un produit a été scanné (code 00X)');
  };

  const handleToggle = (id: string) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, statut: i.statut === 'Reçu' ? 'En attente' : 'Reçu' } : i)));
  };

  const renderItem = ({ item }: { item: ScanItem }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialIcons name="qr-code" size={20} color={Colors.roleColors.Distributeur} />
        <Text style={styles.title}>{item.produit}</Text>
        <View style={[styles.badge, { backgroundColor: item.statut === 'Reçu' ? Colors.primaryLight : Colors.background }]}>
          <Text style={styles.badgeText}>{item.statut}</Text>
        </View>
      </View>
      <View style={styles.rowInfo}>
        <MaterialIcons name="place" size={18} color={Colors.textSecondary} />
        <Text style={styles.info}>{item.provenance}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => setSelected(item)}>
          <MaterialIcons name="info" size={18} color={Colors.roleColors.Distributeur} />
          <Text style={styles.secondaryBtnText}>Détails</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => handleToggle(item.id)}>
          <MaterialIcons name="check" size={18} color="#FFF" />
          <Text style={styles.primaryBtnText}>{item.statut === 'Reçu' ? 'Marquer en attente' : 'Confirmer reçu'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scanner</Text>
        <TouchableOpacity style={styles.scanNow} onPress={handleScan}>
          <MaterialIcons name="qr-code-scanner" size={20} color="#FFF" />
          <Text style={styles.scanNowText}>Scanner maintenant</Text>
        </TouchableOpacity>
      </View>
      <FlatList contentContainerStyle={{ padding: 16, paddingBottom: 110 }} data={items} keyExtractor={i => i.id} renderItem={renderItem} />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/distributeur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color="#999" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/distributeur/commandes')}>
          <MaterialIcons name="sell" size={24} color="#999" />
          <Text style={styles.navText}>Commandes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemCenter]} onPress={() => router.push('/acteurs/distributeur/scanner')}>
          <View style={[styles.scanButton, { backgroundColor: Colors.roleColors.Distributeur }]}>
            <MaterialIcons name="qr-code-scanner" size={24} color="#FFF" />
          </View>
          <Text style={styles.navText}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/distributeur/receptions')}>
          <MaterialIcons name="inventory" size={24} color="#999" />
          <Text style={styles.navText}>Réceptions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/distributeur/parametres')}>
          <MaterialIcons name="settings" size={24} color="#999" />
          <Text style={styles.navText}>Paramètres</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={!!selected} animationType="fade" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalWrap}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Détails du produit</Text>
            {selected && (
              <View>
                <Text style={styles.detail}>Type: {selected.details.type}</Text>
                <Text style={styles.detail}>Variété: {selected.details.variete}</Text>
                <Text style={styles.detail}>Récolte: {selected.details.dateRecolte}</Text>
                <Text style={styles.detail}>Producteur: {selected.details.producteur}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 10, backgroundColor: Colors.backgroundWhite, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  scanNow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.roleColors.Distributeur, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  scanNowText: { color: '#FFF', fontWeight: 'bold', marginLeft: 6 },
  card: { backgroundColor: Colors.backgroundWhite, borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginLeft: 8, flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 12, color: Colors.textPrimary },
  rowInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  info: { marginLeft: 8, color: Colors.textSecondary },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center' },
  secondaryBtnText: { color: Colors.roleColors.Distributeur, fontWeight: 'bold', marginLeft: 8 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.roleColors.Distributeur, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  primaryBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: Colors.backgroundWhite, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderTopWidth: 1, borderTopColor: Colors.lightGray, paddingBottom: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, color: '#999', marginTop: 4 },
  navItemCenter: { marginTop: -25 },
  scanButton: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  modalWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modal: { backgroundColor: '#FFF', borderRadius: 12, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 12 },
  detail: { fontSize: 14, color: Colors.textSecondary, marginBottom: 6 },
  closeBtn: { marginTop: 12, alignItems: 'center' },
  closeText: { color: Colors.textSecondary },
});


