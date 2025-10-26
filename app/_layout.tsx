import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useColorScheme } from '../hooks/use-color-scheme';
import { initializeMockData } from '../services/mockData';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();

  // Initialiser les données simulées au démarrage (une seule fois)
  useEffect(() => {
    const initData = async () => {
      try {
        await initializeMockData();
      } catch (error) {
        console.log('Données déjà initialisées');
      }
    };
    initData();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            // Toujours accessible - c'est le point de démarrage
          }} 
        />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        {/* Routes Producteur */}
        <Stack.Screen name="acteurs/producteur/dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/producteur/produits" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/producteur/cultures" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/producteur/scanner" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/producteur/parametres" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/producteur/profil" options={{ headerShown: false }} />
        
        {/* Routes Transporteur */}
        <Stack.Screen name="acteurs/transporteur/dashboard" options={{ headerShown: false }} />
        
        {/* Routes Distributeur */}
        <Stack.Screen name="acteurs/distributeur/dashboard" options={{ headerShown: false }} />
        
        {/* Routes Consommateur */}
        <Stack.Screen name="acteurs/consommateur/dashboard" options={{ headerShown: false }} />
        
        {/* Routes Administrateur */}
        <Stack.Screen name="acteurs/administrateur/dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/administrateur/profile" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/administrateur/transactions" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/administrateur/users" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/administrateur/settings" options={{ headerShown: false }} />
        <Stack.Screen name="acteurs/administrateur/transaction-details" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}
