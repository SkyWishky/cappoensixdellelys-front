# ==========================================
# Stage 1: Build Angular frontend
# ==========================================
FROM node:22-alpine AS build

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
FROM nginx:1.27-alpine

# Set default backend URL (overrideable at runtime via BACKEND_URL env var)
ENV BACKEND_URL=http://backend:8080

# Copy compiled Angular single-page application from build stage
COPY --from=build /app/dist/front/browser /usr/share/nginx/html

# Copy Nginx configuration template for dynamic reverse proxy (/api/ -> BACKEND_URL)
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Expose HTTP port
EXPOSE 80

# Healthcheck for container orchestration / Coolify
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
