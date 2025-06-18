# Stage 1: Build React app
FROM node:22 AS builder

WORKDIR /app

# Copy only the necessary files first for better caching
COPY package*.json ./

RUN npm install

# Copy the rest of the project
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to Nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Replace default nginx config if you want SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
