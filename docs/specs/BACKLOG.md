# Backlog Produit MVP KRAAK - Epics, Issues Et Milestones

- Projet : KRAAK (MVP web + base mobile)
- Depot : https://github.com/Ange230700/kraak-group
- Project board : voir le board actif documenté dans `docs/runbooks/GITHUB_PROJECT_BOARD.md`
- Mise a jour : 10 avril 2026

---

## Cadre Du Backlog

Ce backlog couvre le MVP avec 13 epics, des issues detaillees, des priorites et
des dependances explicites.

Ce document reste la source de verite **metier** du MVP. Pour le pilotage
quotidien a deux, la source de verite **operationnelle** devient :

- `docs/runbooks/GITHUB_PROJECT_BOARD.md` pour les vues, champs et regles board
- `docs/specs/github_project_import_parallel_duo.csv` pour la projection
  `Lane / Surface / Coupling / Wave`

Echelle de priorite appliquee a toutes les issues :

- `P0` : blocant MVP / pilot release
- `P1` : essentiel mais non blocant immediate
- `P2` : utile, post-pilot possible si necessaire

Regle de dependances :

- `none` : aucune dependance
- liste d'IDs : issue(s) a terminer avant demarrage

---

## Regles De Decoupage Pour Travail A Deux

Objectif : reduire les blocages entre collaborateurs sans changer le scope MVP.

Regles a appliquer dans le GitHub Project :

- une tache active = **une surface principale** (`web`, `mobile`, `api`,
  `shared`, `qa`, `ops`)
- une tache active = **un resultat observable** et **une validation**
  principal(e)
- ne pas garder une meme issue pour `web + mobile` ou `api + UI` quand un
  handoff explicite suffit
- les contrats et endpoints partages servent de **point de passage court**, pas
  de zone de travail longue
- les tests transverses doivent etre decoupes par surface ou par parcours, puis
  regroupes seulement au niveau du reporting

Lanes recommandees :

| Lane                              | Portee principale                                 | Type de travail                  |
| --------------------------------- | ------------------------------------------------- | -------------------------------- |
| `Lane A - Web public`             | site vitrine, conversion, SEO, contact web        | plutot independant               |
| `Lane B - Platform & participant` | packages, API, mobile, auth, parcours participant | plutot sequentiel mais concentre |
| `Shared handoff`                  | contrats, conventions, quality gates, release     | court, explicite, limite         |

Issues a re-decouper au niveau board si elles redeviennent bloquantes :

- `WEB-01` : piloter en sous-tranches `Accueil`, `A propos`, `Services`,
  `Programmes`, `Contact`
- `AUT-04` : separer la garde web et la garde mobile si les deux surfaces
  avancent en parallele
- `QAT-02` : separer couverture composants `web` et `mobile`
- `QAT-03` : suivre les tests d'integration API par module critique
- `QAT-04` : suivre les E2E par parcours (`auth`, `dashboard`, `programmes`,
  `ressources`, `support`)

Principe de pilotage :

- garder les IDs backlog actuels pour la coherence du MVP
- utiliser les champs board `Lane`, `Surface`, `Coupling` et `Wave` pour
  resynchroniser le travail reel sans renumeroter tout le backlog

---

## Milestones

| Milestone                           | Intent                                            | Exit criteria                                                           |
| ----------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| `M1 - Architecture locked`          | architecture validee et tracee                    | toutes les issues `ARC-*` en `done`                                     |
| `M2 - Workspace bootstrapped`       | socle de dev operationnel                         | toutes les issues `SET-*` + `LIB-01` + `LIB-02` en `done`               |
| `M3 - Mobile shell ready`           | shell mobile navigable et installable             | toutes les issues `MOB-*` en `done`                                     |
| `M4 - Auth ready`                   | authentification stable web/mobile/api            | toutes les issues `AUT-*` en `done`                                     |
| `M5 - Core participant flows ready` | parcours coeur participant utilisables            | toutes les issues `DSH-*`, `PRG-*`, `RES-*`, `ANN-*`, `SUP-*` en `done` |
| `M6 - QA ready`                     | couverture de test et stabilisation pre-lancement | toutes les issues `QAT-*` en `done`                                     |
| `M7 - Pilot release ready`          | deploiement pilote et runbooks operationnels      | toutes les issues `DEP-*` en `done`                                     |

