import "dotenv/config";
import { sequelize } from "../models/db.client.js";
import { Activity, Actuality, Documents, Employee, Admin, Contact, Category, Galerie } from "../models/associations.js";
import { employee } from "../data/employee.js";
import { document } from "../data/document.js";
import { activity } from "../data/activity.js";
import { actuality } from "../data/acutality.js";
import { admin } from "../data/admin.js";
import { contact } from "../data/contact.js";
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

// Seed Employee table
for(const emp of employee){
    await Employee.create({
        id: emp.id,
        firstname: emp.firstname,
        name: emp.name,
        role: emp.role,
        image: emp.image,
        description: emp.description,
        category_id: emp.categoryId
    });
}
console.log('Employees seeded');

// Seed Activity table
for(const act of activity){
    await Activity.create({
        id: act.id,
        groupe: act.groupe,
        description: act.description,
        horraire: act.horraire,
        public: act.public,
        cotisation: act.cotisation,
        frequence: act.frequence || null,
        category_id: act.categoryId
    });
}
console.log('Activities seeded');



for(const cont of contact){
    await Contact.create({
        id: cont.id,
        adresse: cont.adresse,
        facebook: cont.facebook,
        telephone: cont.telephone,
        horraire: cont.horraire,
    });
}
console.log('Activities seeded');


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

// Seed Documents table
for(const doc of document){
    await Documents.create({
        id: doc.id,
        title: doc.title,
        url: doc.url
    });
}
console.log('Documents seeded');

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

// Create relationships between Employee and Activity (sample)

// Seed Galerie table (après les actualités pour que actuality_id existe)
for(const gal of galerie){
    await Galerie.create({

        image: gal.image,
        actuality_id: gal.actuality_id // C'est ici la clé étrangère !
    });
}
console.log('Galerie seeded');

await sequelize.close();