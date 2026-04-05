# =========================
# STAGE 1: BUILD
# =========================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy rest of the code
COPY . .

# Build the app
RUN npm run build


# =========================
# STAGE 2: PRODUCTION
# =========================
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]