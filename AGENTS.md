# AGENTS.md

## Objectif

Ce dépôt sert à construire **KRAAK**, en priorité son **site web MVP** et, à terme,
ses briques numériques utiles à la présentation de l’organisation, à la prise de
contact, à la valorisation de ses services, et à l’orientation de ses publics.
Ce fichier définit la manière dont les assistants IA doivent opérer dans ce
projet afin que le travail reste focalisé, cohérent, fidèle à l’identité de
KRAAK, et livrable.

Utiliser ce fichier avec :

- `ARCHITECTURE.md` pour les limites techniques
- `TASKS.md` pour l’ordre d’exécution
- `README.md` pour les conventions de structure du dépôt

---

## Stade Actuel Du Projet

État actuel (8 avril 2026) :

- Le dépôt est en **phase d’amorçage / cadrage MVP**.
- Le contexte de marque, les orientations de contenu, et les artefacts de travail
  ou de proposition peuvent exister dans `docs/context/`.
- Le code de production final du site n’est pas encore considéré comme mature ni
  complètement stabilisé.

Les assistants ne doivent pas supposer l’existence d’une base de code déjà
solide ou complète. Il faut d’abord poser des fondations propres.

---

## Garde-Fous Du Périmètre Produit

### MVP (à construire maintenant)

- Site vitrine clair, crédible, responsive et centré sur la mission de KRAAK
- Présentation structurée de KRAAK, de sa vision, de sa mission et de ses valeurs
- Mise en avant des pôles de services : **Formation**, **Gestion de projet**,
  **Conseil en immigration**
- Pages essentielles de conversion : accueil, à propos, services, programmes /
  offres, contact
- Parcours simple de prise de contact, de demande d’information, ou de demande
  d’accompagnement
- SEO de base, accessibilité de base, performance de base, analytics de base
- Éléments de réassurance : approche, différenciation, résultats attendus,
  témoignages ou espaces réservés aux preuves sociales
- Base éditoriale cohérente avec le ton KRAAK : humain, exigeant, tourné vers
  l’impact, l’autonomie, l’ouverture et le leadership de service

### Hors MVP (V1.1+)

- Portail participant complet avec authentification et espace personnel avancé
- Tableau de bord apprenant, progression, historique détaillé, documents privés
- Paiement en ligne complexe, abonnements, ou tunnel commercial avancé
- LMS complet, e-learning riche, suivi de cohortes et logique de certification
- CMS éditorial avancé avec rôles, workflows et publication complexe
- CRM avancé, scoring de leads, automatisations marketing poussées
- Blog / média à volume élevé avec architecture éditoriale complète
- Fonctions d’import, d’analyse de profils, ou toute logique de plateforme métier
- Application mobile ou expérience multi-appareils dédiée

Ne pas faire glisser le périmètre V1.1 dans le MVP sauf demande explicite.

---

## Architecture Par Défaut

Pile cible par défaut :

- Frontend : `Next.js` (App Router) dans `apps/web`
- Système UI : `Tailwind CSS`
- État client : approche `server-first`, état local simple d’abord ; n’ajouter un
  état global que si la complexité le justifie clairement
- Backend / API : `Next.js Route Handlers` ou backend léger dédié uniquement si
  le besoin métier l’exige
- Données / formulaires / stockage : solution minimale d’abord (`Resend`,
  `Formspree`, `Tally`, `Supabase`, ou équivalent) selon le besoin réel du MVP
- CMS / contenu : contenu statique ou fichiers contrôlés par dépôt d’abord ; CMS
  headless uniquement si la fréquence éditoriale l’exige
- Analytics : `Google Analytics`, `Google Search Console`, ou équivalent léger
- Déploiement : `Vercel`
- Email transactionnel : `Resend` (ou équivalent)
- SEO technique : sitemap, metadata, Open Graph, robots, canonicals

Si un choix d’implémentation entre en conflit avec cette base, documenter la
raison et mettre à jour `ARCHITECTURE.md`.

Les assistants doivent considérer l’usage d’un ORM comme **optionnel**, et non
comme défaut :

- Ne pas introduire un ORM par défaut.
- Si un ORM semble nécessaire, s’arrêter, le dire explicitement à l’utilisateur,
  et documenter la décision dans `ARCHITECTURE.md` et `docs/decisions/` avant
  de l’ajouter.

---

## Règles D’Organisation Du Dépôt

- Garder les documents de pilotage des assistants à la racine du dépôt :
  - `AGENTS.md`
  - `ARCHITECTURE.md`
  - `TASKS.md`
  - `README.md`
