# Pack Templates Issues GitHub - Child Issues MVP KRAAK

Usage rapide :

1. Creer une nouvelle issue GitHub.
2. Copier-coller le bloc correspondant a l'ID.
3. Ajouter labels et milestone proposes.
4. Lier l'issue a son epic parent.

Convention :

- `type: task` pour tous les child issues (coherence bulk-create)
- `status: backlog` au demarrage
- dependances sous forme d'IDs backlog

---

## Architecture (`ARC`) - Milestone `M1 - Architecture locked`

### ARC-01

```md
Title: [TASK][ARC-01] Valider architecture cible web/mobile/api avec scope MVP

Labels:

- type: task
- area: architecture
- epic: ARC
- priority: P0
- status: backlog

Milestone:

- M1 - Architecture locked

Body:

## Parent epic

ARC

## Description

Valider l'architecture cible et les limites du scope MVP.

## Dependances

- none

## Criteres d'acceptation

- [ ] Architecture cible confirmee
- [ ] Scope MVP valide
- [ ] Risques majeurs identifies
```

### ARC-02

```md
Title: [TASK][ARC-02] Definir conventions repo (naming, structure, quality gates)

Labels:

- type: task
- area: architecture
- epic: ARC
- priority: P0
- status: backlog

Milestone:

- M1 - Architecture locked

Body:

## Parent epic

ARC

## Description

Definir conventions de structure, nomenclature et qualite.

## Dependances

- ARC-01

## Criteres d'acceptation

- [ ] Conventions documentees
- [ ] Structure cible validee
- [ ] Quality gates definis
```

### ARC-03

```md
Title: [TASK][ARC-03] Definir strategie de rendu web (SEO/prerender)

Labels:

- type: task
- area: architecture
- epic: ARC
- priority: P0
- status: backlog

Milestone:

- M1 - Architecture locked

Body:

## Parent epic

ARC

## Description

Fixer la strategie de rendu web adaptee au SEO MVP.

## Dependances

- ARC-01

## Criteres d'acceptation

- [ ] Strategie de rendu documentee
- [ ] Impacts SEO clarifies
- [ ] Impacts build/deploy clarifies
```

### ARC-04

```md
Title: [TASK][ARC-04] Definir modeles de donnees MVP

Labels:

- type: task
- area: architecture
- epic: ARC
- priority: P0
- status: backlog

Milestone:

- M1 - Architecture locked

Body:

## Parent epic

ARC

## Description

Definir les modeles participant, programme, ressource, annonce, support.

## Dependances

- ARC-01

## Criteres d'acceptation

- [ ] Modeles entites MVP definis
- [ ] Relations principales definies
- [ ] Hypotheses documentees
```

### ARC-05

```md
Title: [TASK][ARC-05] Documenter ADRs et criteres anti-scope-creep

Labels:

- type: task
- area: architecture
- epic: ARC
- priority: P1
- status: backlog

Milestone:

- M1 - Architecture locked

Body:

## Parent epic

ARC

## Description

Documenter les decisions d'architecture et regles de protection MVP.

## Dependances

- ARC-02
- ARC-04

## Criteres d'acceptation

- [ ] ADRs redigees
- [ ] Criteres anti-scope-creep explicites
- [ ] Validation equipe obtenue
```

---

## Workspace Setup (`SET`) - Milestone `M2 - Workspace bootstrapped`

### SET-01

```md
Title: [TASK][SET-01] Initialiser workspace Angular monorepo (apps/web, apps/mobile)

Labels:

- type: task
- area: workspace
- epic: SET
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

SET

## Description

Initialiser le monorepo Angular avec web et mobile.

## Dependances

- ARC-02

## Criteres d'acceptation

- [ ] apps/web cree
- [ ] apps/mobile cree
- [ ] build local passe
```

### SET-02

```md
Title: [TASK][SET-02] Initialiser apps/api NestJS et wiring de base

Labels:

- type: task
- area: workspace
- epic: SET
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

SET

## Description

Initialiser le backend NestJS et son wiring minimal.

## Dependances

- ARC-02

## Criteres d'acceptation

- [ ] apps/api cree
- [ ] route health disponible
- [ ] lancement local valide
```

### SET-03