---

## Epic 1 - Architecture (`ARC`)

Objectif : figer les choix techniques et les contrats de base.
Milestone cible : `M1 - Architecture locked`

| Issue ID | Tache                                                                                       | Priorite | Dependances        |
| -------- | ------------------------------------------------------------------------------------------- | -------- | ------------------ |
| `ARC-01` | Valider architecture cible web/mobile/api avec scope MVP                                    | `P0`     | `none`             |
| `ARC-02` | Definir conventions repo (naming, structure, quality gates)                                 | `P0`     | `ARC-01`           |
| `ARC-03` | Definir strategie de rendu web (SEO/prerender)                                              | `P0`     | `ARC-01`           |
| `ARC-04` | Definir modeles de donnees MVP (participant, programme, ressource, annonce, ticket support) | `P0`     | `ARC-01`           |
| `ARC-05` | Documenter ADRs et criteres anti-scope-creep                                                | `P1`     | `ARC-02`, `ARC-04` |

---

## Epic 2 - Workspace Setup (`SET`)

Objectif : rendre le workspace buildable, testable et automatisable.
Milestone cible : `M2 - Workspace bootstrapped`

| Issue ID | Tache                                                                                              | Priorite | Dependances                  |
| -------- | -------------------------------------------------------------------------------------------------- | -------- | ---------------------------- |
| `SET-01` | Initialiser workspace Angular monorepo (`apps/client/projects/web`, `apps/client/projects/mobile`) | `P0`     | `ARC-02`                     |
| `SET-02` | Initialiser `apps/api` NestJS et wiring de base                                                    | `P0`     | `ARC-02`                     |
| `SET-03` | Configurer quality gates (lint, format, typecheck)                                                 | `P0`     | `SET-01`, `SET-02`           |
| `SET-04` | Configurer test runners unitaires + integration                                                    | `P0`     | `SET-01`, `SET-02`           |
| `SET-05` | Configurer Playwright E2E et smoke pipeline                                                        | `P0`     | `SET-01`, `SET-04`           |
| `SET-06` | Configurer CI GitHub Actions multi-apps                                                            | `P0`     | `SET-03`, `SET-04`, `SET-05` |
| `SET-07` | Mettre en place variables d'environnement et runbook local dev                                     | `P1`     | `SET-02`                     |

---

## Epic 3 - Shared Libraries (`LIB`)

Objectif : factoriser les contrats et la logique transverse sans sur-ingenierie.
Milestone cible : `M2 - Workspace bootstrapped`

| Issue ID | Tache                                                           | Priorite | Dependances        |
| -------- | --------------------------------------------------------------- | -------- | ------------------ |
| `LIB-01` | Creer `packages/contracts` (DTO, schema validation, versioning) | `P0`     | `ARC-04`, `SET-02` |
| `LIB-02` | Creer `packages/domain` (regles metier pures MVP)               | `P0`     | `ARC-04`, `LIB-01` |
| `LIB-03` | Creer `packages/api-client` (typed client web/mobile vers API)  | `P1`     | `LIB-01`, `SET-02` |
| `LIB-04` | Ajouter tests unitaires libs + guideline de publication interne | `P1`     | `LIB-02`, `LIB-03` |

---

## Epic 4 - Website (`WEB`)

Objectif : livrer le site vitrine MVP oriente conversion.
Milestone cible : `M5 - Core participant flows ready`

| Issue ID | Tache                                                                     | Priorite | Dependances        |
| -------- | ------------------------------------------------------------------------- | -------- | ------------------ |
| `WEB-01` | Implementer pages core (Accueil, A propos, Services, Programmes, Contact) | `P0`     | `SET-01`, `ARC-03` |
| `WEB-02` | Integrer formulaires de contact et CTA conversion                         | `P0`     | `WEB-01`, `SUP-01` |
| `WEB-03` | Ajouter SEO technique (meta, sitemap, robots, Open Graph)                 | `P0`     | `WEB-01`           |
| `WEB-04` | Ajouter analytics web (PostHog/GA)                                        | `P1`     | `WEB-01`           |
| `WEB-05` | Optimiser accessibilite/performance (objectif Lighthouse > 90)            | `P1`     | `WEB-01`, `WEB-03` |

