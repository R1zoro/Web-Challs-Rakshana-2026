FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

RUN chown -R node:node /app
USER node

EXPOSE 5000

CMD ["node", "server.js"]
