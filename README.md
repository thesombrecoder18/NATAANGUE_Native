# 🌾 NAATANGUE - Application de Traçabilité Agricole

## 📋 Description

**NAATANGUE** est une application mobile native développée avec React Native et Expo pour la traçabilité agricole. Elle permet aux acteurs de la chaîne alimentaire (Producteurs, Transporteurs, Distributeurs, Consommateurs) de suivre et tracer les produits agricoles.

## 🛠️ Technologies

- **React Native** + **Expo** + **TypeScript**
- **Expo Router** pour la navigation
- **Stockage local** avec AsyncStorage
- **Material Icons** pour les icônes

## 🚀 Installation et Lancement

### 📋 Prérequis
- **Node.js** (version 18+)
- **Expo CLI** : `npm install -g @expo/cli`
- **Android Studio** (pour Android)
- **Xcode** (pour iOS - macOS uniquement)

### 🔧 Installation
```bash
# 1. Cloner le projet
git clone <repository-url>
cd NATAANGUE_Native

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm start
```

### 📱 Lancement par Plateforme

**Android :**
```bash
npm run android
```

**iOS :**
```bash
npm run ios
```

**Web :**
```bash
npm run web
```

### 🐛 Résolution des Problèmes

**Port 8081 occupé :**
```bash
npx kill-port 8081
# Ou utiliser un autre port
expo start --port 8082
```

**Erreur "Cannot find module" :**
```bash
rm -rf node_modules
npm install
```

**Nettoyer le cache :**
```bash
expo r -c
npm cache clean --force
```

## 📁 Structure du Projet

```
NATAANGUE_Native/
├── app/                    # Pages de l'application
│   ├── (tabs)/            # Navigation par onglets
│   │   ├── index.tsx      # Page d'accueil
│   │   └── dashboard.tsx  # Dashboard personnalisé
│   ├── login.tsx          # Page de connexion
│   ├── register.tsx       # Page d'inscription
│   └── forgot-password.tsx # Réinitialisation mot de passe
├── components/            # Composants réutilisables
├── contexts/              # Contextes React (Auth)
├── services/              # Services (stockage local)
├── constants/             # Constantes (couleurs, thème)
├── hooks/                 # Hooks personnalisés
├── package.json          # Dépendances et scripts
├── app.json              # Configuration Expo
├── tsconfig.json         # Configuration TypeScript
└── metro.config.js       # Configuration Metro
```

## 📱 Fonctionnalités

### 👥 **Rôles Disponibles**
- 🌱 **Producteur** : Gère les cultures et lots
- 🚛 **Transporteur** : Suit les transports
- 🏪 **Distributeur** : Gère l'inventaire
- 👤 **Consommateur** : Scanne les QR codes

### 🔐 **Authentification**
- **Inscription** avec sélection de rôle
- **Connexion** par nom d'utilisateur/téléphone
- **Réinitialisation** de mot de passe par email
- **Stockage local** des données utilisateurs

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- **Issues GitHub** : [Créer une issue](https://github.com/username/NATAANGUE_Native/issues)
- **Email** : support@naatangue.com
- **Documentation** : [Wiki du projet](https://github.com/username/NATAANGUE_Native/wiki)

## 🌟 Fonctionnalités Futures

- [ ] **Scanner QR Code** intégré
- [ ] **Notifications push** pour les mises à jour
- [ ] **Géolocalisation** des produits
- [ ] **Intégration blockchain** pour la traçabilité
- [ ] **API backend** pour la synchronisation
- [ ] **Mode hors ligne** complet
- [ ] **Analytics** et rapports détaillés

---

**🌾 NAATANGUE - Traçabilité Agricole Souveraine**  
*Du champ à l'assiette, une traçabilité transparente*