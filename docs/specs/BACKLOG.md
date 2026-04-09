# Backlog Produit MVP KRAAK - Plan D'exécution

- Projet : site web MVP KRAAK Consulting
- Dépôt : https://github.com/Ange230700/kraak-group
- Project board : https://github.com/users/Ange230700/projects/6
- Mise à jour : 9 avril 2026

---

## Vue d'ensemble

Ce backlog structure l'exécution MVP autour de 8 épopées et 30 tâches.
Objectif : livrer un site crédible, rapide, orienté conversion, avec une base
technique propre et des parcours de contact fonctionnels.

Critères de succès MVP :

- site public déployé et stable
- experience mobile de base validée
- message clair sur les services KRAAK
- formulaires de contact fonctionnels
- fondations SEO/analytics en place

---

## Jalons Et Cadence

| Jalon | Description | Fenetre cible |
| --- | --- | --- |
| Scope locked | Perimetre MVP fige | S1-S2 |
| Design approved | Design system et maquettes valides | S3-S4 |
| Content ready | Contenus rediges et approuves | S3-S4 |
| Development complete | Pages et integrations finalisees | S5-S8 |
| QA complete | Verification fonctionnelle terminee | S8-S9 |
| Launch | Mise en production | S9-S10 |

---

## Epopee 1 - Strategie De Contenu Et Production

- Statut : `status: backlog`
- Priorite : `priority: critical`
- Objectif : produire et valider les contenus des pages MVP.

Taches liees :

- Issue #9 : finaliser les messages de la page d'accueil
- Issue #10 : developper les descriptions des services
- Issue #11 : creer le contenu de la page A propos

Definition de fini :

- contenus valides par les parties prenantes
- tonalite KRAAK respectee
- relecture linguistique FR complete

---

## Epopee 2 - Systeme De Design Et Design Visuel

- Statut : `status: backlog`
- Priorite : `priority: critical`
- Objectif : etablir le design system et les maquettes de reference.

Taches liees :

- Issue #12 : documentation design system
- Issue #13 : wireframes de toutes les pages MVP
- Issue #14 : maquettes haute fidelite

Livrables :

- tokens visuels (couleurs, typo, espacements)
- composants d'interface principaux
- ecrans desktop/mobile coherents

---

## Epopee 3 - Setup Frontend Et Infrastructure

- Statut : `status: backlog`
- Priorite : `priority: critical`
- Objectif : initialiser le monorepo et les fondations CI/CD.

Taches liees :

- Issue #15 : initialiser le monorepo pnpm
- Issue #16 : configurer Angular 21 avec prerendu
- Issue #17 : configurer Tailwind CSS et PrimeNG
- Issue #18 : configurer GitHub Actions CI/CD
- Issue #19 : configurer les tests E2E Playwright

Stack retenue (version cible) :

- Angular 21.2.x
- Tailwind CSS 4.1.x
- PrimeNG 21.x
- TypeScript 5.9.x

---

## Epopee 4 - Implementation Des Pages

- Statut : `status: backlog`
- Priorite : `priority: critical`
- Objectif : implementer les 5 pages coeur du MVP.

Pages :

- Issue #20 : Accueil
- Issue #21 : A propos
- Issue #22 : Services
- Issue #23 : Programmes
- Issue #24 : Contact

Exigences transverses :

- responsive mobile-first
- accessibilite de base (WCAG AA)
- marquage SEO propre
- performances ciblees (Lighthouse > 90)

---

## Epopee 5 - Contact Et Integration Des Formulaires

- Statut : `status: backlog`
- Priorite : `priority: critical`
- Objectif : capter les leads et assurer l'envoi des demandes.

Taches liees :

- Issue #25 : composant formulaire de contact
- Issue #26 : endpoint API NestJS pour formulaires
- Issue #27 : integration email via Resend

Points de controle :

