FROM node:22

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g pm2
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npm run build

EXPOSE 4500
CMD ["pm2-runtime", "start", "pm2.config.js", "--env", "production"]
