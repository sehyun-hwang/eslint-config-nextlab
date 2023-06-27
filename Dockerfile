FROM node:alpine

RUN yarn global add eslint

WORKDIR /mnt
COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm \
    && pnpm i --force --frozen-lockfile

COPY eslint* index.* ./

LABEL org.opencontainers.image.source = "https://github.com/nextlab-ai/public-releases"
ENV ESLINT_USE_FLAT_CONFIG=true
RUN pnpm eslint index.*
