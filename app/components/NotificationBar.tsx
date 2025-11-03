import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppNotification, notificationService } from '../../services/notificationService';

export default function NotificationBar() {
  const [notif, setNotif] = useState<AppNotification | null>(null);

  useEffect(() => {
    const unsub = notificationService.subscribe(n => {
      setNotif(n);
      setTimeout(() => setNotif(null), 4000);
    });
    return unsub;
  }, []);

  if (!notif) return null;

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{notif.title}</Text>
      <Text style={styles.msg}>{notif.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', top: 40, left: 16, right: 16, backgroundColor: Colors.primary, padding: 12, borderRadius: 10, elevation: 3 },
  title: { color: '#FFF', fontWeight: 'bold' },
  msg: { color: '#FFF', marginTop: 2 },
});


