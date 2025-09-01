FROM node:18

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port attendu par Cloud Run
EXPOSE 8080

# Lancer ton app
CMD ["node", "src/index.js"]
