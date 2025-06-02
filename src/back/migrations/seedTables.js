import "dotenv/config";
import { sequelize } from "../models/db.client.js";
import { Activity, Actuality, Documents, Employee, Admin, Contact, Category } from "../models/associations.js";
import { employee } from "../data/employee.js";
import { document } from "../data/document.js";
import { activity } from "../data/activity.js";
import { actuality } from "../data/acutality.js";
import { admin } from "../data/admin.js";
import { contact } from "../data/contact.js";
import { category } from "../data/category.js";


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
        function: emp.function,
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
        id: act.id,
        title: act.title,
        image: act.image,
        description: act.description,
        category_id: act.categoryId // Utiliser la catégorie définie dans les données
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
        password: employee.password // No hashing
    });
}
console.log('Admin seeded');

// Create relationships between Employee and Activity (sample)

await sequelize.close();