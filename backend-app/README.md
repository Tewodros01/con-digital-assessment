# 🧠 Real-Time Chat Application

This is a full-stack real-time chat application built with:

- ⚙️ **Backend**: NestJS + Socket.IO + Prisma ORM
- 🌐 **Frontend**: React + Zustand + React Query
- 💬 **WebSockets**: Socket.IO (Redis adapter ready)
- 🗃️ **Database**: PostgreSQL
- 🔁 **Redis**: For message broker across instances
- 🧵 **PM2**: Runs the backend in cluster mode
- 🐳 **Docker**: Fully dockerized setup

---

## 📸 Preview

![Chat Screenshot](./screenshots/chat-ui.png)
![Terminal Logs](./screenshots/terminal-logs.png)

---

## 🚀 Features

- 🔐 User registration & login
- 🗣️ 1-on-1 private messaging
- ⚡ Real-time updates with Socket.IO
- 📡 Redis adapter support (multi-instance socket sync)
- 🧩 Modular NestJS codebase
- 🐳 Docker + PM2 for production scalability

---

## 🧰 Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React, Zustand, React Hook Form     |
| Backend    | NestJS, Socket.IO, Prisma ORM       |
| Database   | PostgreSQL                          |
| Realtime   | Redis + Socket.IO Redis Adapter     |
| Deployment | Docker, Docker Compose, PM2 Cluster |
