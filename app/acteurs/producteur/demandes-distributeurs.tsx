import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { DemandeAchat, demandeAchatService } from '../../../services/demandeAchatService';

export default function ProducteurDemandesDistributeursScreen() {
  const [demandes, setDemandes] = useState<DemandeAchat[]>([]);
  const producteurNom = 'Ferme Diallo';
  const producteurTel = '+221 77 123 45 67';

  const load = async () => {
    const res = await demandeAchatService.getDemandesPubliques();
    setDemandes(res);
  };

  useEffect(() => { load(); }, []);

  const handleProposer = async (id: string) => {
    await demandeAchatService.proposerParProducteur(id, producteurNom, producteurTel);
    Alert.alert('Proposition envoyée', 'Le distributeur sera notifié de votre proposition.');
    await load();
  };

  const renderItem = ({ item }: { item: DemandeAchat }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialIcons name="sell" size={20} color={Colors.roleColors.Producteur} />
        <Text style={styles.title}>{item.produit}</Text>
        <View style={[styles.badge, { backgroundColor: Colors.primaryLight }]}>
          <Text style={styles.badgeText}>{item.statut}</Text>
        </View>
      </View>
      <View style={styles.rowInfo}>
        <MaterialIcons name="inventory" size={18} color={Colors.textSecondary} />
        <Text style={styles.info}>{item.quantite}</Text>
      </View>
      <View style={styles.rowInfo}>
        <MaterialIcons name="store" size={18} color={Colors.textSecondary} />
        <Text style={styles.info}>{item.distributeur}</Text>
      </View>
      {item.description ? (
        <View style={styles.rowInfo}>
          <MaterialIcons name="description" size={18} color={Colors.textSecondary} />
          <Text style={styles.info}>{item.description}</Text>
        </View>
      ) : null}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => Linking.openURL(`tel:${item.telephoneDistributeur}`)}>
          <MaterialIcons name="phone" size={18} color={Colors.roleColors.Producteur} />
          <Text style={styles.secondaryBtnText}>Appeler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => handleProposer(item.id)}>
          <MaterialIcons name="handshake" size={18} color="#FFF" />
          <Text style={styles.primaryBtnText}>Proposer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Demandes des distributeurs</Text>
      </View>
      <FlatList contentContainerStyle={{ padding: 16, paddingBottom: 100 }} data={demandes} keyExtractor={i => i.id} renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Aucune demande publique disponible.</Text>}
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color="#999" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/produits')}>
          <MaterialIcons name="eco" size={24} color="#999" />
          <Text style={styles.navText}>Produits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemCenter]} onPress={() => router.push('/acteurs/producteur/scanner')}>
          <View style={[styles.scanButton, { backgroundColor: Colors.roleColors.Producteur }]}>
            <MaterialIcons name="qr-code-scanner" size={24} color="#FFF" />
          </View>
          <Text style={styles.navText}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/transporteurs')}>
          <MaterialIcons name="local-shipping" size={24} color="#999" />
          <Text style={styles.navText}>Transports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/producteur/parametres')}>
          <MaterialIcons name="settings" size={24} color="#999" />
          <Text style={styles.navText}>Paramètres</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 10, backgroundColor: Colors.backgroundWhite },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  card: { backgroundColor: Colors.backgroundWhite, borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginLeft: 8, flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 12, color: Colors.textPrimary },
  rowInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  info: { marginLeft: 8, color: Colors.textSecondary },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center' },
  secondaryBtnText: { color: Colors.roleColors.Producteur, fontWeight: 'bold', marginLeft: 8 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.roleColors.Producteur, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  primaryBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: Colors.backgroundWhite, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderTopWidth: 1, borderTopColor: Colors.lightGray, paddingBottom: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, color: '#999', marginTop: 4 },
  navItemCenter: { marginTop: -25 },
  scanButton: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  empty: { color: Colors.textSecondary, textAlign: 'center', marginTop: 24 },
});


