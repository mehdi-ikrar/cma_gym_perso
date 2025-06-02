import { Activity } from './activityModel.js';
import { Actuality } from './actualityModel.js';
import { Documents } from './documentModel.js';
import { Employee } from './employeeModel.js';
import { Admin  } from './adminModel.js';
import { Contact } from './contactModel.js';
import { Category } from './categoryModel.js'; // Import du nouveau modèle Category

// Relation entre Employee et Activity (n:n)
Employee.belongsToMany(Activity, { 
    through: 'EmployeeActivities',
    foreignKey: 'employee_id',
    otherKey: 'activity_id',
    as: 'activities'
});
Activity.belongsToMany(Employee, { 
    through: 'EmployeeActivities',
    foreignKey: 'activity_id',
    otherKey: 'employee_id',
    as: 'employees'
});

// Relation entre Activity et Actuality (n:n)
Activity.belongsToMany(Actuality, { 
    through: 'ActivityActualities',
    foreignKey: 'activity_id',
    otherKey: 'actuality_id',
    as: 'actualities'
});
Actuality.belongsToMany(Activity, { 
    through: 'ActivityActualities',
    foreignKey: 'actuality_id',
    otherKey: 'activity_id',
    as: 'activities'
});

// Relations avec les catégories (1:n)
// Une actualité peut avoir 0 ou 1 catégorie
Actuality.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});
Category.hasMany(Actuality, {
    foreignKey: 'category_id',
    as: 'actualities'
});

// Un employé peut avoir 0 ou 1 catégorie
Employee.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});
Category.hasMany(Employee, {
    foreignKey: 'category_id',
    as: 'employees'
});

// Une activité peut avoir 0 ou 1 catégorie
Activity.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});
Category.hasMany(Activity, {
    foreignKey: 'category_id',
    as: 'activities'
});

export { Activity, Actuality, Documents, Employee, Admin, Contact, Category };