```md
Title: [TASK][SET-03] Configurer quality gates (lint, format, typecheck)

Labels:

- type: task
- area: workspace
- epic: SET
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

SET

## Description

Configurer les controles qualite standard pour tout le workspace.

## Dependances

- SET-01
- SET-02

## Criteres d'acceptation

- [ ] lint operationnel
- [ ] format operationnel
- [ ] typecheck operationnel
```

### SET-04

```md
Title: [TASK][SET-04] Configurer test runners unitaires + integration

Labels:

- type: task
- area: workspace
- epic: SET
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

SET

## Description

Mettre en place les runners de tests unitaires et integration.

## Dependances

- SET-01
- SET-02

## Criteres d'acceptation

- [ ] tests unitaires executables
- [ ] tests integration executables
- [ ] scripts npm/pnpm documentes
```

### SET-05

```md
Title: [TASK][SET-05] Configurer Playwright E2E et smoke pipeline

Labels:

- type: task
- area: workspace
- epic: SET
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

SET

## Description

Mettre en place Playwright avec scenario smoke initial.

## Dependances

- SET-01
- SET-04

## Criteres d'acceptation

- [ ] Playwright configure
- [ ] scenario smoke actif
- [ ] execution CI possible
```

### SET-06

```md
Title: [TASK][SET-06] Configurer CI GitHub Actions multi-apps

Labels:

- type: task
- area: workspace
- epic: SET
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

SET

## Description

Mettre en place la CI pour web, mobile, api et libs.

## Dependances

- SET-03
- SET-04
- SET-05

## Criteres d'acceptation

- [ ] workflow CI en place
- [ ] checks bloquants actifs
- [ ] execution PR validee
```

### SET-07

```md
Title: [TASK][SET-07] Mettre en place variables d'environnement et runbook local dev

Labels:

- type: task
- area: workspace
- epic: SET
- priority: P1
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

SET

## Description

Documenter et standardiser les variables d'environnement locales.

## Dependances

- SET-02

## Criteres d'acceptation

- [ ] fichier exemple env cree
- [ ] runbook local mis a jour
- [ ] variables critiques listees
```

---

## Shared Libraries (`LIB`) - Milestone `M2 - Workspace bootstrapped`

### LIB-01

```md
Title: [TASK][LIB-01] Creer packages/contracts (DTO, schema validation, versioning)

Labels:

- type: task
- area: shared-libs
- epic: LIB
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

LIB

## Description

Creer les contrats types et schemas de validation partages.

## Dependances

- ARC-04
- SET-02

## Criteres d'acceptation

- [ ] contrats de base definis
- [ ] validation schema active
- [ ] versioning des contrats documente
```

### LIB-02

```md
Title: [TASK][LIB-02] Creer packages/domain (regles metier pures MVP)

Labels:

- type: task
- area: shared-libs
- epic: LIB
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

LIB

## Description

Centraliser les regles metier pures sans dependance framework.

## Dependances

- ARC-04
- LIB-01

## Criteres d'acceptation

- [ ] fonctions metier pures creees
- [ ] tests unitaires passes
- [ ] usage dans apps possible
```

### LIB-03

```md
Title: [TASK][LIB-03] Creer packages/api-client (typed client web/mobile vers API)

Labels:

- type: task
- area: shared-libs
- epic: LIB
- priority: P1
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

LIB

## Description

Creer un client API type pour web et mobile.

## Dependances

- LIB-01
- SET-02

## Criteres d'acceptation

- [ ] client API type disponible
- [ ] gestion erreurs standardisee
- [ ] exemple d'utilisation ajoute
```

### LIB-04

```md
Title: [TASK][LIB-04] Ajouter tests unitaires libs + guideline de publication interne

Labels:

- type: task
- area: shared-libs
- epic: LIB
- priority: P1
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Parent epic

LIB

## Description

Renforcer la fiabilite des libs et documenter leur publication interne.

## Dependances

- LIB-02
- LIB-03

## Criteres d'acceptation

- [ ] tests unitaires libs complets
- [ ] guide publication documente
- [ ] process de version clair
```

---

## Website (`WEB`) - Milestone `M5 - Core participant flows ready`

### WEB-01

