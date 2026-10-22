# ==========================================
# Stage 1: Build Angular frontend
# ==========================================
FROM node:22.22.3-alpine3.22 AS build

WORKDIR /app

# Copy dependency manifests first for Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy full frontend source and build for production
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Runtime Nginx with envsubst
# ==========================================
FROM nginxinc/nginx-unprivileged:1.29.8-alpine3.23

# Apply available Alpine security updates to the runtime image.
USER root
RUN apk upgrade --no-cache
USER nginx

# Nginx runs as the image's unprivileged user and listens above port 1024.
ENV BACKEND_URL=http://backend:8080 \
    PORT=8080

# Copy compiled Angular single-page application from build stage
COPY --from=build /app/dist/front/browser /usr/share/nginx/html

# Copy Nginx configuration template for dynamic reverse proxy (/api/ -> BACKEND_URL)
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Expose HTTP port
EXPOSE 8080

# Healthcheck for container orchestration / Coolify
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
