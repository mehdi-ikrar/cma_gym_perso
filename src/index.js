import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 Starting CMA_GYM app...');

// Vérification des imports
let router, checkAuth;
try {
  router = (await import('./back/route/index_router.js')).router;
  checkAuth = (await import('./back/middlewares/checkAuth.js')).checkAuth;
} catch (err) {
  console.error('❌ Import failed:', err);
  process.exit(1); // quitte le conteneur si un import plante
}

let cookieParser;
try {
  cookieParser = (await import('cookie-parser')).default;
} catch (err) {
  console.error('❌ Failed to import cookie-parser:', err);
  process.exit(1);
}

// Obtenir __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
console.log('✅ Express app created.');

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'front/public')));

// Configuration CORS (en prod, remplacer '*' par le domaine de ton Cloud Run)
app.use(cors({
  origin: '*', 
  credentials: true,
}));

// Parser cookies
app.use(cookieParser());

// Parser le corps des requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware d'authentification
app.use(checkAuth);

// Routes
app.use(router);

// Démarrage du serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 CMA_GYM app listening on port ${PORT}`);
});

export { app };
