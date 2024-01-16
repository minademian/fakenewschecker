FROM node:20-alpine as builder
RUN apk update
RUN apk add --no-cache wget libc6-compat
RUN npm install -g pnpm

COPY .npmrc package.json pnpm-lock.yaml ./

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PNPM_HOME:$PATH
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder

COPY . .

RUN pnpm install --frozen-lockfile --prod --ignore-scripts
