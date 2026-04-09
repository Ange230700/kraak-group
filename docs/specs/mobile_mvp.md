# MVP Mobile

## 1. Objectif metier principal

Le MVP mobile sert a maintenir les participants KRAAK connectes a leur parcours d'apprentissage, de facon simple et fiable.

Objectifs metiers prioritaires :

- permettre une authentification securisee
- donner un acces direct a leurs informations de formation
- centraliser les mises a jour et ressources
- garder un lien actif entre les participants et KRAAK

## 2. Audience mobile principale

Utilisateurs cibles du MVP (ordre de priorite) :

1. Participants inscrits
2. Prospects deja engages dans un parcours KRAAK
3. Equipe interne/admins uniquement pour les operations strictement necessaires au MVP

Hors perimetre MVP :

- application mobile de navigation grand public
- back-office admin avance sur mobile
- matrice de roles complexe sauf besoin impose par le pilote

## 3. Actions utilisateurs prioritaires (flux coeur)

Les participants doivent pouvoir :

1. Se connecter
2. Voir leurs programmes suivis
3. Consulter le planning et les informations de session
4. Acceder aux ressources de formation
5. Recevoir des annonces/mises a jour
6. Contacter le support, le formateur ou KRAAK

## 4. Criteres de succes (preparation pilote)

Le MVP mobile est reussi lorsque :

- l'authentification participant fonctionne de bout en bout
- chaque participant voit uniquement le contenu pertinent (scope role/contexte)
- l'application fonctionne d'abord sur Android (iOS optionnel sur la meme phase)
- les annonces/notifications de base sont disponibles
- la stabilite est suffisante pour un usage pilote reel

## 5. Limites de perimetre MVP

Dans le perimetre :

- acces au compte participant
- information de formation en lecture prioritaire et communication
- parcours de contact/support basique

Hors perimetre Phase 1 :

- paiements/abonnements avances
- moteur LMS complet de progression
- logique lourde de synchronisation offline-first
- tableaux de bord analytiques avances dans l'application

## 6. Porte de decision produit (fin de phase 1)

Passer a la phase suivante uniquement si toutes ces conditions sont vraies :

- objectif et audience valides par les parties prenantes
- criteres de succes mesurables et acceptes
- flux utilisateurs coeur figes pour la planification implementation
- trajectoire pilote Android-first confirmee

## 7. Phase 2 - Decoupage priorise des fonctionnalites (Indispensable/Souhaite/Plus tard)

Ce decoupage traduit le resultat de la phase 1 en perimetre MVP pret pour l'implementation.

### 7.1 Indispensable (critique pilote)

Ces fonctionnalites sont requises pour lancer un pilote Android reel.

1. Authentification et session

- Connexion email/mot de passe
- Persistance de session securisee
- Deconnexion
- Reinitialisation de mot de passe (flux basique)
- Mapping de resultat : le participant peut s'authentifier

2. Accueil scope participant

- Afficher uniquement le contenu pertinent apres connexion
- Carte(s) programme : titre du programme suivi, statut, prochaine etape cle
- Ecran de bienvenue/onboarding de base apres premiere connexion
- Mapping de resultat : le participant voit uniquement le contenu pertinent

3. Planning et sessions

- Liste des sessions a venir (date/heure, titre, lieu/lien)
- Page detail session (description + formateur + infos de participation)
- Mapping de resultat : consulter le planning/sessions

4. Ressources de formation (lecture/telechargement)

- Liste des ressources par programme/module
- Ouvrir le detail d'une ressource et acceder au lien/fichier
- Mapping de resultat : acceder aux ressources de formation

5. Annonces (base)

- Fil d'annonces in-app
- Marqueur non lu/lu (simple)
- Mapping de resultat : notifications/annonces de base disponibles

6. Contact et support

- Action de contact depuis l'application (email/WhatsApp/formulaire deeplink)
- Informations de contact support/formateur visibles
- Mapping de resultat : rester connecte a KRAAK

7. Preparation pilote Android

- Build Android signe et installable
- Baseline crash-free et controles de performance de base
- Mapping de resultat : application assez stable pour un pilote reel

### 7.2 Souhaite (forte valeur, non bloquant lancement)

Ces fonctionnalites ameliorent la qualite du pilote mais ne bloquent pas le deploiement jour 1.

1. Notifications push (annonces uniquement)

- Recevoir une notification push lorsqu'une nouvelle annonce est publiee
- Ouvrir l'application directement sur l'annonce concernee

2. Profil participant leger

- Voir/modifier les champs de profil de base (nom, telephone, contact prefere)

3. Marqueurs de progression des ressources

- Marquer une ressource comme vue/telechargee

4. Rappels de session

- Rappel local 24 h/1 h avant une session a venir

5. Feedback in-app basique

- Formulaire rapide "Besoin d'aide" ou "Signaler un probleme"

### 7.3 Plus tard (candidats post-pilote)

Ces elements sont utiles mais volontairement reportes apres le pilote MVP.

1. Packaging iOS et distribution TestFlight
2. Cache offline pour certaines ressources
3. Messagerie/chat in-app avec le formateur
4. Tableaux de bord avances par role
5. Vues analytiques riches pour les participants

## 8. Matrice de correspondance (fonctionnalite -> criteres de succes phase 1)