```md
Title: [TASK][WEB-01] Implementer pages core (Accueil, A propos, Services, Programmes, Contact)

Labels:

- type: task
- area: website
- epic: WEB
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

WEB

## Description

Implementer les pages publiques coeur du site MVP.

## Dependances

- SET-01
- ARC-03

## Criteres d'acceptation

- [ ] 5 pages MVP disponibles
- [ ] responsive mobile-first
- [ ] contenu coherent avec ton KRAAK
```

### WEB-02

```md
Title: [TASK][WEB-02] Integrer formulaires de contact et CTA conversion

Labels:

- type: task
- area: website
- epic: WEB
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

WEB

## Description

Ajouter les formulaires et CTA pour la conversion utile.

## Dependances

- WEB-01
- SUP-01

## Criteres d'acceptation

- [ ] formulaire contact integre
- [ ] CTA clairs et fonctionnels
- [ ] validation utilisateur visible
```

### WEB-03

```md
Title: [TASK][WEB-03] Ajouter SEO technique (meta, sitemap, robots, Open Graph)

Labels:

- type: task
- area: website
- epic: WEB
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

WEB

## Description

Mettre en place les fondamentaux SEO techniques du site.

## Dependances

- WEB-01

## Criteres d'acceptation

- [ ] metadata par page
- [ ] sitemap et robots generes
- [ ] Open Graph configure
```

### WEB-04

```md
Title: [TASK][WEB-04] Ajouter analytics web (PostHog/GA)

Labels:

- type: task
- area: website
- epic: WEB
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

WEB

## Description

Instrumenter le site pour mesurer les parcours et conversions.

## Dependances

- WEB-01

## Criteres d'acceptation

- [ ] events critiques traces
- [ ] pages vues tracees
- [ ] verification data en env test
```

### WEB-05

```md
Title: [TASK][WEB-05] Optimiser accessibilite/performance (objectif Lighthouse > 90)

Labels:

- type: task
- area: website
- epic: WEB
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

WEB

## Description

Ameliorer accessibilite et performance des pages MVP.

## Dependances

- WEB-01
- WEB-03

## Criteres d'acceptation

- [ ] score perf cible atteint
- [ ] checks a11y de base valides
- [ ] regressions majeures corrigees
```

---

## Mobile Shell (`MOB`) - Milestone `M3 - Mobile shell ready`

### MOB-01

```md
Title: [TASK][MOB-01] Initialiser app Ionic Angular dans apps/mobile

Labels:

- type: task
- area: mobile-shell
- epic: MOB
- priority: P0
- status: backlog

Milestone:

- M3 - Mobile shell ready

Body:

## Parent epic

MOB

## Description

Initialiser l'application mobile Ionic Angular dans le workspace.

## Dependances

- SET-01

## Criteres d'acceptation

- [ ] app mobile generee
- [ ] run local operationnel
- [ ] structure de base validee
```

### MOB-02

```md
Title: [TASK][MOB-02] Mettre en place navigation shell (tabs/stack) et layout de base

Labels:

- type: task
- area: mobile-shell
- epic: MOB
- priority: P0
- status: backlog

Milestone:

- M3 - Mobile shell ready

Body:

## Parent epic

MOB

## Description

Implementer la navigation principale et le layout shell.

## Dependances

- MOB-01

## Criteres d'acceptation

- [ ] navigation tabs/stack fonctionnelle
- [ ] layout coherent mobile
- [ ] routes shell stables
```

### MOB-03

```md
Title: [TASK][MOB-03] Integrer theming, design tokens et composants UI de base

Labels:

- type: task
- area: mobile-shell
- epic: MOB
- priority: P1
- status: backlog

Milestone:

- M3 - Mobile shell ready

Body:

## Parent epic

MOB

## Description

Appliquer le theming et les composants UI minimaux de l'app.

## Dependances

- MOB-01
- LIB-01

## Criteres d'acceptation

- [ ] tokens appliques
- [ ] composants UI de base disponibles
- [ ] coherence visuelle assuree
```

### MOB-04

```md
Title: [TASK][MOB-04] Configurer Capacitor (Android/iOS) et builds debug

Labels:

- type: task
- area: mobile-shell
- epic: MOB
- priority: P0
- status: backlog

Milestone:

- M3 - Mobile shell ready

Body:

## Parent epic

MOB

## Description

Configurer Capacitor pour Android/iOS et valider les builds debug.

## Dependances

- MOB-01

## Criteres d'acceptation

- [ ] config Capacitor validee
- [ ] build Android debug OK
- [ ] build iOS debug OK
```