---

## Epic 5 - Mobile Shell (`MOB`)

Objectif : fournir l'ossature mobile Ionic/Capacitor prete pour les modules.
Milestone cible : `M3 - Mobile shell ready`

| Issue ID | Tache                                                            | Priorite | Dependances        |
| -------- | ---------------------------------------------------------------- | -------- | ------------------ |
| `MOB-01` | Initialiser app Ionic Angular dans `apps/client/projects/mobile` | `P0`     | `SET-01`           |
| `MOB-02` | Mettre en place navigation shell (tabs/stack) et layout de base  | `P0`     | `MOB-01`           |
| `MOB-03` | Integrer theming, design tokens et composants UI de base         | `P1`     | `MOB-01`, `LIB-01` |
| `MOB-04` | Configurer Capacitor (Android/iOS) et builds debug               | `P0`     | `MOB-01`           |
| `MOB-05` | Ajouter service notifications push stub (FCM wiring initial)     | `P1`     | `MOB-04`, `SET-02` |

---

## Epic 6 - Auth (`AUT`)

Objectif : offrir une authentification securisee et consistente web/mobile.
Milestone cible : `M4 - Auth ready`

| Issue ID | Tache                                                  | Priorite | Dependances        |
| -------- | ------------------------------------------------------ | -------- | ------------------ |
| `AUT-01` | Configurer Supabase Auth (providers, policies de base) | `P0`     | `ARC-04`, `SET-02` |
| `AUT-02` | Implementer endpoints API auth/session (NestJS)        | `P0`     | `AUT-01`, `LIB-01` |
| `AUT-03` | Implementer ecrans login/signup/reset mobile           | `P0`     | `MOB-02`, `AUT-02` |
| `AUT-04` | Implementer garde routes protegees web/mobile          | `P0`     | `AUT-02`, `LIB-03` |
| `AUT-05` | Ajouter gestion role participant/admin minimal         | `P1`     | `AUT-02`, `ARC-04` |

---

## Epic 7 - Dashboard (`DSH`)

Objectif : page d'accueil participant avec synthese des elements utiles.
Milestone cible : `M5 - Core participant flows ready`

| Issue ID | Tache                                                            | Priorite | Dependances                  |
| -------- | ---------------------------------------------------------------- | -------- | ---------------------------- |
| `DSH-01` | Definir contenu dashboard MVP (cartes, rappels, dernieres actus) | `P0`     | `ARC-04`                     |
| `DSH-02` | Exposer endpoint dashboard aggregate cote API                    | `P0`     | `SET-02`, `LIB-01`, `AUT-02` |
| `DSH-03` | Implementer vue dashboard mobile                                 | `P0`     | `MOB-02`, `AUT-04`, `DSH-02` |
| `DSH-04` | Implementer vue dashboard web participant (si activee MVP)       | `P1`     | `WEB-01`, `AUT-04`, `DSH-02` |

---

## Epic 8 - Programs (`PRG`)

Objectif : permettre consultation et suivi simple des programmes.
Milestone cible : `M5 - Core participant flows ready`

| Issue ID | Tache                                                   | Priorite | Dependances                            |
| -------- | ------------------------------------------------------- | -------- | -------------------------------------- |
| `PRG-01` | Definir modele programme/cohorte/statut progression MVP | `P0`     | `ARC-04`                               |
| `PRG-02` | Implementer endpoints liste/detail programmes           | `P0`     | `SET-02`, `LIB-01`, `AUT-02`, `PRG-01` |
| `PRG-03` | Implementer ecran mobile liste + detail programme       | `P0`     | `MOB-02`, `PRG-02`                     |
| `PRG-04` | Implementer marquage de progression minimale            | `P1`     | `PRG-02`, `LIB-02`                     |
| `PRG-05` | Ajouter scenarii de test Given/When/Then programmes     | `P1`     | `PRG-03`, `PRG-04`, `QAT-01`           |