- Traiter `docs/context/` comme un espace de référence source.
- Mettre les nouvelles spécifications techniques dans `docs/specs/`.
- Mettre les décisions d’architecture / produit dans `docs/decisions/`.
- Mettre les playbooks opérationnels dans `docs/runbooks/`.
- Placer le frontend du site dans `apps/web/`.
- Placer un backend dédié éventuel dans `apps/api/` seulement si un vrai besoin
  apparaît.
- Placer les migrations / politiques SQL dans `supabase/migrations/` lorsqu’un
  PostgreSQL géré par Supabase est utilisé.
- Garder `supabase/functions/` comme espace à utiliser seulement si ce choix est
  réellement retenu par l’architecture validée.
- Si du code partagé devient nécessaire, utiliser :
  - `packages/contracts/` pour les contrats partagés sûrs côté API
  - `packages/api-client/` pour les helpers typés de consommation d’API
  - `packages/domain/` pour la logique métier sans dépendance de framework
- Garder les scripts dans `scripts/`.
- Garder les tests dans `tests/` (intégration et e2e).

---

## Règles De Workflow Git

Workflow Git par défaut dans ce dépôt :

- Traiter `main` comme la seule branche permanente.
- Garder `main` dans un état livrable.
- Utiliser uniquement des branches courtes (`feat/*`, `fix/*`, `chore/*`,
  `docs/*`, `test/*`, `refactor/*`, `ci/*`, `style/*`, `perf/*`, `revert/*`,
  `build/*`).
- Ne pas utiliser de branche `develop` longue durée, de branches d’environnement,
  ni de branches permanentes par application.
- Travailler sur une seule tâche à la fois.
- Garder une portée de branche correspondant à une tâche et fusionner vite.

Flux d’exécution d’une tâche :

1. Récupérer le dernier `main`.
2. Identifier l’item GitHub Project correspondant à la tâche et vérifier d’abord
   que la tâche existe bien dans la liste liée au Project.
3. Si la tâche est absente du Project, créer un nouvel item de Project seulement
   si le travail est vraiment important ou si cela est explicitement demandé.
4. Créer l’issue / l’élément de suivi approprié quand nécessaire.
5. Créer une branche courte pour une seule tâche.
6. Quand l’implémentation commence, convertir l’item brouillon du Project en
   issue GitHub ouverte si nécessaire, puis déplacer l’item en `In Progress`,
   définir `Statut` sur `En cours` et `Status` sur `In Progress`, tout en
   gardant l’issue ouverte.
7. Implémenter le plus petit incrément valide.
8. Exécuter la validation pertinente.
9. Fusionner dans `main`.
10. Pousser `main`.
11. Une fois la fusion / le push réussis, fermer l’issue liée, déplacer l’item du
    Project en `Done`, définir `Statut` sur `Termine` et `Status` sur `Done`,
    tout en gardant les champs d’état alignés.
12. Supprimer la branche temporaire (locale et distante si applicable).

Comportement obligatoire pour les assistants :

- Appliquer ce workflow Git pour chaque tâche d’implémentation sans attendre un
  rappel de l’utilisateur.
- Traiter les mises à jour GitHub Project et GitHub issue comme des étapes
  obligatoires du même workflow, et non comme une administration facultative à
  faire plus tard.
- Ne pas sauter les étapes de branchement, de mise à jour Project / issue, de
  validation, de fusion, de push, ou de nettoyage de branche, sauf si
  l’utilisateur remplace explicitement ce workflow.
- Règle de récupération des changements en suspens : si des fichiers modifiés ou
  non suivis se trouvent sur `main` sans pouvoir y être commités directement
  (protection de branche ou politique de PR), ne jamais forcer ni contourner les
  contrôles. Appliquer systématiquement la séquence suivante :
  1. `git stash -u` pour mettre les changements de côté, y compris les fichiers non suivis.
  2. Créer une branche courte appropriée (`git checkout -b <type>/<sujet>`).
  3. `git stash pop` pour restaurer les changements sur cette branche.
  4. Suivre le protocole normal : commit, push, PR, merge, nettoyage de branche.

### Jalons Git / GitHub À Respecter

- Déclarer la stack technique **après** le cadrage du MVP et **avant** le vrai
  setup du projet.
- Lancer `git init` dès que le dossier local du projet existe et avant les
  premiers changements structurants.
- Créer le dépôt GitHub juste après l’initialisation locale propre et le premier
  commit sain, ou juste avant si le workflow démarre depuis GitHub.
- Créer le GitHub Project lié au dépôt une fois le backlog MVP suffisamment
  défini pour être suivi proprement.

---

## Gestion Des GitHub Projects

Métadonnées du dépôt pour les assistants :

- Propriétaire GitHub : `Ange230700`
- GitHub Project lié (principal) : `#4`

