# Sprint Slicing Proposal

## Assumptions
- Sprint length: 2 weeks
- Team baseline capacity target: 25-35 story points per sprint
- Priority rule: P0 first, then P1
- Dependency rule: downstream issue starts only after upstream dependencies are done

## Effort Scale
- S: 1-3 story points
- M: 5 story points
- L: 8+ story points

## Proposed Sprint Plan

### Sprint-01 (18 SP)
- ARC-01 (5 SP) [ARC] [TASK][ARC-01] Valider architecture cible web/mobile/api avec scope MVP | milestone: M1 - Architecture locked
- ARC-02 (3 SP) [ARC] [TASK][ARC-02] Definir conventions repo (naming, structure, quality gates) | milestone: M1 - Architecture locked
- ARC-03 (3 SP) [ARC] [TASK][ARC-03] Definir strategie de rendu web (SEO/prerender) | milestone: M1 - Architecture locked
- ARC-04 (5 SP) [ARC] [TASK][ARC-04] Definir modeles de donnees MVP | milestone: M1 - Architecture locked
- ARC-05 (2 SP) [ARC] [TASK][ARC-05] Documenter ADRs et criteres anti-scope-creep | milestone: M1 - Architecture locked

### Sprint-02 (38 SP)
- LIB-01 (5 SP) [LIB] [TASK][LIB-01] Creer packages/contracts (DTO, schema validation, versioning) | milestone: M2 - Workspace bootstrapped
- LIB-02 (5 SP) [LIB] [TASK][LIB-02] Creer packages/domain (regles metier pures MVP) | milestone: M2 - Workspace bootstrapped
- SET-01 (5 SP) [SET] [TASK][SET-01] Initialiser workspace Angular monorepo (apps/web, apps/mobile) | milestone: M2 - Workspace bootstrapped
- SET-02 (5 SP) [SET] [TASK][SET-02] Initialiser apps/api NestJS et wiring de base | milestone: M2 - Workspace bootstrapped
- SET-03 (3 SP) [SET] [TASK][SET-03] Configurer quality gates (lint, format, typecheck) | milestone: M2 - Workspace bootstrapped
- SET-04 (3 SP) [SET] [TASK][SET-04] Configurer test runners unitaires + integration | milestone: M2 - Workspace bootstrapped
- SET-05 (5 SP) [SET] [TASK][SET-05] Configurer Playwright E2E et smoke pipeline | milestone: M2 - Workspace bootstrapped
- SET-06 (5 SP) [SET] [TASK][SET-06] Configurer CI GitHub Actions multi-apps | milestone: M2 - Workspace bootstrapped
- SET-07 (2 SP) [SET] [TASK][SET-07] Mettre en place variables d'environnement et runbook local dev | milestone: M2 - Workspace bootstrapped

### Sprint-03 (24 SP)
- LIB-03 (3 SP) [LIB] [TASK][LIB-03] Creer packages/api-client (typed client web/mobile vers API) | milestone: M2 - Workspace bootstrapped
- LIB-04 (2 SP) [LIB] [TASK][LIB-04] Ajouter tests unitaires libs + guideline de publication interne | milestone: M2 - Workspace bootstrapped
- MOB-01 (3 SP) [MOB] [TASK][MOB-01] Initialiser app Ionic Angular dans apps/mobile | milestone: M3 - Mobile shell ready
- MOB-02 (5 SP) [MOB] [TASK][MOB-02] Mettre en place navigation shell (tabs/stack) et layout de base | milestone: M3 - Mobile shell ready
- MOB-03 (3 SP) [MOB] [TASK][MOB-03] Integrer theming, design tokens et composants UI de base | milestone: M3 - Mobile shell ready
- MOB-04 (5 SP) [MOB] [TASK][MOB-04] Configurer Capacitor (Android/iOS) et builds debug | milestone: M3 - Mobile shell ready
- MOB-05 (3 SP) [MOB] [TASK][MOB-05] Ajouter service notifications push stub (FCM wiring initial) | milestone: M3 - Mobile shell ready