---

## Epic 9 - Resources (`RES`)

Objectif : offrir un acces simple a des ressources utiles aux participants.
Milestone cible : `M5 - Core participant flows ready`

| Issue ID | Tache                                                    | Priorite | Dependances                            |
| -------- | -------------------------------------------------------- | -------- | -------------------------------------- |
| `RES-01` | Definir taxonomie ressources (type, theme, audience)     | `P0`     | `ARC-04`                               |
| `RES-02` | Implementer endpoints ressources (liste, filtre, detail) | `P0`     | `SET-02`, `LIB-01`, `AUT-02`, `RES-01` |
| `RES-03` | Implementer ecran mobile ressources (recherche/filtre)   | `P0`     | `MOB-02`, `RES-02`                     |
| `RES-04` | Implementer tracking consultation ressources             | `P1`     | `RES-02`, `WEB-04`                     |

---

## Epic 10 - Announcements (`ANN`)

Objectif : diffuser annonces et mises a jour importantes.
Milestone cible : `M5 - Core participant flows ready`

| Issue ID | Tache                                                | Priorite | Dependances                            |
| -------- | ---------------------------------------------------- | -------- | -------------------------------------- |
| `ANN-01` | Definir format annonce et regles de publication MVP  | `P0`     | `ARC-04`                               |
| `ANN-02` | Implementer endpoints annonces (feed + detail)       | `P0`     | `SET-02`, `LIB-01`, `AUT-02`, `ANN-01` |
| `ANN-03` | Implementer flux annonces dans mobile dashboard/feed | `P0`     | `MOB-02`, `DSH-02`, `ANN-02`           |
| `ANN-04` | Ajouter notification push pour annonce prioritaire   | `P1`     | `MOB-05`, `ANN-02`                     |

---

## Epic 11 - Support (`SUP`)

Objectif : mettre en place un canal de support simple et fiable.
Milestone cible : `M5 - Core participant flows ready`

| Issue ID | Tache                                                        | Priorite | Dependances                  |
| -------- | ------------------------------------------------------------ | -------- | ---------------------------- |
| `SUP-01` | Implementer endpoint contact/support (API + validation)      | `P0`     | `SET-02`, `LIB-01`           |
| `SUP-02` | Integrer formulaire support dans mobile                      | `P0`     | `MOB-02`, `SUP-01`, `AUT-04` |
| `SUP-03` | Integrer formulaire contact site web                         | `P0`     | `WEB-01`, `SUP-01`           |
| `SUP-04` | Configurer envoi email transactionnel (Resend ou equivalent) | `P1`     | `SUP-01`                     |
| `SUP-05` | Ajouter suivi et statut basique des demandes support         | `P1`     | `SUP-01`, `AUT-05`           |

---

## Epic 12 - QA (`QAT`)

Objectif : verifier la conformite fonctionnelle, qualite et robustesse du MVP.
Milestone cible : `M6 - QA ready`

| Issue ID | Tache                                                         | Priorite | Dependances                                                |
| -------- | ------------------------------------------------------------- | -------- | ---------------------------------------------------------- |
| `QAT-01` | Definir matrice de couverture (page, composant, comportement) | `P0`     | `SET-04`, `SET-05`                                         |
| `QAT-02` | Ecrire tests unitaires composants critiques web/mobile        | `P0`     | `QAT-01`, `WEB-01`, `MOB-02`                               |
| `QAT-03` | Ecrire tests integration API modules critiques                | `P0`     | `QAT-01`, `AUT-02`, `PRG-02`, `RES-02`, `ANN-02`, `SUP-01` |
| `QAT-04` | Ecrire E2E Given/When/Then pour parcours coeur participant    | `P0`     | `QAT-01`, `AUT-03`, `DSH-03`, `PRG-03`, `RES-03`, `SUP-02` |
| `QAT-05` | Realiser campagne regression et corriger blockers             | `P0`     | `QAT-02`, `QAT-03`, `QAT-04`                               |
| `QAT-06` | Realiser checks accessibilite/performance pre-pilot           | `P1`     | `QAT-05`, `WEB-05`                                         |

