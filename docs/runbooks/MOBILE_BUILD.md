# Guide de build mobile (Capacitor Android / iOS)

Ce runbook décrit comment générer les projets natifs Android et iOS, lancer un build debug local, ouvrir le projet dans l'IDE natif, et tester avec le live-reload.

---

## Prérequis

| Outil          | Version minimale     | Remarque                                              |
| -------------- | -------------------- | ----------------------------------------------------- |
| Node.js        | ≥ 24.14.1            | via `.nvmrc`                                          |
| pnpm           | ≥ 10.23.0            | via `packageManager` dans `package.json`              |
| JDK            | 21+                  | Temurin recommandé, nécessaire pour Gradle / Android  |
| Android Studio | Hedgehog (2023.1.1)+ | Installe le SDK Android et les émulateurs             |
| Xcode          | 16+                  | macOS uniquement, nécessaire pour les builds iOS      |
| CocoaPods      | 1.13+                | macOS uniquement, `sudo gem install cocoapods`        |

---

## Génération des projets natifs

Les dossiers `android/` et `ios/` ne sont pas générés automatiquement.
Il faut les créer une seule fois en local avec les commandes suivantes :

```bash
cd apps/client

# Générer le projet Android
npx cap add android

# Générer le projet iOS (macOS uniquement)
npx cap add ios
```

Ces dossiers doivent ensuite être commités dans le dépôt.
Les artefacts de build intermédiaires restent exclus via `apps/client/.gitignore`.

---

## Build debug local

### Android

```bash
# Depuis la racine du monorepo
pnpm build:debug:android
```

Sous-jacent : `pnpm build:mobile && cap sync android`

Pour assembler le debug APK via Gradle :

```bash
cd apps/client/android
./gradlew assembleDebug
```

APK généré dans `apps/client/android/app/build/outputs/apk/debug/app-debug.apk`.

### iOS (macOS uniquement)

```bash
# Depuis la racine du monorepo
pnpm build:debug:ios
```

Sous-jacent : `pnpm build:mobile && cap sync ios`

---

## Travailler avec un environnement précis

Les commandes `build:debug:*` s'appuient sur `pnpm build:mobile`, donc sur la configuration standard du workspace.

Si vous devez préparer explicitement un build mobile avec les variables `local` ou `staging`, utilisez d'abord :

```bash
pnpm build:mobile:local
# ou
pnpm build:mobile:staging
```

Puis synchronisez les assets vers le projet natif :

```bash
pnpm cap:sync
```

---

## Ouvrir dans l'IDE natif

### Android Studio

```bash
pnpm --filter @kraak/client cap:open:android
```

### Xcode (macOS uniquement)

```bash
pnpm --filter @kraak/client cap:open:ios
```

---

## Synchronisation du build web vers natif

Après chaque modification du code Angular, synchroniser les assets vers les projets natifs :

```bash
pnpm cap:sync
```

Pour copier uniquement sans mettre à jour les plugins :

```bash
pnpm --filter @kraak/client cap:copy
```

---

## Test avec live-reload (appareil physique ou émulateur)

1. Démarrer le serveur de développement mobile :

```bash
pnpm dev:mobile
```

2. Dans `apps/client/capacitor.config.ts`, décommenter et adapter le bloc `server.url` :

```typescript
server: {
  androidScheme: 'https',
  // Remplacer par l'adresse IP locale de votre machine :
  url: 'http://192.168.x.x:4300',
  cleartext: true,
},
```

3. Synchroniser la config puis ouvrir dans l'IDE :

```bash
pnpm cap:sync
pnpm --filter @kraak/client cap:open:android
# ou
pnpm --filter @kraak/client cap:open:ios
```

4. Lancer l'app depuis Android Studio ou Xcode sur un émulateur ou un appareil connecté.

Important : ne pas commiter le bloc `url` / `cleartext` dans le dépôt, il est réservé au développement local.

---

## CI - Debug APK automatique

Le job `android-debug` du pipeline CI (`.github/workflows/ci.yml`) :

- se déclenche après le job `build`
- installe Java 21 (Temurin)
- exécute `pnpm build:mobile` puis `cap add android` et `cap sync android`
- assemble le debug APK via `./gradlew assembleDebug`
- publie l'APK comme artefact GitHub Actions (`debug-apk`, rétention 14 jours)

Le debug APK est accessible dans l'onglet Actions du dépôt GitHub, dans le résumé de chaque run CI réussi.
