FROM node:alpine

WORKDIR /mnt
COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm \
    && pnpm i --force --frozen-lockfile

COPY eslint* index.* ./

ENV ESLINT_USE_FLAT_CONFIG=true
RUN pnpm eslint index.*