### MOB-05

```md
Title: [TASK][MOB-05] Ajouter service notifications push stub (FCM wiring initial)

Labels:

- type: task
- area: mobile-shell
- epic: MOB
- priority: P1
- status: backlog

Milestone:

- M3 - Mobile shell ready

Body:

## Parent epic

MOB

## Description

Ajouter la base technique pour notifications push (stub).

## Dependances

- MOB-04
- SET-02

## Criteres d'acceptation

- [ ] service push stub disponible
- [ ] token device recupere (mock/stub)
- [ ] workflow documente
```

---

## Auth (`AUT`) - Milestone `M4 - Auth ready`

### AUT-01

```md
Title: [TASK][AUT-01] Configurer Supabase Auth (providers, policies de base)

Labels:

- type: task
- area: auth
- epic: AUT
- priority: P0
- status: backlog

Milestone:

- M4 - Auth ready

Body:

## Parent epic

AUT

## Description

Configurer l'authentification Supabase et policies minimales.

## Dependances

- ARC-04
- SET-02

## Criteres d'acceptation

- [ ] provider(s) auth configures
- [ ] policies de base appliquees
- [ ] tests auth initiaux valides
```

### AUT-02

```md
Title: [TASK][AUT-02] Implementer endpoints API auth/session (NestJS)

Labels:

- type: task
- area: auth
- epic: AUT
- priority: P0
- status: backlog

Milestone:

- M4 - Auth ready

Body:

## Parent epic

AUT

## Description

Implementer les endpoints auth/session cote API.

## Dependances

- AUT-01
- LIB-01

## Criteres d'acceptation

- [ ] endpoints auth exposes
- [ ] gestion session stable
- [ ] erreurs auth normalisees
```

### AUT-03

```md
Title: [TASK][AUT-03] Implementer ecrans login/signup/reset mobile

Labels:

- type: task
- area: auth
- epic: AUT
- priority: P0
- status: backlog

Milestone:

- M4 - Auth ready

Body:

## Parent epic

AUT

## Description

Construire les ecrans d'authentification mobile.

## Dependances

- MOB-02
- AUT-02

## Criteres d'acceptation

- [ ] login mobile fonctionnel
- [ ] signup mobile fonctionnel
- [ ] reset mot de passe fonctionnel
```

### AUT-04

```md
Title: [TASK][AUT-04] Implementer garde routes protegees web/mobile

Labels:

- type: task
- area: auth
- epic: AUT
- priority: P0
- status: backlog

Milestone:

- M4 - Auth ready

Body:

## Parent epic

AUT

## Description

Ajouter les gardes d'acces pour routes privees web/mobile.

## Dependances

- AUT-02
- LIB-03

## Criteres d'acceptation

- [ ] routes privees bloquees sans session
- [ ] redirection utilisateur correcte
- [ ] etat auth synchro web/mobile
```

### AUT-05

```md
Title: [TASK][AUT-05] Ajouter gestion role participant/admin minimal

Labels:

- type: task
- area: auth
- epic: AUT
- priority: P1
- status: backlog

Milestone:

- M4 - Auth ready

Body:

## Parent epic

AUT

## Description

Implementer la gestion minimale des roles et autorisations.

## Dependances

- AUT-02
- ARC-04

## Criteres d'acceptation

- [ ] roles minimaux definis
- [ ] verification autorisation active
- [ ] cas limites documentes
```

---

## Dashboard (`DSH`) - Milestone `M5 - Core participant flows ready`

### DSH-01

```md
Title: [TASK][DSH-01] Definir contenu dashboard MVP (cartes, rappels, dernieres actus)

Labels:

- type: task
- area: dashboard
- epic: DSH
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

DSH

## Description

Definir la composition fonctionnelle du dashboard participant.

## Dependances

- ARC-04

## Criteres d'acceptation

- [ ] sections dashboard listees
- [ ] priorites contenu valides
- [ ] version MVP approuvee
```

### DSH-02

