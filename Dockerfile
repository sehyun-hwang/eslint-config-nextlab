FROM node:alpine

RUN yarn global add eslint

WORKDIR /mnt
COPY package.json yarn.lock ./

RUN yarn --ignore-scripts

COPY .eslint.json index.js ./

RUN eslint -c .eslint.json index.js