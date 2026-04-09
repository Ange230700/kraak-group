# Guide De Mise En Place Et De Pilotage Du GitHub Project

## GitHub Project #6 : KRAAK MVP - Product Backlog

- URL : https://github.com/users/Ange230700/projects/6
- Dépôt : Ange230700/kraak-group
- Portée : backlog MVP KRAAK (épopées + tâches)

---

## Configuration Rapide

### Labels cibles

- Statut : `status: backlog`, `status: ready`, `status: in-progress`, `status: review`, `status: done`
- Priorite : `priority: critical`, `priority: high`, `priority: medium`, `priority: low`
- Type : `type: epic`, `type: feature`, `type: bug`, `type: chore`

### Jalons cibles

1. Scope locked
2. Design approved
3. Content ready
4. Development complete
5. QA complete
6. Launch

### Structure backlog

- 8 épopées
- 30 tâches
- 38 issues au total

---

## Utilisation Quotidienne Du Board

### Création d'une issue

```bash
gh issue create \
  --title "[Nom epopee] Action specifique" \
  --body "Contexte, criteres d'acceptation, definition de fini" \
  --label "type: feature,priority: high,status: backlog" \
  --milestone "Development complete"
```

### Ajout manuel au projet (si nécessaire)

```bash
# Recuperer le node_id de l'issue
gh api repos/Ange230700/kraak-group/issues/42 --jq .node_id -q

# Ajouter l'issue au projet
gh project item-add 6 --owner Ange230700 --id <node_id>
```

### Mise à jour du statut

```bash
gh issue edit 42 --add-label "status: in-progress" --remove-label "status: backlog"
```

---

## Cycle de statut recommandé

1. `Backlog` : travail non démarré
2. `Ready` : prerequis leves, pret a etre lance
3. `In Progress` : implementation en cours
4. `Review` : en revue fonctionnelle/technique
5. `Done` : fusionne, verifie, clos

Règle pratique : chaque passage de colonne doit aussi etre reflechi dans les labels et le commentaire d'avancement.

---

## Carte De Reference Des Epopees

| Epopee | Issues | Priorite | Jalon | Responsable |
| --- | --- | --- | --- | --- |
| Contenu | #9-11 | Critique | Content ready | Content Lead |
| Design | #12-14 | Critique | Design approved | Design Lead |
| Setup frontend | #15-19 | Critique | Development complete | Frontend Lead |
| Pages | #20-24 | Critique | Development complete | Frontend Team |
| Formulaires | #25-27 | Critique | Development complete | Backend + Frontend |
| SEO | #28-31 | Haute | Development complete | Frontend + DevOps |
| QA | #32-34 | Haute | QA complete | QA Team |
| Deploiement | #35-38 | Haute | Launch | DevOps |

---

## Organisation Kanban

Colonnes recommandees :

1. Backlog
2. Ready
3. In Progress
4. Review
5. Done

Bonnes pratiques :

- Déplacer les cartes au fil de l'execution, pas en fin de semaine.
- Conserver une seule source de vérité : issue + labels + board alignes.
- Ajouter le lien de PR dans l'issue des l'ouverture.

---

## Commandes Utiles

### Lister les issues ouvertes

```bash
gh issue list --state open
```

### Filtrer par milestone

```bash
gh issue list --milestone "Development complete"
```

### Filtrer par labels

```bash
gh issue list --label "type: epic,status: backlog"
```

### Verifier le projet

```bash
gh project view 6 --owner Ange230700
```

---

## Revue Hebdomadaire (Template)

```markdown
## Semaine X

### Termine (Done)
- [ ] Issue #X - Intitule

### En cours (In Progress)
- [ ] Issue #Y - avancement + blocages

### Bloque
- [ ] Issue #Z - raison + aide requise

### Focus semaine suivante
- [ ] Issue #A
- [ ] Issue #B

### Indicateurs
- Issues terminees : X
- Bloquants critiques : Y
- Trajectoire MVP : Oui/Non
```

---

## Chemin Critique A Surveiller

1. Contenu pret -> design valide
2. Setup frontend -> implementation des pages
3. Pages + formulaires -> SEO -> QA -> deploiement

Questions de controle :

- Les sujets critiques avancent-ils cette semaine ?
- Un blocage depasse-t-il 24h sans plan de sortie ?
- Le board reflete-t-il l'etat reel ?

---

## FAQ

### Comment changer le milestone d'une issue ?

```bash
gh issue edit <numero> --milestone "<nouveau milestone>"
```

### Peut-on faire des sous-tâches natives ?
GitHub ne gere pas les sous-tâches natives comme Jira. Utiliser des issues liees avec references explicites (`depends on #X`, `blocks #Y`).

### Quand fermer une issue ?
Quand la PR est fusionnee, les criteres d'acceptation verifies et la fonctionnalite disponible sur `main`.

---

## Support

- Docs GitHub Projects : https://docs.github.com/en/issues/planning-and-tracking-with-projects
- Docs GitHub Issues : https://docs.github.com/en/issues
- Reference GitHub CLI : https://cli.github.com/manual/

Derniere mise a jour : 9 avril 2026