```md
Title: [TASK][DSH-02] Exposer endpoint dashboard aggregate cote API

Labels:

- type: task
- area: dashboard
- epic: DSH
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

DSH

## Description

Exposer un endpoint agregateur pour alimenter le dashboard.

## Dependances

- SET-02
- LIB-01
- AUT-02

## Criteres d'acceptation

- [ ] endpoint aggregate disponible
- [ ] contrat stable documente
- [ ] performance acceptable en MVP
```

### DSH-03

```md
Title: [TASK][DSH-03] Implementer vue dashboard mobile

Labels:

- type: task
- area: dashboard
- epic: DSH
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

DSH

## Description

Implementer l'ecran dashboard dans l'application mobile.

## Dependances

- MOB-02
- AUT-04
- DSH-02

## Criteres d'acceptation

- [ ] dashboard mobile rendu
- [ ] donnees endpoint affichees
- [ ] etats loading/error geres
```

### DSH-04

```md
Title: [TASK][DSH-04] Implementer vue dashboard web participant (si activee MVP)

Labels:

- type: task
- area: dashboard
- epic: DSH
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

DSH

## Description

Ajouter une variante web participant du dashboard si confirmee.

## Dependances

- WEB-01
- AUT-04
- DSH-02

## Criteres d'acceptation

- [ ] decision scope web confirmee
- [ ] vue web implementee si retenue
- [ ] parite fonctionnelle minimale assuree
```

---

## Programs (`PRG`) - Milestone `M5 - Core participant flows ready`

### PRG-01

```md
Title: [TASK][PRG-01] Definir modele programme/cohorte/statut progression MVP

Labels:

- type: task
- area: programs
- epic: PRG
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

PRG

## Description

Definir le modele de donnees programme/cohorte/progression.

## Dependances

- ARC-04

## Criteres d'acceptation

- [ ] modele metier valide
- [ ] etats progression definis
- [ ] contraintes principales documentees
```

### PRG-02

```md
Title: [TASK][PRG-02] Implementer endpoints liste/detail programmes

Labels:

- type: task
- area: programs
- epic: PRG
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

PRG

## Description

Implementer les endpoints API de consultation programmes.

## Dependances

- SET-02
- LIB-01
- AUT-02
- PRG-01

## Criteres d'acceptation

- [ ] endpoint liste disponible
- [ ] endpoint detail disponible
- [ ] filtrage minimal supporte
```

### PRG-03

```md
Title: [TASK][PRG-03] Implementer ecran mobile liste + detail programme

Labels:

- type: task
- area: programs
- epic: PRG
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

PRG

## Description

Implementer les ecrans mobiles liste et detail programme.

## Dependances

- MOB-02
- PRG-02

## Criteres d'acceptation

- [ ] liste programmes visible
- [ ] detail programme accessible
- [ ] navigation liste->detail stable
```

### PRG-04

```md
Title: [TASK][PRG-04] Implementer marquage de progression minimale

Labels:

- type: task
- area: programs
- epic: PRG
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

PRG

## Description

Permettre un suivi minimal de progression programme.

## Dependances

- PRG-02
- LIB-02

## Criteres d'acceptation

- [ ] marquage progression enregistre
- [ ] restitution etat progression
- [ ] regles metier appliquees
```

### PRG-05

```md
Title: [TASK][PRG-05] Ajouter scenarii de test Given/When/Then programmes

Labels:

- type: task
- area: programs
- epic: PRG
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

PRG

## Description

Ajouter la couverture comportementale BDD des parcours programmes.

## Dependances

- PRG-03
- PRG-04
- QAT-01

## Criteres d'acceptation

- [ ] scenarios Given/When/Then rediges
- [ ] execution E2E possible
- [ ] assertions comportement explicites
```

---

## Resources (`RES`) - Milestone `M5 - Core participant flows ready`

### RES-01

```md
Title: [TASK][RES-01] Definir taxonomie ressources (type, theme, audience)

Labels:

- type: task
- area: resources
- epic: RES
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

RES

## Description

Definir la taxonomie fonctionnelle des ressources.

## Dependances

- ARC-04

## Criteres d'acceptation

- [ ] types de ressources definis
- [ ] themes definis
- [ ] cibles audience definies
```

### RES-02

