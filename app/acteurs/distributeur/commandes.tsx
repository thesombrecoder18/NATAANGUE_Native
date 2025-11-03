import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { demandeAchatService, DemandeAchat } from '../../../services/demandeAchatService';

export default function DistributeurCommandesScreen() {
  const [demandes, setDemandes] = useState<DemandeAchat[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newDemande, setNewDemande] = useState({
    produit: '',
    quantite: '',
    description: '',
    prixMax: '',
    dateSouhaitee: '',
  });

  const load = async () => {
    const result = await demandeAchatService.getDemandesDistributeur('Boutique Ndiaye');
    setDemandes(result);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!newDemande.produit || !newDemande.quantite) {
      Alert.alert('Attention', 'Indiquez au minimum le produit et la quantité');
      return;
    }
    await demandeAchatService.creerDemandeAchat({
      produit: newDemande.produit,
      quantite: newDemande.quantite,
      description: newDemande.description,
      prixMax: newDemande.prixMax,
      dateSouhaitee: newDemande.dateSouhaitee,
      distributeur: 'Boutique Ndiaye',
      telephoneDistributeur: '+221 77 000 00 00',
    });
    setShowAdd(false);
    setNewDemande({ produit: '', quantite: '', description: '', prixMax: '', dateSouhaitee: '' });
    await load();
    Alert.alert('Publié', 'Votre demande est maintenant visible par les producteurs');
  };

  const handleCancel = async (id: string) => {
    Alert.alert('Annuler', 'Voulez-vous annuler cette demande ?', [
      { text: 'Non' },
      { text: 'Oui', style: 'destructive', onPress: async () => { await demandeAchatService.annulerDemande(id); await load(); } }
    ]);
  };

  const renderItem = ({ item }: { item: DemandeAchat }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <MaterialIcons name="sell" size={20} color={Colors.roleColors.Distributeur} />
        <Text style={styles.title}>{item.produit}</Text>
        <View style={[styles.badge, { backgroundColor: Colors.primaryLight }]}>
          <Text style={styles.badgeText}>{item.statut}</Text>
        </View>
      </View>
      <View style={styles.rowInfo}>
        <MaterialIcons name="inventory" size={18} color={Colors.textSecondary} />
        <Text style={styles.info}>{item.quantite}</Text>
      </View>
      {item.description ? (
        <View style={styles.rowInfo}>
          <MaterialIcons name="description" size={18} color={Colors.textSecondary} />
          <Text style={styles.info}>{item.description}</Text>
        </View>
      ) : null}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleCancel(item.id)}>
          <MaterialIcons name="cancel" size={18} color="#D32F2F" />
          <Text style={[styles.actionText, { color: '#D32F2F' }]}>Annuler</Text>
        </TouchableOpacity>
        {item.producteurChoisi ? (
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/acteurs/distributeur/receptions')}>
            <MaterialIcons name="local-shipping" size={18} color={Colors.roleColors.Distributeur} />
            <Text style={[styles.actionText, { color: Colors.roleColors.Distributeur }]}>Suivre Réception</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes demandes d'achat</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
          <MaterialIcons name="add" size={22} color="#FFF" />
          <Text style={styles.addText}>Nouvelle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        data={demandes}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Aucune demande. Ajoutez-en avec le bouton ci-dessus.</Text>}
      />

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/distributeur/dashboard')}>
          <MaterialIcons name="dashboard" size={24} color="#999" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/acteurs/distributeur/commandes')}>
          <MaterialIcons name="sell" size={24} color={Colors.roleColors.Distributeur} />
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

      <Modal visible={showAdd} transparent animationType="slide" onRequestClose={() => setShowAdd(false)}>
        <View style={styles.modalWrap}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Nouvelle demande</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Produit</Text>
              <TextInput style={styles.input} placeholder="Ex: Tomates" value={newDemande.produit} onChangeText={t => setNewDemande({ ...newDemande, produit: t })} />
              <Text style={styles.label}>Quantité</Text>
              <TextInput style={styles.input} placeholder="Ex: 100 kg" value={newDemande.quantite} onChangeText={t => setNewDemande({ ...newDemande, quantite: t })} />
              <Text style={styles.label}>Budget max (optionnel)</Text>
              <TextInput style={styles.input} placeholder="Ex: 100000 FCFA" value={newDemande.prixMax} onChangeText={t => setNewDemande({ ...newDemande, prixMax: t })} />
              <Text style={styles.label}>Date souhaitée (optionnel)</Text>
              <TextInput style={styles.input} placeholder="Ex: 25/02/2025" value={newDemande.dateSouhaitee} onChangeText={t => setNewDemande({ ...newDemande, dateSouhaitee: t })} />
              <Text style={styles.label}>Détails (optionnel)</Text>
              <TextInput style={[styles.input, styles.textArea]} placeholder="Ex: Produits bio, propres" value={newDemande.description} onChangeText={t => setNewDemande({ ...newDemande, description: t })} multiline />
              <TouchableOpacity style={styles.primaryBtn} onPress={handleAdd}>
                <MaterialIcons name="check" size={20} color="#FFF" />
                <Text style={styles.primaryBtnText}>Publier</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAdd(false)}>
                <Text style={styles.cancelText}>Fermer</Text>
              </TouchableOpacity>
            </ScrollView>
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
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.roleColors.Distributeur, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  addText: { color: '#FFF', fontWeight: 'bold', marginLeft: 6 },
  card: { backgroundColor: Colors.backgroundWhite, borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', color: Colors.textPrimary, marginLeft: 8, flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 12, color: Colors.textPrimary },
  rowInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  info: { marginLeft: 8, color: Colors.textSecondary },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  actionText: { marginLeft: 6, fontWeight: '600' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: Colors.backgroundWhite, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderTopWidth: 1, borderTopColor: Colors.lightGray, paddingBottom: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, color: '#999', marginTop: 4 },
  navItemCenter: { marginTop: -25 },
  scanButton: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  modalWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#FFF', borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '85%', padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 12 },
  label: { fontSize: 12, color: Colors.textSecondary, marginTop: 10 },
  input: { backgroundColor: Colors.background, borderRadius: 8, padding: 12, color: Colors.textPrimary, marginTop: 6 },
  textArea: { height: 90, textAlignVertical: 'top' },
  primaryBtn: { marginTop: 16, backgroundColor: Colors.roleColors.Distributeur, padding: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  cancelBtn: { marginTop: 8, alignItems: 'center' },
  cancelText: { color: Colors.textSecondary },
  empty: { color: Colors.textSecondary, textAlign: 'center', marginTop: 24 },
});


