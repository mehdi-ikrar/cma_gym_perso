import "dotenv/config";
import { sequelize } from "../models/db.client.js";
import { Activity, Actuality, Documents, Employee, Admin } from "../models/associations.js";
import { employee } from "../data/employee.js";
import { document } from "../data/document.js";
import { activity } from "../data/activity.js";
import { actuality } from "../data/acutality.js";
import { admin } from "../data/admin.js";


// Seed Employee table
for(const emp of employee){
    await Employee.create({
        id: emp.id,
        firstname: emp.firstname,
        name: emp.name,
        function: emp.function,
        image: emp.image,
        description: emp.description,
        
    });
}
console.log('Employees seeded');

// Seed Activity table
for(const act of activity){
    await Activity.create({
        id: act.id,
        category: act.category,
        info: act.info,
        hour: act.hour,
        public: act.public
    });
}
console.log('Activities seeded');

// Seed Actuality table
for(const act of actuality){
    await Actuality.create({
        id: act.id,
        title: act.title,
        image: act.image,
        description: act.description
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