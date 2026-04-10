# -------------------------------------------------------------------
# Image Docker multi-étapes pour @kraak/api (NestJS)
# Contexte de build : racine du dépôt (docker build -f apps/api/Dockerfile .)
# -------------------------------------------------------------------

# --- Base commune : Node 24 Alpine + pnpm ---
FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate
WORKDIR /app

# --- Étape 1 : installation des dépendances ---
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json apps/api/
COPY apps/client/package.json apps/client/
RUN pnpm install --frozen-lockfile

# --- Étape 2 : build TypeScript ---
FROM deps AS build
COPY apps/api/ apps/api/
RUN pnpm --filter @kraak/api build
RUN pnpm deploy --filter @kraak/api --prod --legacy /prod/api

# --- Étape 3 : image de production ---
FROM node:24-alpine AS production

RUN addgroup -g 1001 -S nestjs && adduser -S nestjs -u 1001

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /prod/api/node_modules ./node_modules
COPY --from=build /prod/api/package.json ./
COPY --from=build /app/apps/api/dist ./dist

USER nestjs
EXPOSE 3000

CMD ["node", "dist/src/main.js"]
