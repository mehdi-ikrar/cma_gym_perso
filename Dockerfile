FROM node:18

# Dossier de travail
WORKDIR /app

# Installer les dépendances
COPY src/package*.json ./
RUN npm install

# Copier tout le code
COPY src/ .

# Exposer le port
EXPOSE 3000

# Lancer le serveur
CMD ["node", "index.js"]
