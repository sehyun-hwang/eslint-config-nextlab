FROM node:alpine

RUN yarn global add eslint

WORKDIR /mnt
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm \
    && pnpm i --force --frozen-lockfile \
    && pnpm store prune

COPY . .
RUN pnpm test

LABEL org.opencontainers.image.source = "https://github.com/nextlab-ai/public-releases"
ENV ESLINT_USE_FLAT_CONFIG=true
CMD ["pnpm", "lint"]
