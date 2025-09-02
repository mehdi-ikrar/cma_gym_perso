# Utilise une image Node.js 18
FROM node:18

# Crée un dossier pour l'application dans le conteneur
WORKDIR /app

# Copie tous les fichiers du projet dans le conteneur
COPY . .

# Déplace le dossier de travail dans le sous-dossier 'src'
# où se trouvent les fichiers package.json et index.js
WORKDIR /app/src

# Donne les permissions d'exécution au script
RUN chmod +x ../entrypoint.sh

# Installe les dépendances
RUN npm install

# Indique à Docker d'exécuter le script d'entrée au démarrage du conteneur
CMD [ "../entrypoint.sh" ]
