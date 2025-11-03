import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

export default function DistributeurProfilScreen() {
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState({
    nom: 'Boutique Ndiaye',
    telephone: '+221 77 000 00 00',
    adresse: 'Dakar, Sacré-Cœur',
    responsable: 'M. Ndiaye',
  });

  const handleSave = () => {
    setEdit(false);
    Alert.alert('Enregistré', 'Vos informations ont été mises à jour');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => (edit ? handleSave() : setEdit(true))}>
          <MaterialIcons name={edit ? 'check' : 'edit'} size={20} color="#FFF" />
          <Text style={styles.editText}>{edit ? 'Enregistrer' : 'Modifier'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 90 }}>
        <View style={styles.card}>
          <Text style={styles.label}>Nom</Text>
          <TextInput style={styles.input} editable={edit} value={info.nom} onChangeText={t => setInfo({ ...info, nom: t })} />
          <Text style={styles.label}>Téléphone</Text>
          <TextInput style={styles.input} editable={edit} value={info.telephone} onChangeText={t => setInfo({ ...info, telephone: t })} />
          <Text style={styles.label}>Adresse</Text>
          <TextInput style={styles.input} editable={edit} value={info.adresse} onChangeText={t => setInfo({ ...info, adresse: t })} />
          <Text style={styles.label}>Responsable</Text>
          <TextInput style={styles.input} editable={edit} value={info.responsable} onChangeText={t => setInfo({ ...info, responsable: t })} />
        </View>
      </ScrollView>

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
          <MaterialIcons name="settings" size={24} color={Colors.roleColors.Distributeur} />
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
  editBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.roleColors.Distributeur, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  editText: { color: '#FFF', fontWeight: 'bold', marginLeft: 6 },
  card: { backgroundColor: Colors.backgroundWhite, borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  label: { fontSize: 12, color: Colors.textSecondary, marginTop: 10 },
  input: { backgroundColor: Colors.background, borderRadius: 8, padding: 12, color: Colors.textPrimary, marginTop: 6 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: Colors.backgroundWhite, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderTopWidth: 1, borderTopColor: Colors.lightGray, paddingBottom: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, color: '#999', marginTop: 4 },
  navItemCenter: { marginTop: -25 },
  scanButton: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
});


