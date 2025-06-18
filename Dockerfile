FROM node:18

# Dossier de travail
WORKDIR /app

# Installer npm (optionnel ici car Node 18 l’a déjà, mais ok)
RUN npm install -g npm

# Copier le package.json (s’il est dans src — sinon adapte)
COPY src/package*.json ./src/

# Copier le back aussi car il est utilisé par src
COPY back/ ./back/

# Copier le code de src
COPY src/ ./src/

# Installation des dépendances
WORKDIR /app/src
RUN npm install

# Exposer le port
EXPOSE 3000

# Lancement
CMD ["npm", "start"]