Quand l’accès aux GitHub Projects est disponible :

- garder l’item du projet aligné avec l’état réel du travail
- déplacer l’item en `In Progress` quand le codage commence
- déplacer l’item en `Done` seulement après validation et merge / push vers
  `main`
- si le travail est partiel ou bloqué, le laisser en `In Progress` et indiquer
  pourquoi
- ne pas réécrire en masse des éléments de backlog non liés sauf demande
  explicite

Cycle de vie obligatoire par tâche :

1. Partir d’un item de Project en brouillon.
2. Convertir l’item brouillon en issue GitHub ouverte quand l’implémentation
   commence.
3. Garder l’issue ouverte tant que le travail est en cours.
4. Fermer l’issue seulement après validation et merge / push vers `main`.
5. Mettre à jour le champ personnalisé `Statut` avec cette progression exacte :
   `A faire` -> `En cours` -> `Termine`.
6. Garder le champ natif `Status` aligné en parallèle :
   `Todo` -> `In Progress` -> `Done`.

Ce cycle de vie fait partie de la séquence Git obligatoire ci-dessus et doit être
exécuté dans le même passage que le branchement, la validation, la fusion, le
push, et le nettoyage.

Ce cycle de vie est obligatoire pour chaque tâche par défaut, sans attendre une
instruction explicite de l’utilisateur.

Règle obligatoire supplémentaire :

- si un changement est commité sans être rattaché à un item de suivi précis, les
  assistants doivent quand même mettre à jour ou créer l’item GitHub Project ou
  l’issue GitHub la plus appropriée dans le même passage, dès que le changement
  est assez substantiel pour mériter un suivi

Si l’accès / l’authentification est bloqué, les assistants doivent le dire
clairement au lieu de sauter silencieusement les mises à jour du projet.

---

## Règle TDD (Obligatoire)

Tout travail de fonctionnalité ou de correction de bug doit suivre `RED ->
GREEN -> REFACTOR` pour les tests unitaires et d’intégration.

Flux requis :

1. `RED` : ajouter / mettre à jour un test qui échoue pour le comportement
   attendu manquant.
2. `GREEN` : implémenter le plus petit changement qui fait passer le test.
3. `REFACTOR` : appliquer au moins une étape concrète de refactor tout en gardant
   les tests au vert.

L’étape de refactor est obligatoire, pas optionnelle.

---

## Règle BDD + E2E

Le BDD **n’est pas** atteint par les seuls tests E2E.

Dans ce dépôt, le BDD signifie :

- décrire d’abord le comportement attendu (scénarios, résultats observables par
  l’utilisateur)
- garder la formulation des comportements alignée avec le langage produit et le
  périmètre MVP de KRAAK
- mapper les scénarios critiques vers une couverture E2E exécutable
- écrire au moins un scénario de comportement par flux critique du MVP avec une
  formulation `Given/When/Then` dans le titre ou la description du test

Règle d’outillage E2E :

- utiliser `Playwright` par défaut pour la couverture E2E web
- garder les tests E2E sous `tests/e2e/`
- maintenir au minimum des scénarios smoke des parcours utilisateurs critiques du
  MVP
- garder des noms de scénarios E2E orientés comportement (et non implémentation)

Règle de couverture du client web (obligatoire) :

- Pour chaque fonctionnalité web, valider les pages avec des scénarios E2E
  Playwright.
- Pour chaque fonctionnalité web, valider les composants avec des tests unitaires
  / composants compatibles avec la stack retenue.
- Pour chaque fonctionnalité web, valider les comportements observables côté
  utilisateur avec des assertions explicites.
- Les scénarios de comportement doivent utiliser une formulation `Given/When/Then`
  dans le titre ou la description.
- Une tâche web ne doit pas être marquée terminée si la couverture page,
  composant, et comportement manque pour une fonctionnalité critique.

---

## Politique De Langue (Obligatoire)

Règle de langue de collaboration / travail :

- La communication assistant-utilisateur doit suivre la langue de l’utilisateur.
- Par défaut, dans le contexte KRAAK, le français est la langue privilégiée pour
  le cadrage, le contenu, les retours, les revues, et les mises à jour.

Règle de langue du dépôt (obligatoire, tout le repo) :

- Règle synthétique à appliquer partout : **anglais pour les éléments de code**
  (noms de variables, fonctions, types, classes, fichiers, identifiants,
  schémas techniques) et **français pour le reste** (documentation, specs,
  runbooks, contenus UI, commentaires de code, messages visibles, corps de
  réponses API destinés à l’utilisateur).
