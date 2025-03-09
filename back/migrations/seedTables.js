import "dotenv/config";
import { sequelize } from "../models/db.client.js";
import { Activity, Actuality, Documents, Employee, User } from "../models/associations.js";
import { employee } from "../data/employee.js";
import { document } from "../data/document.js";
import { activity } from "../data/activity.js";
import { actuality } from "../data/acutality.js";
import { user } from "../data/user.js";


// Seed Employee table
for(const emp of employee){
    // Seed User table with plain passwords
    for(const u of user){
        await User.create({
            id: u.id,
            name: u.name,
            email: u.email,
            password: u.password // No hashing
        });
    }
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
for(const u of user){
    await User.create({
        id: u.id,
        name: u.name,
        email: u.email,
        password: await argon2.hash(u.password)
    });
}
console.log('Users seeded');

// Create relationships between Employee and Activity (sample)
// You'll need to define which employee is associated with which activity
const employeeActivities = [
    { employee_id: 1, activity_id: 1 },
    { employee_id: 2, activity_id: 2 },
    { employee_id: 3, activity_id: 3 },
    { employee_id: 4, activity_id: 4 }
];

for(const relation of employeeActivities){
    const emp = await Employee.findByPk(relation.employee_id);
    const act = await Activity.findByPk(relation.activity_id);
    await emp.addActivity(act);
}
console.log('Employee-Activity relationships seeded');

// Create relationships between Activity and Actuality (sample)
const activityActualities = [
    { activity_id: 1, actuality_id: 1 },
    { activity_id: 2, actuality_id: 2 },
    { activity_id: 3, actuality_id: 3 },
    { activity_id: 4, actuality_id: 4 },
    { activity_id: 5, actuality_id: 5 }
];

for(const relation of activityActualities){
    const act = await Activity.findByPk(relation.activity_id);
    const actual = await Actuality.findByPk(relation.actuality_id);
    await act.addActuality(actual);
}
console.log('Activity-Actuality relationships seeded');

console.log('All seeding completed');
await sequelize.close();