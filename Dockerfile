FROM node:alpine

WORKDIR /mnt
COPY package.json yarn.lock ./

RUN yarn --ignore-scripts

COPY typescript.eslint.json eslint.json index.* ./

RUN yarn eslint -c eslint.json index.*