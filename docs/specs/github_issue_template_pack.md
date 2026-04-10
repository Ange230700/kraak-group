# Pack Templates Issues GitHub - Epics MVP KRAAK

Usage rapide :

1. Creer une nouvelle issue GitHub.
2. Copier-coller un bloc complet ci-dessous.
3. Ajuster l'owner, les dates et les criteres si necessaire.
4. Ajouter labels et milestone indiques dans le bloc.

---

## Bloc 1 - Epic Architecture

```md
Title: [EPIC][ARC] Architecture MVP verrouillee

Labels:

- type: epic
- area: architecture
- priority: P0
- status: backlog

Milestone:

- M1 - Architecture locked

Body:

## Contexte

Verrouiller les choix d'architecture web/mobile/api et les conventions de base
pour eviter le scope creep et accelerer l'execution MVP.

## Objectif

Clore toutes les issues ARC-\* pour atteindre le milestone M1.

## Sous-taches (issues enfants)

- [ ] ARC-01 - Valider architecture cible web/mobile/api avec scope MVP (P0) - deps: none
- [ ] ARC-02 - Definir conventions repo (naming, structure, quality gates) (P0) - deps: ARC-01
- [ ] ARC-03 - Definir strategie de rendu web (SEO/prerender) (P0) - deps: ARC-01
- [ ] ARC-04 - Definir modeles de donnees MVP (P0) - deps: ARC-01
- [ ] ARC-05 - Documenter ADRs et criteres anti-scope-creep (P1) - deps: ARC-02, ARC-04

## Dependances amont

- none

## Criteres d'acceptation

- [ ] Toutes les sous-taches ARC-\* sont en done
- [ ] Les decisions sont documentees et partagees
- [ ] Le scope MVP est explicite et stable

## Definition of done de l'epic

Milestone M1 atteint.
```

---

## Bloc 2 - Epic Workspace setup

```md
Title: [EPIC][SET] Workspace bootstrapped et quality gates actifs

Labels:

- type: epic
- area: workspace
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Contexte

Mettre en place un workspace buildable, testable et automatisable pour web,
mobile et api.

## Objectif

Clore toutes les issues SET-\* pour atteindre le milestone M2.

## Sous-taches (issues enfants)

- [ ] SET-01 - Initialiser workspace Angular monorepo (apps/client/projects/web, apps/client/projects/mobile) (P0) - deps: ARC-02
- [ ] SET-02 - Initialiser apps/api NestJS et wiring de base (P0) - deps: ARC-02
- [ ] SET-03 - Configurer quality gates (lint, format, typecheck) (P0) - deps: SET-01, SET-02
- [ ] SET-04 - Configurer test runners unitaires + integration (P0) - deps: SET-01, SET-02
- [ ] SET-05 - Configurer Playwright E2E et smoke pipeline (P0) - deps: SET-01, SET-04
- [ ] SET-06 - Configurer CI GitHub Actions multi-apps (P0) - deps: SET-03, SET-04, SET-05
- [ ] SET-07 - Mettre en place variables d'environnement et runbook local dev (P1) - deps: SET-02

## Dependances amont

- ARC

## Criteres d'acceptation

- [ ] Build, lint, tests executables localement
- [ ] Pipeline CI verte
- [ ] Setup documente

## Definition of done de l'epic

Milestone M2 atteint.
```

---

## Bloc 3 - Epic Shared libraries

```md
Title: [EPIC][LIB] Shared libraries contracts/domain/api-client

Labels:

- type: epic
- area: shared-libs
- priority: P0
- status: backlog

Milestone:

- M2 - Workspace bootstrapped

Body:

## Contexte

Structurer la reutilisation transverse avec des libs minimales et explicites.

## Objectif

Fournir des contrats, regles metier pures et client API type.

## Sous-taches (issues enfants)

- [ ] LIB-01 - Creer packages/contracts (DTO, schema validation, versioning) (P0) - deps: ARC-04, SET-02
- [ ] LIB-02 - Creer packages/domain (regles metier pures MVP) (P0) - deps: ARC-04, LIB-01
- [ ] LIB-03 - Creer packages/api-client (typed client web/mobile vers API) (P1) - deps: LIB-01, SET-02
- [ ] LIB-04 - Ajouter tests unitaires libs + guideline de publication interne (P1) - deps: LIB-02, LIB-03

## Dependances amont

- ARC
- SET

## Criteres d'acceptation

- [ ] Contrats centralises et versionnables
- [ ] Domaine sans dependance framework
- [ ] Client API type consomme dans apps

## Definition of done de l'epic

LIB-01 et LIB-02 requis pour M2; LIB-03 et LIB-04 planifies/clos selon capacite.
```

