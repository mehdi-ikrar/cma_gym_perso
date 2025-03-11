import 'dotenv/config';
import express from 'express';
import { router } from "./route/index_router.js";
import cors from "cors";


const app = express(); 

app.use(cors({
  origin: ['http://localhost:5173', ],
  credentials: true, // Autorise l'envoi de cookies
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 CMA_GYM app started at http://localhost:${PORT}`);
});

export{app, server};