- Le **français** est la langue par défaut pour la documentation, les specs, les
  runbooks, les contenus éditoriaux, les textes UI, les labels de formulaires,
  les messages visibles, les commentaires de code, et les corps de réponses API
  destinés à l’utilisateur.
- L’**anglais** est réservé aux éléments techniques de code : noms de variables,
  noms de fonctions, noms de types, noms de classes, noms de fichiers,
  identifiants, clés techniques, schémas techniques, et termes d’architecture.
- Les noms propres techniques (frameworks, bibliothèques, commandes, standards)
  restent dans leur forme officielle.

Pour **tout travail sous `apps/web` et `apps/api`**, les assistants doivent
appliquer cette politique strictement, y compris dans les réponses API et les
commentaires.

Cette règle est obligatoire pour l’assistant IA dans ce dépôt.

---

## Modèle De Travail Pour Les Agents

1. Prendre exactement une tâche dans `TASKS.md`.
2. Confirmer que la tâche reste compatible avec le MVP (sauf si l’utilisateur
   demande explicitement du V1.1+).
3. Implémenter le plus petit incrément viable.
4. Ne valider que ce qui est pertinent pour cet incrément.
5. Mettre à jour la documentation si l’architecture, le comportement, ou l’ordre
   d’exécution change.
6. Rapporter clairement : ce qui a changé, comment cela a été validé, et ce qu’il
   reste à faire.

### Non-négociables

- Garder les changements petits et réversibles.
- Préférer des contrats explicites à un couplage implicite.
- Ne pas introduire d’infrastructure supplémentaire “au cas où”.
- Garder l’expérience web simple, claire, crédible, mobile-first, et orientée
  conversion utile.
- Préserver le ton KRAAK : humain, rigoureux, ambitieux, accessible, ouvert sur
  le monde, et tourné vers l’impact concret.
- Faire en sorte que chaque composant ou page serve un objectif clair : informer,
  orienter, rassurer, ou déclencher une action utile.
- Appliquer le TDD obligatoire (`RED -> GREEN -> REFACTOR`) avec au moins une
  étape de refactor.
- Traiter le BDD comme piloté par le comportement et vérifier les scénarios clés
  avec des E2E Playwright.
- S’assurer que chaque tâche web critique comprend une couverture page,
  composant, et comportement.
- Respecter la politique de langue contenu français / code anglais dans tout le
  dépôt.
- Faire en sorte que les composants UI implémentés ou adaptés restent cohérents
  avec l’identité visuelle de KRAAK, sa lisibilité, sa crédibilité et son ton.
- Lorsqu’une route API est ajoutée ou mise à jour, mettre à jour la documentation
  OpenAPI / Swagger dans le même changement si une couche API documentée existe.
- Ne pas étendre silencieusement le périmètre.

---

## Attentes De Validation

Avant de marquer le travail comme terminé :

- exécuter les vérifications les plus pertinentes pour les zones touchées
- vérifier manuellement le comportement cœur si l’automatisation n’est pas encore
  disponible
- indiquer clairement ce qui n’a pas pu être validé

Pour les corrections de bug, préférer :

1. Reproduire
2. Corriger
3. Re-vérifier

---

## Attentes De Documentation

Mettre à jour la documentation dans le même changement lorsque vous modifiez :

- les frontières d’architecture
- le comportement / les contrats API
- les hypothèses de modèle de données
- le séquencement des tâches
- les attentes d’environnement et de déploiement

La documentation doit rester concise, pratique, et orientée implémentation.

### Règle De Rendu Mermaid (Obligatoire)

Pour tout deck Marp dans `docs/context/*.marp.md` qui contient des blocs Mermaid :

1. Rendre les diagrammes Mermaid en assets image (`.svg` préféré, `.png`
   autorisé) dans `docs/context/mermaid-artefacts/`.
2. Remplacer les blocs de code Mermaid par des références d’images Markdown avant
   de générer les exports finaux.
3. Générer les `.pdf` et `.pptx` uniquement à partir du fichier Marp basé sur les
   images (sans blocs Mermaid bruts restants).
4. Si l’accès local aux assets Marp est requis, utiliser `--allow-local-files`
   lors de l’export.

Cette règle est obligatoire pour chaque export de deck afin que les sorties de
présentation restent déterministes d’un environnement à l’autre.

---

## Définition De Terminé

Une tâche n’est terminée que lorsqu’un mainteneur peut répondre à :

- ce qui a changé
- pourquoi cela a changé
- comment cela a été validé
- si le périmètre est resté dans les limites du MVP / de la tâche
- quelle est la prochaine étape concrète
- si le workflow git a été entièrement exécuté pour la tâche
- si le cycle de vie issue + Project a bien atteint `Closed` + `Termine` (`Done`)