---

## Bloc 4 - Epic Website

```md
Title: [EPIC][WEB] Website MVP conversion-ready

Labels:

- type: epic
- area: website
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Contexte

Livrer un site vitrine credible, performant et oriente conversion.

## Objectif

Clore les chantiers pages, formulaires, SEO et optimisation web.

## Sous-taches (issues enfants)

- [ ] WEB-01 - Implementer pages core (Accueil, A propos, Services, Programmes, Contact) (P0) - deps: SET-01, ARC-03
- [ ] WEB-02 - Integrer formulaires de contact et CTA conversion (P0) - deps: WEB-01, SUP-01
- [ ] WEB-03 - Ajouter SEO technique (meta, sitemap, robots, Open Graph) (P0) - deps: WEB-01
- [ ] WEB-04 - Ajouter analytics web (PostHog/GA) (P1) - deps: WEB-01
- [ ] WEB-05 - Optimiser accessibilite/performance (objectif Lighthouse > 90) (P1) - deps: WEB-01, WEB-03

## Dependances amont

- SET
- SUP (pour integration formulaire API)

## Criteres d'acceptation

- [ ] Pages MVP disponibles et coherentes
- [ ] Parcours contact fonctionnel
- [ ] SEO technique et analytics en place

## Definition of done de l'epic

Contributions WEB requises pour M5 et M6 valides.
```

---

## Bloc 5 - Epic Mobile shell

```md
Title: [EPIC][MOB] Mobile shell Ionic/Capacitor pret

Labels:

- type: epic
- area: mobile-shell
- priority: P0
- status: backlog

Milestone:

- M3 - Mobile shell ready

Body:

## Contexte

Mettre en place une ossature mobile solide pour brancher les modules metier.

## Objectif

Clore toutes les issues MOB-\* pour atteindre M3.

## Sous-taches (issues enfants)

- [ ] MOB-01 - Initialiser app Ionic Angular dans apps/client/projects/mobile (P0) - deps: SET-01
- [ ] MOB-02 - Mettre en place navigation shell (tabs/stack) et layout de base (P0) - deps: MOB-01
- [ ] MOB-03 - Integrer theming, design tokens et composants UI de base (P1) - deps: MOB-01, LIB-01
- [ ] MOB-04 - Configurer Capacitor (Android/iOS) et builds debug (P0) - deps: MOB-01
- [ ] MOB-05 - Ajouter service notifications push stub (FCM wiring initial) (P1) - deps: MOB-04, SET-02

## Dependances amont

- SET
- LIB

## Criteres d'acceptation

- [ ] Shell navigable sur mobile
- [ ] Build debug Android/iOS execute
- [ ] Base notifications initialisee

## Definition of done de l'epic

Milestone M3 atteint.
```

---

## Bloc 6 - Epic Auth

```md
Title: [EPIC][AUT] Auth web/mobile/api stable

Labels:

- type: epic
- area: auth
- priority: P0
- status: backlog

Milestone:

- M4 - Auth ready

Body:

## Contexte

Mettre en place une authentification securisee pour les parcours participants.

## Objectif

Clore toutes les issues AUT-\* pour atteindre M4.

## Sous-taches (issues enfants)

- [ ] AUT-01 - Configurer Supabase Auth (providers, policies de base) (P0) - deps: ARC-04, SET-02
- [ ] AUT-02 - Implementer endpoints API auth/session (NestJS) (P0) - deps: AUT-01, LIB-01
- [ ] AUT-03 - Implementer ecrans login/signup/reset mobile (P0) - deps: MOB-02, AUT-02
- [ ] AUT-04 - Implementer garde routes protegees web/mobile (P0) - deps: AUT-02, LIB-03
- [ ] AUT-05 - Ajouter gestion role participant/admin minimal (P1) - deps: AUT-02, ARC-04

## Dependances amont

- SET
- LIB
- MOB

## Criteres d'acceptation

- [ ] Login/signup/reset operationnels
- [ ] Sessions et routes protegees valides
- [ ] Roles minimaux appliques

## Definition of done de l'epic

Milestone M4 atteint.
```

---

## Bloc 7 - Epic Dashboard