```md
Title: [TASK][RES-02] Implementer endpoints ressources (liste, filtre, detail)

Labels:

- type: task
- area: resources
- epic: RES
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

RES

## Description

Implementer les endpoints API pour ressources et filtres.

## Dependances

- SET-02
- LIB-01
- AUT-02
- RES-01

## Criteres d'acceptation

- [ ] endpoint liste operationnel
- [ ] endpoint detail operationnel
- [ ] filtres MVP disponibles
```

### RES-03

```md
Title: [TASK][RES-03] Implementer ecran mobile ressources (recherche/filtre)

Labels:

- type: task
- area: resources
- epic: RES
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

RES

## Description

Implementer l'ecran mobile de consultation des ressources.

## Dependances

- MOB-02
- RES-02

## Criteres d'acceptation

- [ ] recherche fonctionnelle
- [ ] filtres fonctionnels
- [ ] detail ressource accessible
```

### RES-04

```md
Title: [TASK][RES-04] Implementer tracking consultation ressources

Labels:

- type: task
- area: resources
- epic: RES
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

RES

## Description

Tracer les consultations de ressources pour suivi produit.

## Dependances

- RES-02
- WEB-04

## Criteres d'acceptation

- [ ] events consultation traces
- [ ] metadonnees minimales capturees
- [ ] verification des traces en test
```

---

## Announcements (`ANN`) - Milestone `M5 - Core participant flows ready`

### ANN-01

```md
Title: [TASK][ANN-01] Definir format annonce et regles de publication MVP

Labels:

- type: task
- area: announcements
- epic: ANN
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

ANN

## Description

Definir la structure annonce et ses regles de publication.

## Dependances

- ARC-04

## Criteres d'acceptation

- [ ] format annonce valide
- [ ] regles publication MVP definies
- [ ] priorite annonce documentee
```

### ANN-02

```md
Title: [TASK][ANN-02] Implementer endpoints annonces (feed + detail)

Labels:

- type: task
- area: announcements
- epic: ANN
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

ANN

## Description

Implementer les endpoints API de feed et detail annonces.

## Dependances

- SET-02
- LIB-01
- AUT-02
- ANN-01

## Criteres d'acceptation

- [ ] endpoint feed disponible
- [ ] endpoint detail disponible
- [ ] tri/ordre MVP valide
```

### ANN-03

```md
Title: [TASK][ANN-03] Implementer flux annonces dans mobile dashboard/feed

Labels:

- type: task
- area: announcements
- epic: ANN
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

ANN

## Description

Afficher les annonces dans l'application mobile.

## Dependances

- MOB-02
- DSH-02
- ANN-02

## Criteres d'acceptation

- [ ] feed annonce visible
- [ ] detail annonce accessible
- [ ] integration dashboard validee
```

### ANN-04

```md
Title: [TASK][ANN-04] Ajouter notification push pour annonce prioritaire

Labels:

- type: task
- area: announcements
- epic: ANN
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

ANN

## Description

Declencher une notification push pour annonces prioritaires.

## Dependances

- MOB-05
- ANN-02

## Criteres d'acceptation

- [ ] regle priorite push definie
- [ ] push annonce prioritaire testable
- [ ] fallback en cas d'echec documente
```

---

## Support (`SUP`) - Milestone `M5 - Core participant flows ready`

### SUP-01

```md
Title: [TASK][SUP-01] Implementer endpoint contact/support (API + validation)

Labels:

- type: task
- area: support
- epic: SUP
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

SUP

## Description

Exposer un endpoint contact/support avec validation robuste.

## Dependances

- SET-02
- LIB-01

## Criteres d'acceptation

- [ ] endpoint support disponible
- [ ] validation payload active
- [ ] erreurs utilisateur explicites
```

### SUP-02

```md
Title: [TASK][SUP-02] Integrer formulaire support dans mobile

Labels:

- type: task
- area: support
- epic: SUP
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

SUP

## Description

Ajouter le formulaire support dans l'application mobile.

## Dependances

- MOB-02
- SUP-01
- AUT-04

## Criteres d'acceptation

- [ ] formulaire mobile envoye
- [ ] messages validation affiches
- [ ] confirmation envoi visible
```

### SUP-03

```md
Title: [TASK][SUP-03] Integrer formulaire contact site web

Labels:

- type: task
- area: support
- epic: SUP
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

SUP

## Description

Ajouter le formulaire de contact sur le site web.

## Dependances

- WEB-01
- SUP-01

## Criteres d'acceptation

- [ ] formulaire web envoie les demandes
- [ ] validations front/back coherentes
- [ ] confirmation utilisateur claire
```

