import "dotenv/config";
import { sequelize } from "../models/db.client.js";
import {  Actuality,  Admin, Category, Galerie } from "../models/associations.js";
import { actuality } from "../data/acutality.js";
import { admin } from "../data/admin.js";

import { category } from "../data/category.js";
import { galerie } from "../data/galerie.js";

import argon2 from 'argon2';

// Seed Categories table
for(const cat of category){
    await Category.create({
        id: cat.id,
        title: cat.title
    });
}
console.log('Categories seeded');








// Seed Actuality table
for(const act of actuality){
    await Actuality.create({
        title: act.title,
        image: act.image,
        description: act.description,
        category_id: act.categoryId
        // PAS de galerie_id ici ! La table galerie référence actuality_id, pas l'inverse
    });
}
console.log('Actualities seeded');


// Seed User table with hashed passwords
for(const u of admin){
    await Admin.create({
        id: u.id,
        name: u.name,
        email: u.email,
        password: await argon2.hash(u.password) // PAS de second argument ici
    });
}
console.log('Admin seeded');



// Seed Galerie table (après les actualités pour que actuality_id existe)
for(const gal of galerie){
    await Galerie.create({

        image: gal.image,
        actuality_id: gal.actuality_id // C'est ici la clé étrangère !
    });
}
console.log('Galerie seeded');

await sequelize.close();