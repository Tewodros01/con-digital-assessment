# Base Node image
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g pm2
RUN npm install

# Copy source
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port your app listens on
EXPOSE 4500

# Default command (overridden in docker-compose)
CMD ["pm2-runtime", "start", "pm2.config.js", "--env", "production"]