### SUP-04

```md
Title: [TASK][SUP-04] Configurer envoi email transactionnel (Resend ou equivalent)

Labels:

- type: task
- area: support
- epic: SUP
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

SUP

## Description

Configurer l'envoi email pour confirmations/support.

## Dependances

- SUP-01

## Criteres d'acceptation

- [ ] provider email configure
- [ ] email de confirmation envoye
- [ ] erreurs d'envoi gerees
```

### SUP-05

```md
Title: [TASK][SUP-05] Ajouter suivi et statut basique des demandes support

Labels:

- type: task
- area: support
- epic: SUP
- priority: P1
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Parent epic

SUP

## Description

Mettre en place un suivi minimal des demandes support.

## Dependances

- SUP-01
- AUT-05

## Criteres d'acceptation

- [ ] statut demande stocke
- [ ] transitions minimales definies
- [ ] consultation statut possible
```

---

## QA (`QAT`) - Milestone `M6 - QA ready`

### QAT-01

```md
Title: [TASK][QAT-01] Definir matrice de couverture (page, composant, comportement)

Labels:

- type: task
- area: qa
- epic: QAT
- priority: P0
- status: backlog

Milestone:

- M6 - QA ready

Body:

## Parent epic

QAT

## Description

Definir la matrice de couverture tests MVP.

## Dependances

- SET-04
- SET-05

## Criteres d'acceptation

- [ ] matrice page/composant/comportement creee
- [ ] couverture minimale cible definie
- [ ] scenarios critiques identifies
```

### QAT-02

```md
Title: [TASK][QAT-02] Ecrire tests unitaires composants critiques web/mobile

Labels:

- type: task
- area: qa
- epic: QAT
- priority: P0
- status: backlog

Milestone:

- M6 - QA ready

Body:

## Parent epic

QAT

## Description

Ajouter les tests unitaires des composants critiques.

## Dependances

- QAT-01
- WEB-01
- MOB-02

## Criteres d'acceptation

- [ ] composants critiques couverts
- [ ] assertions explicites
- [ ] tests stables en CI
```

### QAT-03

```md
Title: [TASK][QAT-03] Ecrire tests integration API modules critiques

Labels:

- type: task
- area: qa
- epic: QAT
- priority: P0
- status: backlog

Milestone:

- M6 - QA ready

Body:

## Parent epic

QAT

## Description

Ecrire les tests integration pour modules API critiques.

## Dependances

- QAT-01
- AUT-02
- PRG-02
- RES-02
- ANN-02
- SUP-01

## Criteres d'acceptation

- [ ] endpoints critiques couverts
- [ ] cas erreur couverts
- [ ] resultats reproductibles
```

### QAT-04

```md
Title: [TASK][QAT-04] Ecrire E2E Given/When/Then pour parcours coeur participant

Labels:

- type: task
- area: qa
- epic: QAT
- priority: P0
- status: backlog

Milestone:

- M6 - QA ready

Body:

## Parent epic

QAT

## Description

Ajouter les scenarios E2E comportementaux des parcours coeur.

## Dependances

- QAT-01
- AUT-03
- DSH-03
- PRG-03
- RES-03
- SUP-02

## Criteres d'acceptation

- [ ] scenarios Given/When/Then implementes
- [ ] parcours critiques executes
- [ ] preuves d'execution disponibles
```

### QAT-05

```md
Title: [TASK][QAT-05] Realiser campagne regression et corriger blockers

Labels:

- type: task
- area: qa
- epic: QAT
- priority: P0
- status: backlog

Milestone:

- M6 - QA ready

Body:

## Parent epic

QAT

## Description

Executer regression complete et corriger les bloqueurs.

## Dependances

- QAT-02
- QAT-03
- QAT-04

## Criteres d'acceptation

- [ ] campagne regression terminee
- [ ] blockers P0 resolus
- [ ] rapport de stabilisation publie
```

### QAT-06

