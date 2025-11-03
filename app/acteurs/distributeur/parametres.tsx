import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

const options = [
  { icon: 'support-agent', label: 'Contacter le support', action: () => Linking.openURL('tel:+221770000000') },
  { icon: 'help-outline', label: "Comment utiliser l'app", action: () => router.push('/guide-utilisation') },
  { icon: 'sync', label: 'Actualiser les données', action: () => {} },
  { icon: 'info', label: 
    "Informations sur l'app", action: () => {} },
];

export default function DistributeurParametresScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 90 }}
        data={options}
        keyExtractor={i => i.label}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={item.action}>
            <MaterialIcons name={item.icon as any} size={22} color={Colors.roleColors.Distributeur} />
            <Text style={styles.itemText}>{item.label}</Text>
            <MaterialIcons name="chevron-right" size={22} color={Colors.textLight} />
          </TouchableOpacity>
        )}
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
  header: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 10, backgroundColor: Colors.backgroundWhite },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  item: { backgroundColor: Colors.backgroundWhite, padding: 14, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemText: { flex: 1, marginLeft: 12, color: Colors.textPrimary },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: Colors.backgroundWhite, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', borderTopWidth: 1, borderTopColor: Colors.lightGray, paddingBottom: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, color: '#999', marginTop: 4 },
  navItemCenter: { marginTop: -25 },
  scanButton: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
});


