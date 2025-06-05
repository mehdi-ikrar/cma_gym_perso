import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi que cette instance est bien configurée

export class Employee extends Model {}

Employee.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'coach', 'benevole'),
      allowNull: false,
      defaultValue: 'benevole',
    },
  },
  {
    sequelize,
    tableName: "employee",
 
  }
);
