console.log('--- Démarrage de l\'application ---');

import express from 'express';
console.log('Express importé.');

import { router } from './back/route/index_router.js';
console.log('Routeur importé.');

import cors from 'cors';
console.log('CORS importé.');

import path from 'path';
import { fileURLToPath } from 'url';
console.log('Modules de chemin importés.');

import cookieParser from 'cookie-parser';          
console.log('Cookie-parser importé.');

import { checkAuth } from './back/middlewares/checkAuth.js'; 
console.log('Middleware d\'authentification importé.');

// Obtenir __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Chemins configurés.');

const app = express();
console.log('Application Express créée.');

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('Moteur de template EJS configuré.');

// Fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'front/public')));
console.log('Fichiers statiques configurés.');

// Configuration CORS
app.use(cors());
console.log('CORS configuré.');

app.use(cookieParser());
console.log('Cookie-parser activé.');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log('Parsers de requête activés.');

app.use(checkAuth);
console.log('Middleware d\'authentification activé.');

app.use(router);
console.log('Routeur principal activé.');

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`🚀 CMA_GYM app started at http://localhost:${PORT}`);
});
console.log('Serveur en écoute. (Cette ligne ne s\'affichera que si le serveur démarre)');

export { app, server };