```md
Title: [EPIC][DSH] Dashboard participant MVP

Labels:

- type: epic
- area: dashboard
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Contexte

Proposer une vue d'accueil participant utile et actionnable.

## Objectif

Implementer le contenu dashboard, l'aggregation API et les vues clientes.

## Sous-taches (issues enfants)

- [ ] DSH-01 - Definir contenu dashboard MVP (cartes, rappels, dernieres actus) (P0) - deps: ARC-04
- [ ] DSH-02 - Exposer endpoint dashboard aggregate cote API (P0) - deps: SET-02, LIB-01, AUT-02
- [ ] DSH-03 - Implementer vue dashboard mobile (P0) - deps: MOB-02, AUT-04, DSH-02
- [ ] DSH-04 - Implementer vue dashboard web participant (si activee MVP) (P1) - deps: WEB-01, AUT-04, DSH-02

## Dependances amont

- AUT
- MOB
- LIB

## Criteres d'acceptation

- [ ] Dashboard mobile utilisable
- [ ] Donnees agregees fiables
- [ ] Variante web confirmee selon scope

## Definition of done de l'epic

Contribution DSH completee pour M5.
```

---

## Bloc 8 - Epic Programs

```md
Title: [EPIC][PRG] Parcours Programmes MVP

Labels:

- type: epic
- area: programs
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Contexte

Permettre la consultation et le suivi minimum des programmes participants.

## Objectif

Implementer modeles, endpoints, vues mobiles et tests de comportement.

## Sous-taches (issues enfants)

- [ ] PRG-01 - Definir modele programme/cohorte/statut progression MVP (P0) - deps: ARC-04
- [ ] PRG-02 - Implementer endpoints liste/detail programmes (P0) - deps: SET-02, LIB-01, AUT-02, PRG-01
- [ ] PRG-03 - Implementer ecran mobile liste + detail programme (P0) - deps: MOB-02, PRG-02
- [ ] PRG-04 - Implementer marquage de progression minimale (P1) - deps: PRG-02, LIB-02
- [ ] PRG-05 - Ajouter scenarii de test Given/When/Then programmes (P1) - deps: PRG-03, PRG-04, QAT-01

## Dependances amont

- AUT
- MOB
- LIB

## Criteres d'acceptation

- [ ] Liste et detail programmes accessibles
- [ ] Progression minimale sauvegardee
- [ ] Scenarios BDD associes

## Definition of done de l'epic

Contribution PRG completee pour M5.
```

---

## Bloc 9 - Epic Resources

```md
Title: [EPIC][RES] Catalogue Ressources MVP

Labels:

- type: epic
- area: resources
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Contexte

Mettre a disposition des ressources consultables et filtrables par les
participants.

## Objectif

Implementer taxonomie, endpoints, experience mobile et tracking.

## Sous-taches (issues enfants)

- [ ] RES-01 - Definir taxonomie ressources (type, theme, audience) (P0) - deps: ARC-04
- [ ] RES-02 - Implementer endpoints ressources (liste, filtre, detail) (P0) - deps: SET-02, LIB-01, AUT-02, RES-01
- [ ] RES-03 - Implementer ecran mobile ressources (recherche/filtre) (P0) - deps: MOB-02, RES-02
- [ ] RES-04 - Implementer tracking consultation ressources (P1) - deps: RES-02, WEB-04

## Dependances amont

- AUT
- MOB
- LIB

## Criteres d'acceptation

- [ ] Consultation/filtrage ressources operationnels
- [ ] Detail ressource disponible
- [ ] Tracking de consultation enregistre

## Definition of done de l'epic

Contribution RES completee pour M5.
```

---

## Bloc 10 - Epic Announcements

```md
Title: [EPIC][ANN] Flux Annonces MVP

Labels:

- type: epic
- area: announcements
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Contexte

Diffuser des annonces utiles et prioritaires vers les participants.

## Objectif

Implementer le format annonce, le feed API, l'affichage mobile et les push.

## Sous-taches (issues enfants)

- [ ] ANN-01 - Definir format annonce et regles de publication MVP (P0) - deps: ARC-04
- [ ] ANN-02 - Implementer endpoints annonces (feed + detail) (P0) - deps: SET-02, LIB-01, AUT-02, ANN-01
- [ ] ANN-03 - Implementer flux annonces dans mobile dashboard/feed (P0) - deps: MOB-02, DSH-02, ANN-02
- [ ] ANN-04 - Ajouter notification push pour annonce prioritaire (P1) - deps: MOB-05, ANN-02

## Dependances amont

- AUT
- MOB
- DSH

## Criteres d'acceptation

- [ ] Feed annonces visible dans l'app
- [ ] Detail annonce accessible
- [ ] Push prioritaire declenchable

## Definition of done de l'epic

Contribution ANN completee pour M5.
```

---

## Bloc 11 - Epic Support

