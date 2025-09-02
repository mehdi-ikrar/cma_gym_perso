#!/bin/sh

# Exécute la réinitialisation de la base de données (sync et seed)
echo "Resetting and seeding the database..."
npm run db:reset

# Démarre l'application
echo "Starting the application..."
npm run start
