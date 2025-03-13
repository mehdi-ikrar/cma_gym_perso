import { Activity } from './activityModel.js';
import { Actuality } from './actualityModel.js';
import { Documents } from './documentModel.js';
import { Employee } from './employeeModel.js';
import { Admin  } from './adminModel.js';

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



export { Activity, Actuality, Documents, Employee, Admin };