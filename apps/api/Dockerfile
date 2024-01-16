FROM node:20-alpine as build

RUN npm install -g pnpm

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system api && adduser --system -G api api
RUN chown -R api:api .

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm --frozen-lockfile install
COPY . ./
RUN pnpm run build:api -- --output-path ./build

CMD [ "node", "build/main.js" ]
