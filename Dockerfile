FROM node:18

WORKDIR /app

COPY src/package*.json ./   # <-- va chercher ton package.json dans src
RUN npm install

COPY . .

EXPOSE 8080
CMD ["node", "src/index.js"]