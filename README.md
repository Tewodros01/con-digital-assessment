# Real-Time Chat Application

This project is a full-stack real-time chat application built using **NestJS**, **React**, **Socket.IO**, **Prisma ORM**, **PM2 (Cluster Mode)**, and **Docker**. It supports private one-on-one messaging with room-based socket communication.

---

## Features

* Realtime chat using Socket.IO
* Private rooms with unique IDs
* PostgreSQL for data persistence
* Redis for pub/sub in multi-instance environments
* NestJS backend with Prisma ORM
* React frontend with Zustand store
* PM2 cluster mode support for scalability
* Fully Dockerized environment

---

## Technologies Used

* **Backend:** NestJS, Prisma, PostgreSQL, Redis, PM2
* **Frontend:** React, React Router, Zustand, React Hook Form, Tailwind CSS
* **Realtime:** Socket.IO (Redis Adapter)
* **DevOps:** Docker, Docker Compose, PM2

---

## Setup Instructions

### 1. Prerequisites

* [Docker](https://docs.docker.com/get-docker/) installed
* [Node.js](https://nodejs.org/) (for local dev only)
* Yarn/NPM if testing locally

---

### 2. Clone the Repository

```bash
git clone https://github.com/Tewodros01/con-digital-assessment.git
cd con-digital-assessment
```

---

### 3. Environment Configuration

All required environment variables are configured in the `docker-compose.yml` and passed to services:

```env
DATABASE_URL=postgres://user:pass@postgres:5432/chat
REDIS_URL=redis://redis:6379
PORT=4500
```

> If you're using `.env`, make sure to map these correctly in NestJS config service.

---

### 4. Build and Run with Docker

```bash
docker-compose up --build
```

This will:

* Build the backend image
* Launch PostgreSQL, Redis
* Start backend with PM2 cluster mode on port 4500
* Start the frontend on port 3000**

---

### 5. Apply Migrations

After containers are up:

```bash
docker exec -it chat-backend npx prisma migrate deploy
```

---

### 6. PM2 Cluster Mode Config

Your `pm2.config.js` file:

```js
// pm2.config.js
module.exports = {
  apps: [
    {
      name: 'main',
      script: 'dist/src/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 4500,
      },
    },
  ],
};
```

---

### 7. Testing Real-Time Chat

1. Start all services using Docker:

   ```bash
   docker-compose up --build
   ```

2. Open your browser and visit:

   ```
   http://localhost:3000
   ```

3. Register two different users using either:
   - Two separate tabs
   - Or one tab + an incognito window

4. After each registration, refresh the home page to view the newly registered users.

5. Use each tab to select a different user and initiate a conversation.

---

## Troubleshooting

* **Cannot connect to DB:** Ensure `postgres` service is running
* **Chat not working:** Make sure Redis is running for Socket.IO adapter
* **Duplicate user error:** Prisma will throw on `username` or `email` uniqueness

---

## Scripts

```bash
# Start development locally
npm run start:dev

# Build production
npm run build

# Start with PM2 (no Docker)
pm2 start pm2.config.js
```

## Author

**Tewodros Misawoy** — built as part of a technical assessment for **ConDigital**.
