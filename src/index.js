import 'dotenv/config';
import express from 'express';
import { router } from './back/route/index_router.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';          // <-- Import cookie-parser
import { checkAuth } from './back/middlewares/checkAuth.js'; // <-- Import middleware

// Obtenir __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fichiers statiques (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'front/public')));

// Configuration CORS
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true, // Autorise l'envoi de cookies
}));

// Pour parser les cookies AVANT d'utiliser checkAuth
app.use(cookieParser());

// Pour parser le corps des requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware global pour checker l'authentification et injecter admin dans res.locals
app.use(checkAuth);

// Toutes les routes de ton app
app.use(router);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 CMA_GYM app started at http://localhost:${PORT}`);
});

export { app, server };
