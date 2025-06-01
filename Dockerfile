# Building static site, so we'll start with node:lts
# Copy over package declarations
FROM node:lts AS base
WORKDIR /app
COPY package*.json ./

# install packages
FROM base AS build-deps
RUN npm install

# Copy packages and resources and build the site
FROM base AS astro_build
COPY --from=build-deps /app/node_modules /app/node_modules
COPY . .
RUN npm run build

# Build caddy with dns connector, and reverse proxy labels
FROM caddy:2.9.1-builder-alpine AS builder
RUN xcaddy build \
  --with github.com/caddy-dns/cloudflare \
  --with github.com/lucaslorentz/caddy-docker-proxy/v2

# Copy caddy from builder, and site from astro build
FROM caddy:2.9.1-alpine
# install unmet dependency
RUN apk add nss-tools 
# Copy caddy binary
COPY --from=builder /usr/bin/caddy /usr/bin/caddy
# Clear out folder
RUN rm -rf /usr/share/caddy/*
# Copy built site to clean folder
COPY --from=astro_build /app/dist /usr/share/caddy
# Copy Caddyfile
COPY ./Caddyfile /etc/caddy/Caddyfile
# Format Caddy File
RUN cd /etc/caddy && caddy fmt --overwrite
CMD ["caddy", "docker-proxy"]