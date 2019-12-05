FROM node:lts AS build

WORKDIR /build

COPY . .

ENV CI true

RUN yarn install --frozen-lockfile && yarn ci

FROM node:lts-alpine AS base

WORKDIR /app

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#environment-variables
ENV NODE_ENV production

COPY --from=build build/dist dist

COPY --from=build \
    build/.env.defaults \
    build/.npmrc \
    build/.yarnclean \
    build/package.json \
    build/schema.graphql \
    build/yarn.lock ./

RUN yarn install --frozen-lockfile --no-cache --production

EXPOSE 4000

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

ENTRYPOINT node dist/index.js
