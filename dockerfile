FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

RUN npx prisma generate
RUN npm run build

EXPOSE 8000
CMD ["sh", "-c", "npx prisma migrate dev --name init && npm start"]