### Sprint-04 (19 SP)
- AUT-01 (3 SP) [AUT] [TASK][AUT-01] Configurer Supabase Auth (providers, policies de base) | milestone: M4 - Auth ready
- AUT-02 (5 SP) [AUT] [TASK][AUT-02] Implementer endpoints API auth/session (NestJS) | milestone: M4 - Auth ready
- AUT-03 (5 SP) [AUT] [TASK][AUT-03] Implementer ecrans login/signup/reset mobile | milestone: M4 - Auth ready
- AUT-04 (3 SP) [AUT] [TASK][AUT-04] Implementer garde routes protegees web/mobile | milestone: M4 - Auth ready
- AUT-05 (3 SP) [AUT] [TASK][AUT-05] Ajouter gestion role participant/admin minimal | milestone: M4 - Auth ready

### Sprint-05 (31 SP)
- ANN-01 (2 SP) [ANN] [TASK][ANN-01] Definir format annonce et regles de publication MVP | milestone: M5 - Core participant flows ready
- DSH-01 (2 SP) [DSH] [TASK][DSH-01] Definir contenu dashboard MVP (cartes, rappels, dernieres actus) | milestone: M5 - Core participant flows ready
- PRG-01 (3 SP) [PRG] [TASK][PRG-01] Definir modele programme/cohorte/statut progression MVP | milestone: M5 - Core participant flows ready
- RES-01 (2 SP) [RES] [TASK][RES-01] Definir taxonomie ressources (type, theme, audience) | milestone: M5 - Core participant flows ready
- SUP-01 (5 SP) [SUP] [TASK][SUP-01] Implementer endpoint contact/support (API + validation) | milestone: M5 - Core participant flows ready
- SUP-03 (3 SP) [SUP] [TASK][SUP-03] Integrer formulaire contact site web | milestone: M5 - Core participant flows ready
- WEB-01 (8 SP) [WEB] [TASK][WEB-01] Implementer pages core (Accueil, A propos, Services, Programmes, Contact) | milestone: M5 - Core participant flows ready
- WEB-02 (3 SP) [WEB] [TASK][WEB-02] Integrer formulaires de contact et CTA conversion | milestone: M5 - Core participant flows ready
- WEB-03 (3 SP) [WEB] [TASK][WEB-03] Ajouter SEO technique (meta, sitemap, robots, Open Graph) | milestone: M5 - Core participant flows ready

### Sprint-06 (53 SP)
- ANN-02 (3 SP) [ANN] [TASK][ANN-02] Implementer endpoints annonces (feed + detail) | milestone: M5 - Core participant flows ready
- ANN-03 (3 SP) [ANN] [TASK][ANN-03] Implementer flux annonces dans mobile dashboard/feed | milestone: M5 - Core participant flows ready
- DSH-02 (3 SP) [DSH] [TASK][DSH-02] Exposer endpoint dashboard aggregate cote API | milestone: M5 - Core participant flows ready
- DSH-03 (5 SP) [DSH] [TASK][DSH-03] Implementer vue dashboard mobile | milestone: M5 - Core participant flows ready
- DSH-04 (3 SP) [DSH] [TASK][DSH-04] Implementer vue dashboard web participant (si activee MVP) | milestone: M5 - Core participant flows ready
- PRG-02 (5 SP) [PRG] [TASK][PRG-02] Implementer endpoints liste/detail programmes | milestone: M5 - Core participant flows ready
- PRG-03 (5 SP) [PRG] [TASK][PRG-03] Implementer ecran mobile liste + detail programme | milestone: M5 - Core participant flows ready
- PRG-04 (3 SP) [PRG] [TASK][PRG-04] Implementer marquage de progression minimale | milestone: M5 - Core participant flows ready
- RES-02 (5 SP) [RES] [TASK][RES-02] Implementer endpoints ressources (liste, filtre, detail) | milestone: M5 - Core participant flows ready
- RES-03 (5 SP) [RES] [TASK][RES-03] Implementer ecran mobile ressources (recherche/filtre) | milestone: M5 - Core participant flows ready
- SUP-02 (3 SP) [SUP] [TASK][SUP-02] Integrer formulaire support dans mobile | milestone: M5 - Core participant flows ready
- SUP-04 (2 SP) [SUP] [TASK][SUP-04] Configurer envoi email transactionnel (Resend ou equivalent) | milestone: M5 - Core participant flows ready
- SUP-05 (3 SP) [SUP] [TASK][SUP-05] Ajouter suivi et statut basique des demandes support | milestone: M5 - Core participant flows ready
- WEB-04 (2 SP) [WEB] [TASK][WEB-04] Ajouter analytics web (PostHog/GA) | milestone: M5 - Core participant flows ready
- WEB-05 (3 SP) [WEB] [TASK][WEB-05] Optimiser accessibilite/performance (objectif Lighthouse > 90) | milestone: M5 - Core participant flows ready

