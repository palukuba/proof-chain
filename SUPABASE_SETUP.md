# Configuration Supabase pour ProofChain

Ce guide vous aide à configurer Supabase pour votre projet ProofChain.

## Prérequis

- Un compte Supabase (créez-en un gratuitement sur [supabase.com](https://supabase.com))
- Node.js et npm installés

## Étape 1: Créer un projet Supabase

1. Connectez-vous à [app.supabase.com](https://app.supabase.com)
2. Cliquez sur **"New Project"**
3. Remplissez les informations:
   - **Name**: ProofChain (ou votre nom préféré)
   - **Database Password**: Choisissez un mot de passe fort
   - **Region**: Choisissez la région la plus proche de vos utilisateurs
4. Cliquez sur **"Create new project"**
5. Attendez quelques minutes que le projet soit créé

## Étape 2: Obtenir vos identifiants

1. Dans votre projet Supabase, allez dans **Settings** (⚙️) > **API**
2. Vous trouverez:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: Une longue clé commençant par `eyJ...`

## Étape 3: Configurer les variables d'environnement

1. Copiez le fichier `.env.example` vers `.env`:
   ```bash
   cp .env.example .env
   ```

2. Éditez le fichier `.env` et remplacez les valeurs:
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

⚠️ **Important**: Ne commitez JAMAIS le fichier `.env` dans git. Il est déjà dans `.gitignore`.

## Étape 4: Exécuter le schéma SQL

1. Dans votre projet Supabase, allez dans **SQL Editor** (icône 📝)
2. Cliquez sur **"New query"**
3. Copiez tout le contenu du fichier `supabase/schema.sql`
4. Collez-le dans l'éditeur SQL
5. Cliquez sur **"Run"** (▶️)

Vous devriez voir un message de succès. Les tables suivantes sont créées:
- `students` - Informations sur les étudiants
- `documents` - Documents académiques
- `school_profile` - Profil de l'institution
- `app_settings` - Paramètres de l'application
- `user_roles` - Rôles des utilisateurs

## Étape 5: Insérer les données initiales (optionnel)

Pour avoir des données de test:

1. Dans le **SQL Editor**, créez une nouvelle requête
2. Copiez le contenu du fichier `supabase/seed.sql`
3. Collez et exécutez

Cela créera:
- 3 étudiants de test
- Quelques documents de démonstration
- Les paramètres par défaut de l'application

## Étape 6: Créer votre premier utilisateur admin

Par défaut, les nouveaux utilisateurs ont le rôle **viewer**. Pour avoir un admin:

1. Inscrivez-vous dans l'application ProofChain
2. Dans Supabase, allez dans **Table Editor** > **user_roles**
3. Trouvez votre utilisateur et changez le rôle de `viewer` à `admin`

Ou exécutez cette requête SQL (remplacez `your-email@example.com`):

```sql
UPDATE user_roles 
SET role = 'admin' 
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'your-email@example.com'
);
```

## Étape 7: Tester l'application

1. Installez les dépendances:
   ```bash
   npm install
   ```

2. Lancez l'application:
   ```bash
   npm run dev
   ```

3. Ouvrez votre navigateur et testez:
   - Connexion/Inscription
   - Ajout d'étudiants
   - Création de documents
   - Modification du profil de l'école

## Sécurité: Row Level Security (RLS)

Le schéma SQL inclut des politiques RLS automatiques:

- **Viewers** (lecteurs): Peuvent seulement lire les données
- **Editors** (éditeurs): Peuvent lire, créer et modifier
- **Admins** (administrateurs): Ont tous les droits, y compris suppression

Ces politiques protègent automatiquement vos données.

## Prochaines étapes

### Implémenter le minting

Actuellement, la fonction de minting est désactivée. Pour l'activer, vous devez:

1. Créer un backend API (par exemple avec Node.js, Python, etc.)
2. Implémenter:
   - Upload vers IPFS
   - Création de transaction Cardano
   - Minting de NFT
3. Mettre à jour `services/documentService.ts` avec l'URL de votre API

Consultez les commentaires TODO dans `documentService.ts` pour plus de détails.

## Dépannage

### Erreur: "Missing Supabase configuration"

→ Vérifiez que votre fichier `.env` existe et contient les bonnes valeurs.

### Erreur: "User not found" ou problèmes de connexion

→ Vérifiez que le schéma SQL a été exécuté correctement.

### Les politiques RLS bloquent mes requêtes

→ Assurez-vous qu'un rôle est assigné à votre utilisateur dans la table `user_roles`.

## Support

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentation RLS](https://supabase.com/docs/guides/auth/row-level-security)
