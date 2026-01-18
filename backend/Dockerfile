# backend/Dockerfile

# ZMIANA: Używamy Node 22
FROM node:22-alpine

WORKDIR /app

# ZMIANA: Instalujemy OpenSSL (niezbędne dla Prisma w Alpine Linux)
RUN apk add --no-cache openssl

COPY package*.json ./

# Instalacja zależności
RUN npm install

COPY . .

# Generowanie klienta Prismy
RUN npx prisma generate

EXPOSE 3000

CMD [  "sh", "-c", "npx prisma migrate deploy && npm run start:dev" ]