FROM node:18

# Créer dossier de travail
WORKDIR /app

# Copier tout ce qu’il faut
COPY src/ ./src/
COPY back/ ./back/

# Installer les deps (depuis src)
WORKDIR /app/src
RUN npm install

# Exposer le port
EXPOSE 3000

# Lancer le serveur
CMD ["npm", "start"]
