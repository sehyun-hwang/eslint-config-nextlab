FROM node:alpine

WORKDIR /mnt
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm \
    && pnpm i --force --frozen-lockfile \
    && pnpm store prune

COPY . .
RUN pnpm test

ENV ESLINT_USE_FLAT_CONFIG=true
CMD ["pnpm", "lint"]