```md
Title: [EPIC][SUP] Canal Support MVP

Labels:

- type: epic
- area: support
- priority: P0
- status: backlog

Milestone:

- M5 - Core participant flows ready

Body:

## Contexte

Fournir un canal de contact/support simple, fiable et tracable.

## Objectif

Mettre en place endpoint support, formulaires web/mobile et notifications email.

## Sous-taches (issues enfants)

- [ ] SUP-01 - Implementer endpoint contact/support (API + validation) (P0) - deps: SET-02, LIB-01
- [ ] SUP-02 - Integrer formulaire support dans mobile (P0) - deps: MOB-02, SUP-01, AUT-04
- [ ] SUP-03 - Integrer formulaire contact site web (P0) - deps: WEB-01, SUP-01
- [ ] SUP-04 - Configurer envoi email transactionnel (Resend ou equivalent) (P1) - deps: SUP-01
- [ ] SUP-05 - Ajouter suivi et statut basique des demandes support (P1) - deps: SUP-01, AUT-05

## Dependances amont

- SET
- LIB
- AUT

## Criteres d'acceptation

- [ ] Formulaires web et mobile operationnels
- [ ] Envoi/trace des demandes support
- [ ] Statut basique de suivi disponible

## Definition of done de l'epic

Contribution SUP completee pour M5.
```

---

## Bloc 12 - Epic QA

```md
Title: [EPIC][QAT] Qualification MVP et stabilisation

Labels:

- type: epic
- area: qa
- priority: P0
- status: backlog

Milestone:

- M6 - QA ready

Body:

## Contexte

Valider la qualite fonctionnelle et non-fonctionnelle avant pilot release.

## Objectif

Clore toutes les issues QAT-\* pour atteindre M6.

## Sous-taches (issues enfants)

- [ ] QAT-01 - Definir matrice de couverture (page, composant, comportement) (P0) - deps: SET-04, SET-05
- [ ] QAT-02 - Ecrire tests unitaires composants critiques web/mobile (P0) - deps: QAT-01, WEB-01, MOB-02
- [ ] QAT-03 - Ecrire tests integration API modules critiques (P0) - deps: QAT-01, AUT-02, PRG-02, RES-02, ANN-02, SUP-01
- [ ] QAT-04 - Ecrire E2E Given/When/Then pour parcours coeur participant (P0) - deps: QAT-01, AUT-03, DSH-03, PRG-03, RES-03, SUP-02
- [ ] QAT-05 - Realiser campagne regression et corriger blockers (P0) - deps: QAT-02, QAT-03, QAT-04
- [ ] QAT-06 - Realiser checks accessibilite/performance pre-pilot (P1) - deps: QAT-05, WEB-05

## Dependances amont

- WEB
- AUT
- DSH
- PRG
- RES
- ANN
- SUP

## Criteres d'acceptation

- [ ] Couverture cible atteinte
- [ ] Parcours critiques validates
- [ ] Blockers critiques resolus

## Definition of done de l'epic

Milestone M6 atteint.
```

---

## Bloc 13 - Epic Deployment

```md
Title: [EPIC][DEP] Pilot release ready

Labels:

- type: epic
- area: deployment
- priority: P0
- status: backlog

Milestone:

- M7 - Pilot release ready

Body:

## Contexte

Preparer les environnements, pipelines, runbooks et la publication pilote.

## Objectif

Clore toutes les issues DEP-\* pour atteindre M7.

## Sous-taches (issues enfants)

- [ ] DEP-01 - Configurer environnements (dev/staging/pilot) (P0) - deps: SET-07
- [ ] DEP-02 - Mettre en place pipeline deploiement web (P0) - deps: SET-06, WEB-05
- [ ] DEP-03 - Mettre en place pipeline deploiement API (P0) - deps: SET-06, QAT-03
- [ ] DEP-04 - Preparer distribution mobile test (APK/TestFlight interne) (P0) - deps: MOB-04, QAT-04
- [ ] DEP-05 - Finaliser observabilite et alerting minimum (P1) - deps: DEP-02, DEP-03
- [ ] DEP-06 - Rediger runbook incident + rollback + pilot checklist (P0) - deps: DEP-01, DEP-05, QAT-06
- [ ] DEP-07 - Executer go/no-go pilote et publier release pilote (P0) - deps: DEP-02, DEP-03, DEP-04, DEP-06

## Dependances amont

- QAT
- WEB
- MOB
- SET

## Criteres d'acceptation

- [ ] Environnements et pipelines operationnels
- [ ] Runbooks et rollback valides
- [ ] Release pilote publiee apres go/no-go

## Definition of done de l'epic

Milestone M7 atteint.
```
