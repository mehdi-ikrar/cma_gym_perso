import express from 'express';
// Ces modules ne sont pas essentiels pour le démarrage du serveur, on les commente.
// import 'dotenv/config';
// import { router } from './back/route/index_router.js';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import cookieParser from 'cookie-parser';          
// import { checkAuth } from './back/middlewares/checkAuth.js';

// Ces lignes ne sont pas nécessaires pour un serveur minimal.
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// On commente toutes les configurations et middlewares.
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'front/public')));
// app.use(cors({
//   origin: ['http://localhost:5173'],
//   credentials: true,
// }));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(checkAuth);
// app.use(router);

// On ajoute une route très simple pour que Cloud Run puisse vérifier que le serveur répond.
app.get('/', (req, res) => {
res.status(200).send("Le serveur est en ligne et fonctionne !");
});

// Le port est crucial, on le laisse. On utilise process.env.PORT, car c'est le port que Cloud Run assigne.
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
console.log(`🚀 CMA_GYM app started at http://localhost:${PORT}`);
});
// On ne met pas d'export pour un test minimal.
// export { app, server };