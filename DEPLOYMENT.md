# 🚀 Instructions de Déploiement Vercel

## ✅ Modifications appliquées

Les endpoints API ont été restaurés pour utiliser les vraies données DynamoDB :
- `api/statistics.js` - Récupère le nombre total de formulaires
- `api/getAllForms.js` - Récupère tous les formulaires 
- `api/saveAnswer.js` - Sauvegarde les réponses

## 📋 Étapes de déploiement

### 1. **Prérequis**
```bash
# Installer Vercel CLI si pas déjà fait
npm install -g vercel
```

### 2. **Configuration des variables d'environnement**

Sur votre dashboard Vercel (https://vercel.com/dashboard), allez dans votre projet et configurez :

**Variables d'environnement obligatoires :**
```
AWS_REGION=us-east-1
DYNAMODB_TABLE=VotreNomDeTable
```

**Variables d'authentification AWS (une des options) :**

**Option A - Clés AWS (simple):**
```
AWS_ACCESS_KEY_ID=VOTRE_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=VOTRE_SECRET_KEY
```

**Option B - IAM Role (recommandé):**
Configurez un IAM role avec les permissions DynamoDB nécessaires.

### 3. **Déploiement**

```bash
# Dans le répertoire du projet
vercel

# Suivre les instructions :
# - Link to existing project? [y/N] -> Y si projet existe, N sinon
# - What's your project's name? -> astro-form-vt
# - In which directory is your code located? -> ./
```

### 4. **Configuration automatique**

Vercel détectera automatiquement :
- ✅ Framework Astro
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ API endpoints dans `/api`

### 5. **Vérification du déploiement**

Une fois déployé, testez les endpoints :

```bash
# Remplacez YOUR_DOMAIN par votre domaine Vercel
curl https://YOUR_DOMAIN.vercel.app/api/statistics
curl https://YOUR_DOMAIN.vercel.app/api/getAllForms
```

### 6. **Permissions DynamoDB requises**

Assurez-vous que votre utilisateur/role AWS a ces permissions :

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:Scan",
                "dynamodb:PutItem",
                "dynamodb:GetItem"
            ],
            "Resource": "arn:aws:dynamodb:REGION:ACCOUNT:table/TABLE_NAME"
        }
    ]
}
```

## 🔧 Configuration avancée

### Variables d'environnement par environnement

```bash
# Pour la production
vercel env add AWS_REGION production
vercel env add DYNAMODB_TABLE production
vercel env add AWS_ACCESS_KEY_ID production
vercel env add AWS_SECRET_ACCESS_KEY production

# Pour le preview
vercel env add AWS_REGION preview
vercel env add DYNAMODB_TABLE preview
```

### Commandes utiles

```bash
# Voir les logs
vercel logs

# Redéployer
vercel --prod

# Voir les variables d'environnement
vercel env ls

# Supprimer le cache
vercel --prod --force
```

## 🚨 Troubleshooting

**Erreur "Module not found":**
```bash
# Vérifier les dépendances
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

**Erreur de permissions AWS:**
- Vérifiez les variables d'environnement
- Testez les permissions DynamoDB
- Vérifiez la région AWS

**Timeout des API:**
- DynamoDB peut être lent avec beaucoup de données
- Considérez l'ajout de pagination

## 📊 Monitoring

Après déploiement :
1. Vérifiez les logs Vercel
2. Testez tous les endpoints
3. Vérifiez les métriques DynamoDB
4. Testez le formulaire complet

## 🔄 Mise à jour

Pour les futures mises à jour :
```bash
git add .
git commit -m "Update statistiques"
git push
# Vercel redéploiera automatiquement
```