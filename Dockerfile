# Utilise une image Node.js 18
FROM node:18

# Crée un dossier pour l'application dans le conteneur
WORKDIR /app

# Copie uniquement le fichier des dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du projet
COPY . .

# Démarre l'application
CMD [ "npm", "start" ]