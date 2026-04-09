# ARCHITECTURE.md

## Objectif

Ce document verrouille l'architecture cible du dépôt KRAAK et sert de référence prioritaire pour l'implémentation.

## Décision Verrouillée (9 avril 2026)

La frontière frontend est un **seul workspace Angular** dans `apps/client`, avec deux applications distinctes et des bibliothèques partagées.

### Structure cible

```txt
/
├─ apps/
│  ├─ client/                                # Angular workspace unique
│  │  ├─ projects/
│  │  │  ├─ web/                             # Angular + PrimeNG
│  │  │  ├─ mobile/                          # Angular + Ionic + Capacitor
│  │  │  └─ shared/
│  │  │     ├─ core/
│  │  │     ├─ ui/
│  │  │     ├─ data-access/
│  │  │     ├─ models/
│  │  │     └─ utils/
│  │  ├─ angular.json
│  │  └─ package.json
│  └─ api/                                   # NestJS
├─ docs/
│  ├─ context/
│  ├─ specs/
│  ├─ runbooks/
│  └─ decisions/
├─ supabase/
│  ├─ migrations/
│  └─ functions/
├─ pnpm-workspace.yaml
└─ package.json
```

## Règles de frontière UI

- `projects/web` utilise PrimeNG comme couche de composants principale.
- `projects/mobile` utilise Ionic + Capacitor.
- Les composants web et mobile ne doivent pas être forcés dans une même surface UI.
- Le partage se fait via `projects/shared/*` (logique, modèles, utilitaires, data access), pas via un couplage visuel inadapté.

## Règles de backend et données

- `apps/api` reste le backend NestJS.
- Supabase reste la couche data/auth/storage.
- Resend reste la couche email transactionnel.

## Impacts CI/CD

- Build web: `apps/client/projects/web`
- Build mobile: `apps/client/projects/mobile`
- Déploiement web: Vercel
- Déploiement API: Render

## Portée MVP

- MVP priorise `projects/web` + `apps/api`.
- `projects/mobile` est préparé par structure, sans imposer un scope V1.1 dans l'exécution MVP.

## Gouvernance

- Toute modification de cette décision doit être documentée dans `docs/decisions/`.
- En cas de conflit entre documents, ce fichier fait foi pour les limites techniques.