| Decoupage fonctionnalites                  | Auth ok | Contenu pertinent uniquement | Android first | Annonces disponibles | Stabilite pilote |
| ------------------------------------------ | ------- | ---------------------------- | ------------- | -------------------- | ---------------- |
| Indispensable - Authentification/session   | Oui     | Indirect                     | Oui           | Non                  | Oui              |
| Indispensable - Accueil scope participant  | Non     | Oui                          | Oui           | Non                  | Oui              |
| Indispensable - Planning/sessions          | Non     | Oui                          | Oui           | Non                  | Oui              |
| Indispensable - Ressources                 | Non     | Oui                          | Oui           | Non                  | Oui              |
| Indispensable - Fil d'annonces             | Non     | Oui                          | Oui           | Oui                  | Oui              |
| Indispensable - Contact/support            | Non     | Indirect                     | Oui           | Non                  | Oui              |
| Indispensable - Preparation pilote Android | Non     | Non                          | Oui           | Non                  | Oui              |
| Souhaite - Notifications push              | Non     | Indirect                     | Oui           | Oui                  | Indirect         |
| Souhaite - Profil participant              | Non     | Oui                          | Oui           | Non                  | Indirect         |
| Souhaite - Marqueurs de progression        | Non     | Oui                          | Oui           | Non                  | Indirect         |
| Souhaite - Rappels de session              | Non     | Non                          | Oui           | Indirect             | Indirect         |
| Souhaite - Feedback in-app                 | Non     | Indirect                     | Oui           | Non                  | Indirect         |

## 9. Recommandation de delivery (2 sprints)

Sprint 1 (fondations indispensables) :

- Authentification/session
- Onboarding/welcome de base
- Accueil scope participant
- Planning/sessions
- Contact/support

Sprint 2 (finalisation indispensable + souhaites selectifs) :

- Ressources
- Fil d'annonces
- Stabilisation pilote Android
- Optionnel : notifications push si la stabilite est confirmee

Go/No-Go vers pilote :

- Toutes les user stories indispensables sont acceptees
- Aucun blocker P1 ouvert
- Flux participant de bout en bout valide sur Android

## 10. Gel du perimetre MVP (avant design/codage)

Cette section gele le perimetre de la premiere release et precise ce qui est priorise maintenant versus plus tard.

### 10.1 Indispensable (release 1 verrouillee)

- Authentification participant
- Onboarding / welcome de base
- Liste des programmes/cours
- Calendrier ou planning de session
- Bibliotheque de ressources
- Annonces / notifications
- Contact/support
- Deconnexion / gestion de session

### 10.2 Souhaite (non bloquant release 1)

- Profil participant
- Preparation de base des notifications push
- Marqueurs de progression des ressources
- Rappels de session
- Feedback in-app basique

### 10.3 Plus tard (hors MVP)

- LMS complet
- Classes video en direct dans l'application
- Paiements in-app
- Packaging iOS et distribution TestFlight
- Cache offline pour certaines ressources
- Messagerie/chat in-app avec le formateur
- Synchronisation offline a grande echelle
- Communaute/forum/chat
- Moteur de notation des devoirs
- Tableaux de bord analytiques approfondis pour les utilisateurs
- Moteur avance de certificats
- Panneau admin multi-role dans l'application mobile
- Gamification complexe

### 10.4 Perimetre de la premiere release - gele

La release 1 est gelee sur les fonctionnalites **Indispensable** uniquement.

Envelope MVP (global) :

- **Dans MVP** = Indispensable + Souhaite
- **Hors MVP** = Plus tard

### 10.5 Matrice de classification complete (toutes les fonctionnalites demandees)

| Fonctionnalite                             | Classification |
| ------------------------------------------ | -------------- |
| Authentification participant               | Indispensable  |
| Onboarding / welcome de base               | Indispensable  |
| Accueil scope participant                  | Indispensable  |
| Profil participant                         | Souhaite       |
| Liste des programmes/cours                 | Indispensable  |
| Calendrier ou planning de session          | Indispensable  |
| Bibliotheque de ressources                 | Indispensable  |
| Annonces / notifications                   | Indispensable  |
| Contact/support                            | Indispensable  |
| Preparation pilote Android                 | Indispensable  |
| Preparation de base des notifications push | Souhaite       |
| Marqueurs de progression des ressources    | Souhaite       |
| Rappels de session                         | Souhaite       |
| Feedback in-app basique                    | Souhaite       |
| Deconnexion / gestion de session           | Indispensable  |
| LMS complet                                | Plus tard      |
| Classes video en direct dans l'application | Plus tard      |
| Paiements in-app                           | Plus tard      |
| Packaging iOS et distribution TestFlight   | Plus tard      |
| Cache offline pour certaines ressources    | Plus tard      |
| Messagerie/chat in-app avec le formateur   | Plus tard      |
| Synchronisation offline a grande echelle   | Plus tard      |
| Communaute/forum/chat                      | Plus tard      |
| Moteur de notation des devoirs             | Plus tard      |
| Tableaux de bord analytiques utilisateurs  | Plus tard      |
| Moteur avance de certificats               | Plus tard      |
| Panneau admin multi-role dans le mobile    | Plus tard      |
| Gamification complexe                      | Plus tard      |

Regles d'execution :

- Le design et l'engineering demarrent depuis les fonctionnalites Indispensable uniquement.
- Les elements Souhaite ne peuvent etre pris que si l'Indispensable est termine et que la stabilite pilote n'est pas a risque.
- Les elements Plus tard restent hors perimetre jusqu'a decision post-pilote.
