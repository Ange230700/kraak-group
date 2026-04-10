# Pack Creation Issues via GitHub CLI (gh)

Ce pack permet de creer en masse toutes les child issues (`ARC-01` a `DEP-07`) avec un format coherent.

## Prerequis

1. GitHub CLI installe (`gh --version`)
2. Authentification active (`gh auth login`)
3. Droits d'ecriture sur le repo

## Script (copier-coller dans Git Bash)

```bash
set -euo pipefail

REPO="Ange230700/kraak-group"

create_task_issue() {
  local id="$1"
  local title="$2"
  local area="$3"
  local epic="$4"
  local priority="$5"
  local milestone="$6"
  local deps="$7"

  gh issue create \
    --repo "$REPO" \
    --title "[TASK][$id] $title" \
    --label "type: task" \
    --label "area: $area" \
    --label "epic: $epic" \
    --label "priority: $priority" \
    --label "status: backlog" \
    --milestone "$milestone" \
    --body "$(cat <<EOF
## Parent epic
$epic

## Description
$title

## Dependencies
$deps

## Acceptance criteria
- [ ] Scope of $id implemented
- [ ] Dependencies satisfied ($deps)
- [ ] Validation evidence added (tests/checks/screenshots as relevant)
EOF
)"
}

# ARC (M1)
create_task_issue "ARC-01" "Valider architecture cible web/mobile/api avec scope MVP" "architecture" "ARC" "P0" "M1 - Architecture locked" "none"
create_task_issue "ARC-02" "Definir conventions repo (naming, structure, quality gates)" "architecture" "ARC" "P0" "M1 - Architecture locked" "ARC-01"
create_task_issue "ARC-03" "Definir strategie de rendu web (SEO/prerender)" "architecture" "ARC" "P0" "M1 - Architecture locked" "ARC-01"
create_task_issue "ARC-04" "Definir modeles de donnees MVP" "architecture" "ARC" "P0" "M1 - Architecture locked" "ARC-01"
create_task_issue "ARC-05" "Documenter ADRs et criteres anti-scope-creep" "architecture" "ARC" "P1" "M1 - Architecture locked" "ARC-02, ARC-04"

# SET (M2)
create_task_issue "SET-01" "Initialiser workspace Angular monorepo (apps/client/projects/web, apps/client/projects/mobile)" "workspace" "SET" "P0" "M2 - Workspace bootstrapped" "ARC-02"
create_task_issue "SET-02" "Initialiser apps/api NestJS et wiring de base" "workspace" "SET" "P0" "M2 - Workspace bootstrapped" "ARC-02"
create_task_issue "SET-03" "Configurer quality gates (lint, format, typecheck)" "workspace" "SET" "P0" "M2 - Workspace bootstrapped" "SET-01, SET-02"
create_task_issue "SET-04" "Configurer test runners unitaires + integration" "workspace" "SET" "P0" "M2 - Workspace bootstrapped" "SET-01, SET-02"
create_task_issue "SET-05" "Configurer Playwright E2E et smoke pipeline" "workspace" "SET" "P0" "M2 - Workspace bootstrapped" "SET-01, SET-04"
create_task_issue "SET-06" "Configurer CI GitHub Actions multi-apps" "workspace" "SET" "P0" "M2 - Workspace bootstrapped" "SET-03, SET-04, SET-05"
create_task_issue "SET-07" "Mettre en place variables d'environnement et runbook local dev" "workspace" "SET" "P1" "M2 - Workspace bootstrapped" "SET-02"

# LIB (M2)
create_task_issue "LIB-01" "Creer packages/contracts (DTO, schema validation, versioning)" "shared-libs" "LIB" "P0" "M2 - Workspace bootstrapped" "ARC-04, SET-02"
create_task_issue "LIB-02" "Creer packages/domain (regles metier pures MVP)" "shared-libs" "LIB" "P0" "M2 - Workspace bootstrapped" "ARC-04, LIB-01"
create_task_issue "LIB-03" "Creer packages/api-client (typed client web/mobile vers API)" "shared-libs" "LIB" "P1" "M2 - Workspace bootstrapped" "LIB-01, SET-02"
create_task_issue "LIB-04" "Ajouter tests unitaires libs + guideline de publication interne" "shared-libs" "LIB" "P1" "M2 - Workspace bootstrapped" "LIB-02, LIB-03"

# WEB (M5)
create_task_issue "WEB-01" "Implementer pages core (Accueil, A propos, Services, Programmes, Contact)" "website" "WEB" "P0" "M5 - Core participant flows ready" "SET-01, ARC-03"
create_task_issue "WEB-02" "Integrer formulaires de contact et CTA conversion" "website" "WEB" "P0" "M5 - Core participant flows ready" "WEB-01, SUP-01"
create_task_issue "WEB-03" "Ajouter SEO technique (meta, sitemap, robots, Open Graph)" "website" "WEB" "P0" "M5 - Core participant flows ready" "WEB-01"
create_task_issue "WEB-04" "Ajouter analytics web (PostHog/GA)" "website" "WEB" "P1" "M5 - Core participant flows ready" "WEB-01"
create_task_issue "WEB-05" "Optimiser accessibilite/performance (objectif Lighthouse > 90)" "website" "WEB" "P1" "M5 - Core participant flows ready" "WEB-01, WEB-03"

# MOB (M3)
create_task_issue "MOB-01" "Initialiser app Ionic Angular dans apps/client/projects/mobile" "mobile-shell" "MOB" "P0" "M3 - Mobile shell ready" "SET-01"
create_task_issue "MOB-02" "Mettre en place navigation shell (tabs/stack) et layout de base" "mobile-shell" "MOB" "P0" "M3 - Mobile shell ready" "MOB-01"
create_task_issue "MOB-03" "Integrer theming, design tokens et composants UI de base" "mobile-shell" "MOB" "P1" "M3 - Mobile shell ready" "MOB-01, LIB-01"
create_task_issue "MOB-04" "Configurer Capacitor (Android/iOS) et builds debug" "mobile-shell" "MOB" "P0" "M3 - Mobile shell ready" "MOB-01"
create_task_issue "MOB-05" "Ajouter service notifications push stub (FCM wiring initial)" "mobile-shell" "MOB" "P1" "M3 - Mobile shell ready" "MOB-04, SET-02"

# AUT (M4)
create_task_issue "AUT-01" "Configurer Supabase Auth (providers, policies de base)" "auth" "AUT" "P0" "M4 - Auth ready" "ARC-04, SET-02"
create_task_issue "AUT-02" "Implementer endpoints API auth/session (NestJS)" "auth" "AUT" "P0" "M4 - Auth ready" "AUT-01, LIB-01"
create_task_issue "AUT-03" "Implementer ecrans login/signup/reset mobile" "auth" "AUT" "P0" "M4 - Auth ready" "MOB-02, AUT-02"
create_task_issue "AUT-04" "Implementer garde routes protegees web/mobile" "auth" "AUT" "P0" "M4 - Auth ready" "AUT-02, LIB-03"
create_task_issue "AUT-05" "Ajouter gestion role participant/admin minimal" "auth" "AUT" "P1" "M4 - Auth ready" "AUT-02, ARC-04"

# DSH (M5)
create_task_issue "DSH-01" "Definir contenu dashboard MVP (cartes, rappels, dernieres actus)" "dashboard" "DSH" "P0" "M5 - Core participant flows ready" "ARC-04"
create_task_issue "DSH-02" "Exposer endpoint dashboard aggregate cote API" "dashboard" "DSH" "P0" "M5 - Core participant flows ready" "SET-02, LIB-01, AUT-02"
create_task_issue "DSH-03" "Implementer vue dashboard mobile" "dashboard" "DSH" "P0" "M5 - Core participant flows ready" "MOB-02, AUT-04, DSH-02"
create_task_issue "DSH-04" "Implementer vue dashboard web participant (si activee MVP)" "dashboard" "DSH" "P1" "M5 - Core participant flows ready" "WEB-01, AUT-04, DSH-02"

# PRG (M5)
create_task_issue "PRG-01" "Definir modele programme/cohorte/statut progression MVP" "programs" "PRG" "P0" "M5 - Core participant flows ready" "ARC-04"
create_task_issue "PRG-02" "Implementer endpoints liste/detail programmes" "programs" "PRG" "P0" "M5 - Core participant flows ready" "SET-02, LIB-01, AUT-02, PRG-01"
create_task_issue "PRG-03" "Implementer ecran mobile liste + detail programme" "programs" "PRG" "P0" "M5 - Core participant flows ready" "MOB-02, PRG-02"
create_task_issue "PRG-04" "Implementer marquage de progression minimale" "programs" "PRG" "P1" "M5 - Core participant flows ready" "PRG-02, LIB-02"
create_task_issue "PRG-05" "Ajouter scenarii de test Given/When/Then programmes" "programs" "PRG" "P1" "M5 - Core participant flows ready" "PRG-03, PRG-04, QAT-01"

# RES (M5)
create_task_issue "RES-01" "Definir taxonomie ressources (type, theme, audience)" "resources" "RES" "P0" "M5 - Core participant flows ready" "ARC-04"
create_task_issue "RES-02" "Implementer endpoints ressources (liste, filtre, detail)" "resources" "RES" "P0" "M5 - Core participant flows ready" "SET-02, LIB-01, AUT-02, RES-01"
create_task_issue "RES-03" "Implementer ecran mobile ressources (recherche/filtre)" "resources" "RES" "P0" "M5 - Core participant flows ready" "MOB-02, RES-02"
create_task_issue "RES-04" "Implementer tracking consultation ressources" "resources" "RES" "P1" "M5 - Core participant flows ready" "RES-02, WEB-04"

# ANN (M5)
create_task_issue "ANN-01" "Definir format annonce et regles de publication MVP" "announcements" "ANN" "P0" "M5 - Core participant flows ready" "ARC-04"
create_task_issue "ANN-02" "Implementer endpoints annonces (feed + detail)" "announcements" "ANN" "P0" "M5 - Core participant flows ready" "SET-02, LIB-01, AUT-02, ANN-01"
create_task_issue "ANN-03" "Implementer flux annonces dans mobile dashboard/feed" "announcements" "ANN" "P0" "M5 - Core participant flows ready" "MOB-02, DSH-02, ANN-02"
create_task_issue "ANN-04" "Ajouter notification push pour annonce prioritaire" "announcements" "ANN" "P1" "M5 - Core participant flows ready" "MOB-05, ANN-02"

# SUP (M5)
create_task_issue "SUP-01" "Implementer endpoint contact/support (API + validation)" "support" "SUP" "P0" "M5 - Core participant flows ready" "SET-02, LIB-01"
create_task_issue "SUP-02" "Integrer formulaire support dans mobile" "support" "SUP" "P0" "M5 - Core participant flows ready" "MOB-02, SUP-01, AUT-04"
create_task_issue "SUP-03" "Integrer formulaire contact site web" "support" "SUP" "P0" "M5 - Core participant flows ready" "WEB-01, SUP-01"
create_task_issue "SUP-04" "Configurer envoi email transactionnel (Resend ou equivalent)" "support" "SUP" "P1" "M5 - Core participant flows ready" "SUP-01"
create_task_issue "SUP-05" "Ajouter suivi et statut basique des demandes support" "support" "SUP" "P1" "M5 - Core participant flows ready" "SUP-01, AUT-05"

# QAT (M6)
create_task_issue "QAT-01" "Definir matrice de couverture (page, composant, comportement)" "qa" "QAT" "P0" "M6 - QA ready" "SET-04, SET-05"
create_task_issue "QAT-02" "Ecrire tests unitaires composants critiques web/mobile" "qa" "QAT" "P0" "M6 - QA ready" "QAT-01, WEB-01, MOB-02"
create_task_issue "QAT-03" "Ecrire tests integration API modules critiques" "qa" "QAT" "P0" "M6 - QA ready" "QAT-01, AUT-02, PRG-02, RES-02, ANN-02, SUP-01"
create_task_issue "QAT-04" "Ecrire E2E Given/When/Then pour parcours coeur participant" "qa" "QAT" "P0" "M6 - QA ready" "QAT-01, AUT-03, DSH-03, PRG-03, RES-03, SUP-02"
create_task_issue "QAT-05" "Realiser campagne regression et corriger blockers" "qa" "QAT" "P0" "M6 - QA ready" "QAT-02, QAT-03, QAT-04"
create_task_issue "QAT-06" "Realiser checks accessibilite/performance pre-pilot" "qa" "QAT" "P1" "M6 - QA ready" "QAT-05, WEB-05"

# DEP (M7)
create_task_issue "DEP-01" "Configurer environnements (dev/staging/pilot)" "deployment" "DEP" "P0" "M7 - Pilot release ready" "SET-07"
create_task_issue "DEP-02" "Mettre en place pipeline deploiement web" "deployment" "DEP" "P0" "M7 - Pilot release ready" "SET-06, WEB-05"
create_task_issue "DEP-03" "Mettre en place pipeline deploiement API" "deployment" "DEP" "P0" "M7 - Pilot release ready" "SET-06, QAT-03"
create_task_issue "DEP-04" "Preparer distribution mobile test (APK/TestFlight interne)" "deployment" "DEP" "P0" "M7 - Pilot release ready" "MOB-04, QAT-04"
create_task_issue "DEP-05" "Finaliser observabilite et alerting minimum" "deployment" "DEP" "P1" "M7 - Pilot release ready" "DEP-02, DEP-03"
create_task_issue "DEP-06" "Rediger runbook incident + rollback + pilot checklist" "deployment" "DEP" "P0" "M7 - Pilot release ready" "DEP-01, DEP-05, QAT-06"
create_task_issue "DEP-07" "Executer go/no-go pilote et publier release pilote" "deployment" "DEP" "P0" "M7 - Pilot release ready" "DEP-02, DEP-03, DEP-04, DEP-06"

echo "All child issue creation commands executed."
```

## Notes

- Si un label n'existe pas encore (`area:*`, `epic:*`, `priority:*`, `status:*`), cree-le avant execution ou adapte la liste de labels.
- Le script cree uniquement les child issues (pas les epics).
- Pour dry-run, commente temporairement les lignes `gh issue create` et garde les `echo` de verification.