```md
Title: [TASK][QAT-06] Realiser checks accessibilite/performance pre-pilot

Labels:

- type: task
- area: qa
- epic: QAT
- priority: P1
- status: backlog

Milestone:

- M6 - QA ready

Body:

## Parent epic

QAT

## Description

Valider a11y/performance avant passage au pilote.

## Dependances

- QAT-05
- WEB-05

## Criteres d'acceptation

- [ ] checks a11y executes
- [ ] checks performance executes
- [ ] plan d'actions ecarts fourni
```

---

## Deployment (`DEP`) - Milestone `M7 - Pilot release ready`

### DEP-01

```md
Title: [TASK][DEP-01] Configurer environnements (dev/staging/pilot)

Labels:

- type: task
- area: deployment
- epic: DEP
- priority: P0
- status: backlog

Milestone:

- M7 - Pilot release ready

Body:

## Parent epic

DEP

## Description

Configurer et documenter les environnements de deploiement.

## Dependances

- SET-07

## Criteres d'acceptation

- [ ] env dev/staging/pilot definis
- [ ] secrets et variables recenses
- [ ] acces et roles clarifies
```

### DEP-02

```md
Title: [TASK][DEP-02] Mettre en place pipeline deploiement web

Labels:

- type: task
- area: deployment
- epic: DEP
- priority: P0
- status: backlog

Milestone:

- M7 - Pilot release ready

Body:

## Parent epic

DEP

## Description

Automatiser le deploiement web vers l'environnement cible.

## Dependances

- SET-06
- WEB-05

## Criteres d'acceptation

- [ ] pipeline web operationnel
- [ ] deploiement staging valide
- [ ] rollback web documente
```

### DEP-03

```md
Title: [TASK][DEP-03] Mettre en place pipeline deploiement API

Labels:

- type: task
- area: deployment
- epic: DEP
- priority: P0
- status: backlog

Milestone:

- M7 - Pilot release ready

Body:

## Parent epic

DEP

## Description

Automatiser le deploiement API vers l'environnement cible.

## Dependances

- SET-06
- QAT-03

## Criteres d'acceptation

- [ ] pipeline API operationnel
- [ ] deploiement staging valide
- [ ] checks post-deploy disponibles
```

### DEP-04

```md
Title: [TASK][DEP-04] Preparer distribution mobile test (APK/TestFlight interne)

Labels:

- type: task
- area: deployment
- epic: DEP
- priority: P0
- status: backlog

Milestone:

- M7 - Pilot release ready

Body:

## Parent epic

DEP

## Description

Preparer les builds mobiles de test pour le pilote.

## Dependances

- MOB-04
- QAT-04

## Criteres d'acceptation

- [ ] build APK test disponible
- [ ] build iOS test disponible
- [ ] procedure distribution test documentee
```

### DEP-05

```md
Title: [TASK][DEP-05] Finaliser observabilite et alerting minimum

Labels:

- type: task
- area: deployment
- epic: DEP
- priority: P1
- status: backlog

Milestone:

- M7 - Pilot release ready

Body:

## Parent epic

DEP

## Description

Mettre en place la supervision minimale avant pilote.

## Dependances

- DEP-02
- DEP-03

## Criteres d'acceptation

- [ ] logs et metriques accessibles
- [ ] alertes minimales configurees
- [ ] procedure verification en place
```

### DEP-06

```md
Title: [TASK][DEP-06] Rediger runbook incident + rollback + pilot checklist

Labels:

- type: task
- area: deployment
- epic: DEP
- priority: P0
- status: backlog

Milestone:

- M7 - Pilot release ready

Body:

## Parent epic

DEP

## Description

Documenter incidents, rollback et checklist go/no-go pilote.

## Dependances

- DEP-01
- DEP-05
- QAT-06

## Criteres d'acceptation

- [ ] runbook incident redige
- [ ] procedure rollback redigee
- [ ] checklist pilote prete
```

### DEP-07

```md
Title: [TASK][DEP-07] Executer go/no-go pilote et publier release pilote

Labels:

- type: task
- area: deployment
- epic: DEP
- priority: P0
- status: backlog

Milestone:

- M7 - Pilot release ready

Body:

## Parent epic

DEP

## Description

Executer le go/no-go final et publier la release pilote.

## Dependances

- DEP-02
- DEP-03
- DEP-04
- DEP-06

## Criteres d'acceptation

- [ ] go/no-go documente
- [ ] release pilote publiee
- [ ] retour post-release capture
```