---

## Epic 13 - Deployment (`DEP`)

Objectif : preparer et executer un lancement pilote maitrise.
Milestone cible : `M7 - Pilot release ready`

| Issue ID | Tache                                                      | Priorite | Dependances                            |
| -------- | ---------------------------------------------------------- | -------- | -------------------------------------- |
| `DEP-01` | Configurer environnements (dev/staging/pilot)              | `P0`     | `SET-07`                               |
| `DEP-02` | Mettre en place pipeline deploiement web                   | `P0`     | `SET-06`, `WEB-05`                     |
| `DEP-03` | Mettre en place pipeline deploiement API                   | `P0`     | `SET-06`, `QAT-03`                     |
| `DEP-04` | Preparer distribution mobile test (APK/TestFlight interne) | `P0`     | `MOB-04`, `QAT-04`                     |
| `DEP-05` | Finaliser observabilite et alerting minimum                | `P1`     | `DEP-02`, `DEP-03`                     |
| `DEP-06` | Rediger runbook incident + rollback + pilot checklist      | `P0`     | `DEP-01`, `DEP-05`, `QAT-06`           |
| `DEP-07` | Executer go/no-go pilote et publier release pilote         | `P0`     | `DEP-02`, `DEP-03`, `DEP-04`, `DEP-06` |

---

## Vue Dependances Entre Epics

| Epic  | Dependances amont                               |
| ----- | ----------------------------------------------- |
| `ARC` | none                                            |
| `SET` | `ARC`                                           |
| `LIB` | `ARC`, `SET`                                    |
| `MOB` | `SET`, `LIB`                                    |
| `AUT` | `SET`, `LIB`, `MOB`                             |
| `WEB` | `SET`, `SUP` (pour formulaires relies API)      |
| `DSH` | `AUT`, `MOB`, `LIB`                             |
| `PRG` | `AUT`, `MOB`, `LIB`                             |
| `RES` | `AUT`, `MOB`, `LIB`                             |
| `ANN` | `AUT`, `MOB`, `DSH`                             |
| `SUP` | `SET`, `LIB`, `AUT`                             |
| `QAT` | `WEB`, `AUT`, `DSH`, `PRG`, `RES`, `ANN`, `SUP` |
| `DEP` | `QAT`, `WEB`, `MOB`, `SET`                      |

---

## Definition Of Done Par Milestone

- `M1 - Architecture locked` : documents d'architecture valides, conventions fixees, modeles MVP traces.
- `M2 - Workspace bootstrapped` : monorepo fonctionnel, quality gates actifs, CI verte.
- `M3 - Mobile shell ready` : app mobile lanceable, navigation de base, build debug valide.
- `M4 - Auth ready` : login/session/protection routes operationnels et testes.
- `M5 - Core participant flows ready` : dashboard, programmes, ressources, annonces, support utilisables sur shell mobile (+ web selon scope).
- `M6 - QA ready` : couverture minimales unitaires/integration/E2E atteinte, blockers corriges.
- `M7 - Pilot release ready` : runbooks, pipelines, observabilite et release pilote valides.

---

## Sequence Recommandee

1. `M1` : clore `ARC-*`.
2. `M2` : clore `SET-*` et socle `LIB-*`.
3. `M3` : clore `MOB-*`.
4. `M4` : clore `AUT-*`.
5. `M5` : clore modules coeur participant (`DSH-*`, `PRG-*`, `RES-*`, `ANN-*`, `SUP-*`) + pages web MVP.
6. `M6` : clore `QAT-*`.
7. `M7` : clore `DEP-*` et lancer pilote.

---

## Notes D'Execution

- Respect strict du scope MVP (pas de glissement V1.1 sans validation explicite).
- TDD obligatoire : `RED -> GREEN -> REFACTOR` sur chaque feature/bug.
- E2E obligatoires sur parcours critiques avec formulation Given/When/Then.
- Politique de langue du depot : code en anglais, documentation/messages en francais.
