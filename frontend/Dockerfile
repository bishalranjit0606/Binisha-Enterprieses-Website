# Stage 1: Build React Application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Stage 2: Serve with Nginx for low overhead
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Standard web port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
