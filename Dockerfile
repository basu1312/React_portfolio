# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm install

COPY . .
RUN pnpm build

# Serve stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]