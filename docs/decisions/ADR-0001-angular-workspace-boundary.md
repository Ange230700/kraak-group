# ADR-0001 - Frontend boundary: single Angular workspace

- Date: 2026-04-09
- Status: Accepted

## Contexte

Le dépôt doit supporter un site web et une application mobile sans créer un mélange UI difficile à maintenir.

## Décision

Utiliser un workspace Angular unique dans `apps/client` avec:

- `projects/web` pour le site (Angular + PrimeNG)
- `projects/mobile` pour le mobile (Angular + Ionic + Capacitor)
- `projects/shared/{core,ui,data-access,models,utils}` pour le partage

Conserver `apps/api` (NestJS) pour l'API.

## Raisons

- Une frontière frontend claire et unique.
- Séparation nette des surfaces UI web/mobile.
- Réutilisation de logique métier via bibliothèques partagées.
- Évolutivité sans couplage visuel entre PrimeNG et Ionic.

## Conséquences

- Les builds frontend sont séparés par projet (`web`, `mobile`).
- Le MVP cible prioritairement `projects/web` + `apps/api`.
- Toute exception future doit être documentée dans une nouvelle ADR.