- validation des champs et messages d'erreur
- envoi email confirme
- stockage des demandes trace

---

## Epopee 6 - SEO Et Optimisation Technique

- Statut : `status: backlog`
- Priorite : `priority: high`
- Objectif : consolider la visibilite organique et la qualite technique.

Taches liees :

- Issue #28 : balises meta et Open Graph
- Issue #29 : configuration Google Analytics 4
- Issue #30 : generation sitemap XML
- Issue #31 : optimisation performances/accessibilite

Livrables attendus :

- metadata par page
- robots.txt et sitemap
- instrumentation analytics
- plan d'amelioration perf continu

---

## Epopee 7 - Assurance Qualite Et Tests

- Statut : `status: backlog`
- Priorite : `priority: high`
- Objectif : verifier les parcours critiques et la robustesse du MVP.

Taches liees :

- Issue #32 : tests E2E des parcours critiques
- Issue #33 : tests de compatibilite mobile
- Issue #34 : tests multi-navigateurs

Couverture minimale :

- tests unitaires composants
- tests integration
- tests E2E Playwright (Given/When/Then)
- verification accessibilite et performance

---

## Epopee 8 - Deploiement Et Lancement

- Statut : `status: backlog`
- Priorite : `priority: high`
- Objectif : preparer l'exploitation et lancer en production.

Taches liees :

- Issue #35 : deploiement frontend Vercel
- Issue #36 : deploiement backend Render
- Issue #37 : audit securite pre-lancement
- Issue #38 : runbook de deploiement

Checklist pre-lancement :

- variables d'environnement validees
- supervision de base activee
- tests smoke passes sur prod
- procedure d'incident documentee

---

## Reference Statut / Priorite / Type

### Statuts

| Label | Signification |
| --- | --- |
| `status: backlog` | non demarre |
| `status: ready` | pret a lancer |
| `status: in-progress` | en cours |
| `status: review` | en verification |
| `status: done` | termine |

### Priorites

| Label | Signification |
| --- | --- |
| `priority: critical` | indispensable au MVP |
| `priority: high` | important pour la qualite/lancement |
| `priority: medium` | utile mais non bloquant |
| `priority: low` | deferable |

### Types

| Label | Signification |
| --- | --- |
| `type: epic` | initiative structurante |
| `type: feature` | fonctionnalite |
| `type: bug` | correction |
| `type: chore` | maintenance/documentation |

---

## Workflow D'Execution

1. Creer/mettre a jour l'issue avec AC clairs.
2. Passer la carte en `In Progress` au demarrage.
3. Travailler en branche courte.
4. Appliquer TDD : RED -> GREEN -> REFACTOR.
5. Ouvrir PR avec preuves de validation.
6. Passer en `Review` puis `Done` apres fusion.

---

## Statistiques Backlog

- 8 épopées
- 30 tâches
- 38 issues au total
- 16 tâches critiques
- 10 tâches priorite haute
- 4 tâches priorite moyenne

---

## Recommandation De Sequencement

### Phase 1 (S1-S2) - Fondations

- setup monorepo/frontend
- premiers contenus
- cadrage design system

### Phase 2 (S3-S4) - Design Et Preparation

- wireframes + maquettes
- finalisation contenus
- outillage test/CI complet

### Phase 3 (S5-S8) - Implementation

- pages MVP
- formulaires + API
- couche SEO/analytics

### Phase 4 (S8-S9) - QA

- E2E + mobile + navigateurs
- correction des ecarts critiques

### Phase 5 (S9-S10) - Lancement

- deploiement Vercel/Render
- audit securite
- runbook et supervision

---

## Notes D'Application

- Pas d'extension du perimetre V1.1 dans le MVP sans accord explicite.
- Politique de langue : francais pour docs/commentaires/messages utilisateurs,
  anglais pour identifiants et elements techniques de code.
- Toute decision d'architecture doit etre tracee dans `docs/decisions/`.
