# Guide De Rework Du GitHub Project

## Board Actif

- GitHub Project principal : `#6 - KRAAK MVP - Product Backlog`
- Proprietaire : `@me` / `Ange230700`
- Depot : `Ange230700/kraak-group`
- Mise a jour : 10 avril 2026

---

## Diagnostic Actuel

Constat releve sur le board live :

- le project contient `43` items au total
- `38` items proviennent de l'ancien backlog web-only (`#1` a `#38`)
- seulement `5` items du backlog MVP canonique y sont presents (`#70` a `#74`)
- `45` issues MVP recentes manquent encore du board

Conclusion :

- le board n'est plus une source de verite exploitable pour travailler a deux
- il melange un ancien plan centré site web et un backlog MVP plus large
- il faut **cesser de piloter en parallele deux familles d'issues**

Source canonique a retenir des maintenant :

- backlog metier : `docs/specs/BACKLOG.md`
- projection board duo : `docs/specs/github_project_import_parallel_duo.csv`
- famille d'issues canonique : `[EPIC][ID]` et `[TASK][ID]`

Les anciennes issues `#1` a `#38` ne doivent plus servir de plan principal.

---

## Objectif Du Rework

Le board doit devenir lisible pour deux personnes qui travaillent en parallele
avec un minimum de dependances implicites.

Le principe retenu :

- `Lane A - Web public` : site vitrine, conversion, SEO, contact web
- `Lane B - Platform & participant` : packages, API, auth, mobile, parcours
  participant
- `Shared handoff` : cadrage, contrats, quality gates, release

Une dependance acceptable doit ressembler a :

- un contrat publie
- un endpoint stable
- une route ou un shell disponible
- un check de qualite commun

Une dependance non acceptable doit ressembler a :

- "attendre que tout l'epic soit fini"
- "attendre tout le frontend"
- "attendre tout le backend"

---

## Champs Board Cibles

### Champs deja presents

- `Status`
- `Priority`
- `Area`
- `Effort`
- `Launch blocker`

### Champs board duo

Ces champs ont ete crees sur le project `#6` le `10 avril 2026`.

- `Lane` (`SINGLE_SELECT`)
  - `Lane A - Web public`
  - `Lane B - Platform & participant`
  - `Shared handoff`
- `Surface` (`SINGLE_SELECT`)
  - `docs`
  - `shared`
  - `api`
  - `web`
  - `mobile`
  - `qa`
  - `ops`
- `Coupling` (`SINGLE_SELECT`)
  - `independent`
  - `handoff`
  - `paired`
  - `portfolio`
- `Wave` (`SINGLE_SELECT`)
  - `Wave 0 - Cadrage`
  - `Wave 1 - Socle`
  - `Wave 2 - Acces`
  - `Wave 3A - Site public`
  - `Wave 3B - Parcours participant`
  - `Wave 4 - Qualite`
  - `Wave 5 - Release`

Usage attendu :

- `Lane` = qui peut avancer dessus sans attendre l'autre
- `Surface` = ou se fait le changement principal
- `Coupling` = niveau de coordination requis
- `Wave` = ordre macro d'execution

---

## Vues Recommandees

### 1. `Master backlog`

Filtres :

- tous les items canoniques `[EPIC]` et `[TASK]`

Tri :

1. `Wave`
2. `Priority`
3. `Effort`

### 2. `Lane A - Web public`

Filtres :

- `Lane = Lane A - Web public`
- `Status != Done`

### 3. `Lane B - Platform & participant`

Filtres :

- `Lane = Lane B - Platform & participant`
- `Status != Done`

### 4. `Shared handoff`

Filtres :

- `Lane = Shared handoff`
- `Status != Done`

But :

- surveiller les points de passage courts
- eviter qu'une tache shared reste ouverte trop longtemps

### 5. `Ready now`

Filtres :

- `Status = Todo` ou `Status = In Progress`
- `Coupling != paired`

But :

- faire emerger les prochaines taches qui n'ont pas besoin d'un travail en duo

### 6. `Release critical`

Filtres :

- `Launch blocker = Yes` si ce champ est utilise
- sinon `Priority = P0`

---

## Mapping De Travail Recommande

### Lane A - Web public

- `WEB-*`
- `SUP-03`
- `DSH-04` si la variante web participant est confirmee

### Lane B - Platform & participant

- `MOB-*`
- `AUT-*`
- `DSH-*` sauf `DSH-04`
- `PRG-*`
- `RES-*`
- `ANN-*`
- `SUP-01`
- `SUP-02`
- `SUP-04`
- `SUP-05`

### Shared handoff

- `ARC-*`
- `SET-*`
- `LIB-*`
- `QAT-*`
- `DEP-*`

Regle pratique :

- un item `Shared handoff` doit idealement debloquer une lane sous `24h`
- si un item shared grossit, il faut le re-decouper avant de le lancer

---

## Migration Recommandee

### Etape 1 - Geler l'ancien plan comme archive

Ne plus ajouter de nouveaux mouvements de pilotage sur les anciennes issues
`#1` a `#38`.

### Etape 2 - Garder une seule famille d'issues actives

Conserver comme reference active :

- epics `[EPIC][ID]`
- tasks `[TASK][ID]`

### Etape 3 - Purger le board des items legacy

Retirer du project les anciennes issues `#1` a `#38` une fois la bascule
confirmee.

Commande type :

```bash
gh project item-delete 6 --owner "@me" --id <project-item-id>
```

### Etape 4 - Ajouter les issues canoniques manquantes

Ajouter toutes les issues MVP qui ne sont pas encore dans le project.

Commande type :

```bash
gh project item-add 6 --owner "@me" --url https://github.com/Ange230700/kraak-group/issues/75
```

### Etape 5 - Renseigner les champs duo

Renseigner `Lane`, `Surface`, `Coupling`, `Wave` a partir de
`docs/specs/github_project_import_parallel_duo.csv`.

Commande type :

```bash
gh project item-edit \
  --id <item-id> \
  --project-id <project-id> \
  --field-id <field-id> \
  --single-select-option-id <option-id>
```

### Etape 6 - Aligner le cycle de vie

Pour chaque tache :

- `Status` : `Todo -> In Progress -> Done`
- issue : `Open -> Closed`
- board : aligner le meme jour que le merge vers `main`

---

## Regles De Coordination A Deux

- ne pas prendre en meme temps deux taches qui modifient le meme module
  principal
- preferer `contrat -> endpoint -> UI -> tests` plutot que deux personnes dans
  le meme fichier
- si une tache touche `packages/*`, considerer qu'elle est `Shared handoff`
- si une tache web depend d'une API, la tache UI doit commencer sur mock,
  structure, et etats avant le branchement final
- si un item reste `In Progress` plus de deux jours sans merge, il est
  probablement trop gros

---

## Artefact A Utiliser

Le fichier a utiliser pour la reimportation ou la remise a plat du board est :

- `docs/specs/github_project_import_parallel_duo.csv`

Il ajoute une lecture operationnelle en plus du backlog :

- `Lane`
- `Surface`
- `Coupling`
- `Wave`

---

## Decision Operatoire

Par defaut :

- backlog thematique dans `docs/specs/BACKLOG.md`
- board live pilote en `Lane A / Lane B / Shared handoff`
- aucune nouvelle tache ne doit etre creee dans l'ancien format web-only

Cette organisation est celle qui minimise les dependances entre deux
collaborateurs sans etendre le scope du MVP.
