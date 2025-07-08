# Astro Form VT - Tourism Data Collection

Application web de collecte de données touristiques basée sur Astro avec formulaires multi-étapes et tableau de bord statistiques.

## 🚀 Fonctionnalités

- ✅ Formulaires multi-étapes dynamiques par ville
- ✅ Interface responsive avec TailwindCSS
- ✅ Sauvegarde des données dans AWS DynamoDB
- ✅ Tableau de bord statistiques avec graphiques
- ✅ Persistance des données côté client (LocalStorage)
- ✅ API serverless pour la gestion des données
- ✅ Déploiement sur Vercel

## 🏗️ Architecture

### Structure du projet

```text
├── api/
│   ├── getAllForms.js      # API pour récupérer toutes les soumissions
│   ├── saveAnswer.js       # API pour sauvegarder les réponses
│   └── statistics.js       # API pour les statistiques
├── src/
│   ├── components/         # Composants Astro réutilisables
│   ├── data/
│   │   ├── cities.json     # Liste des villes disponibles
│   │   └── departments.json # Liste des départements
│   ├── pages/
│   │   ├── [city]/        # Routes dynamiques par ville
│   │   │   ├── form1.astro # Étape 1 du formulaire
│   │   │   ├── form2.astro # Étape 2 du formulaire
│   │   │   └── form3.astro # Étape 3 du formulaire
│   │   ├── statistiques.astro # Tableau de bord
│   │   └── index.astro    # Page d'accueil
│   └── styles/
│       └── global.css     # Styles globaux
├── public/                # Assets statiques
└── data/
    └── answers.json       # Données de développement
```

### Flux de données

1. **Sélection de ville** → Génération dynamique des formulaires
2. **Collecte multi-étapes** → Sauvegarde temporaire dans localStorage
3. **Soumission finale** → Envoi vers DynamoDB via API
4. **Visualisation** → Agrégation et affichage des statistiques

## 🛠️ Technologies

- **Astro** - Framework de génération de sites statiques
- **TailwindCSS** - Framework CSS utilitaire
- **AlpineJS** - Framework JavaScript léger
- **AWS DynamoDB** - Base de données NoSQL
- **Chart.js** - Visualisation de données
- **Vercel** - Plateforme de déploiement

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Configuration

Créer un fichier `.env` avec les variables d'environnement :

```env
AWS_REGION=us-east-1
DYNAMODB_TABLE=Answers
```

### Développement

```bash
npm run dev
```

Le serveur de développement démarre sur `http://localhost:4321`

### Build

```bash
npm run build
```

### Aperçu

```bash
npm run preview
```

## 📊 Utilisation

### Formulaires

1. Accédez à `/{ville}/form1` pour commencer un formulaire
2. Complétez les 3 étapes du formulaire
3. Les données sont sauvegardées automatiquement à chaque étape

### Statistiques

Accédez à `/statistiques` pour visualiser :
- Répartition par ville
- Profils des visiteurs
- Tranches d'âge
- Types de demandes
- Départements de provenance

## 🔧 API Endpoints

- `GET /api/getAllForms` - Récupère toutes les soumissions
- `POST /api/saveAnswer` - Sauvegarde une réponse de formulaire
- `GET /api/statistics` - Récupère les statistiques générales

## 🏙️ Villes disponibles

Les villes sont définies dans `src/data/cities.json` :
- Annot
- Colmars-les-Alpes
- Entrevaux
- La Palud-sur-Verdon
- Saint-André-les-Alpes

## 📝 Déploiement

Le projet est configuré pour être déployé sur Vercel avec l'adaptateur `@astrojs/vercel`.

```bash
npm run build
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Pushez vers la branche
5. Ouvrez une Pull Request

## 📄 License

Ce projet est sous licence MIT.