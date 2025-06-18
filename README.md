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
* \[Yarn/NPM] if testing locally

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
* Start PostgreSQL, Redis
* Launch backend on port **4500** in **PM2 cluster mode**

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

* Start both frontend and backend containers.
* Visit http://localhost:3000
* Register two users.
* Open two tabs, log in as different users.
* Start a conversation — messages will be delivered in real-time across tabs.

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

# Start in PM2 (without docker)
pm run start:pm2
```

## Author

**Tewodros Misawoy** — built as part of a technical assessment for **ConDigital**.