### Sprint-07 (33 SP)
- ANN-04 (2 SP) [ANN] [TASK][ANN-04] Ajouter notification push pour annonce prioritaire | milestone: M5 - Core participant flows ready
- PRG-05 (3 SP) [PRG] [TASK][PRG-05] Ajouter scenarii de test Given/When/Then programmes | milestone: M5 - Core participant flows ready
- QAT-01 (3 SP) [QAT] [TASK][QAT-01] Definir matrice de couverture (page, composant, comportement) | milestone: M6 - QA ready
- QAT-02 (5 SP) [QAT] [TASK][QAT-02] Ecrire tests unitaires composants critiques web/mobile | milestone: M6 - QA ready
- QAT-03 (5 SP) [QAT] [TASK][QAT-03] Ecrire tests integration API modules critiques | milestone: M6 - QA ready
- QAT-04 (5 SP) [QAT] [TASK][QAT-04] Ecrire E2E Given/When/Then pour parcours coeur participant | milestone: M6 - QA ready
- QAT-05 (5 SP) [QAT] [TASK][QAT-05] Realiser campagne regression et corriger blockers | milestone: M6 - QA ready
- QAT-06 (3 SP) [QAT] [TASK][QAT-06] Realiser checks accessibilite/performance pre-pilot | milestone: M6 - QA ready
- RES-04 (2 SP) [RES] [TASK][RES-04] Implementer tracking consultation ressources | milestone: M5 - Core participant flows ready

### Sprint-08 (27 SP)
- DEP-01 (3 SP) [DEP] [TASK][DEP-01] Configurer environnements (dev/staging/pilot) | milestone: M7 - Pilot release ready
- DEP-02 (5 SP) [DEP] [TASK][DEP-02] Mettre en place pipeline deploiement web | milestone: M7 - Pilot release ready
- DEP-03 (5 SP) [DEP] [TASK][DEP-03] Mettre en place pipeline deploiement API | milestone: M7 - Pilot release ready
- DEP-04 (5 SP) [DEP] [TASK][DEP-04] Preparer distribution mobile test (APK/TestFlight interne) | milestone: M7 - Pilot release ready
- DEP-05 (3 SP) [DEP] [TASK][DEP-05] Finaliser observabilite et alerting minimum | milestone: M7 - Pilot release ready
- DEP-06 (3 SP) [DEP] [TASK][DEP-06] Rediger runbook incident + rollback + pilot checklist | milestone: M7 - Pilot release ready
- DEP-07 (3 SP) [DEP] [TASK][DEP-07] Executer go/no-go pilote et publier release pilote | milestone: M7 - Pilot release ready

## Milestone Mapping
- Sprint-01 -> M1
- Sprint-02 -> M2
- Sprint-03 -> M3
- Sprint-04 -> M4
- Sprint-05 + Sprint-06 -> M5
- Sprint-07 -> M6
- Sprint-08 -> M7

## Risks And Rebalancing Rules
- If a sprint exceeds 35 SP, move P1 items to the next sprint first.
- Do not move issues that are hard dependencies for P0 milestone completion.
- Keep QA (QAT) and Deployment (DEP) buffers intact to avoid pilot delay.
