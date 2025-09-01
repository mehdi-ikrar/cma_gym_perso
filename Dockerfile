# Utilise une image Node.js 18
FROM node:18

# Crée un dossier pour l'application dans le conteneur
WORKDIR /app

# Copie tous les fichiers du projet dans le conteneur
COPY . .

# Déplace le dossier de travail dans le sous-dossier 'src'
# où se trouvent les fichiers package.json et index.js
WORKDIR /app/src

# Installe les dépendances
RUN npm install

# Démarre l'application depuis le dossier 'src'
CMD [ "npm", "start" ]