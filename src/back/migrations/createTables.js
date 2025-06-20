import "dotenv/config";
import { sequelize } from "../models/db.client.js";
import {  Actuality, Admin , Category } from "../models/associations.js";
import { Galerie } from "../models/galerieModel.js";

// Forcer la suppression avec cascade
await sequelize.drop({ cascade: true });

await sequelize.sync();

console.log('All tables are created!');

await sequelize.close();
