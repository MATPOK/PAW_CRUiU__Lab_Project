# frontend/Dockerfile

# ZMIANA: UÅ¼ywamy Node 22 (wymagane przez nowe Vite)
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]