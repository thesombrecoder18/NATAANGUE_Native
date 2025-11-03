import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

type Reception = {
  id: string;
  produit: string;
  quantite: string;
  transporteur: string;
  statut: 'En route' | 'Arrivé' | 'Confirmé';
  code: string;
};

const initial: Reception[] = [
  { id: 'r1', produit: 'Tomates bio', quantite: '50 kg', transporteur: 'Moussa Diop', statut: 'En route', code: '001' },
  { id: 'r2', produit: 'Oignons', quantite: '100 kg', transporteur: 'Awa Ndiaye', statut: 'Arrivé', code: '002' },
];

export default function DistributeurReceptionsScreen() {
  const [items, setItems] = useState<Reception[]>(initial);

  useEffect(() => {}, []);

  const setStatut = (id: string, statut: Reception['statut']) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, statut } : i)));
  };

  const renderItem = ({ item }: { item: Reception }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialIcons name="inventory" size={20} color={Colors.roleColors.Distributeur} />
        <Text style={styles.title}>{item.produit}</Text>
        <View style={[styles.badge, { backgroundColor: Colors.primaryLight }]}>
          <Text style={styles.badgeText}>{item.statut}</Text>
        </View>
      </View>
      <View style={styles.rowInfo}>
        <MaterialIcons name="scale" size={18} color={Colors.textSecondary} />
        <Text style={styles.info}>{item.quantite}</Text>
      </View>
      <View style={styles.rowInfo}>
        <MaterialIcons name="local-shipping" size={18} color={Colors.textSecondary} />
        <Text style={styles.info}>Chauffeur: {item.transporteur}</Text>
      </View>
      <View style={styles.actions}>
        {item.statut !== 'Confirmé' && (
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStatut(item.id, 'Confirmé')}>
            <MaterialIcons name="check" size={18} color="#FFF" />
            <Text style={styles.primaryBtnText}>Confirmer réception</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/acteurs/distributeur/scanner')}>
          <MaterialIcons name="qr-code-scanner" size={18} color={Colors.roleColors.Distributeur} />
          <Text style={styles.secondaryBtnText}>Scanner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Réceptions</Text>
      </View>
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        data={items}
        keyExtractor={i => i.id}
        renderItem={renderItem}
      />
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
          <MaterialIcons name="inventory" size={24} color={Colors.roleColors.Distributeur} />
          <Text style={styles.navText}>Réceptions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/distributeur/parametres')}>
          <MaterialIcons name="settings" size={24} color="#999" />
          <Text style={styles.navText}>Paramètres</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 10, backgroundColor: Colors.backgroundWhite, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  card: { backgroundColor: Colors.backgroundWhite, borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginLeft: 8, flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 12, color: Colors.textPrimary },
  rowInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  info: { marginLeft: 8, color: Colors.textSecondary },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.roleColors.Distributeur, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  primaryBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center' },
  secondaryBtnText: { color: Colors.roleColors.Distributeur, fontWeight: 'bold', marginLeft: 8 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: Colors.backgroundWhite, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderTopWidth: 1, borderTopColor: Colors.lightGray, paddingBottom: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, color: '#999', marginTop: 4 },
  navItemCenter: { marginTop: -25 },
  scanButton: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
});


