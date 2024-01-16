FROM node:20-alpine as build

RUN npm install -g pnpm

WORKDIR /app
COPY apps/chatbot/nginx.conf ./
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
RUN npx nx reset
RUN mkdir -p .nx-cache
COPY . ./
RUN pnpm run build:chatbot

FROM nginx:stable-alpine
COPY --from=build /app/dist/apps/chatbot /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
