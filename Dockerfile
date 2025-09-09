# Utilise l'image de base Node.js
FROM node:18

# Définit le dossier de travail principal dans le conteneur
WORKDIR /usr/src/app

# Copie tous les fichiers de votre projet dans le conteneur
COPY . .

# Installe pnpm globalement
RUN npm install -g pnpm

# Se déplace dans le sous-dossier 'app' pour installer les dépendances
WORKDIR /usr/src/app/app

# Installe les dépendances du projet
RUN pnpm install

# Expose le port de votre application
EXPOSE 8080

# Définit la commande pour lancer l'application
CMD ["pnpm", "start"]