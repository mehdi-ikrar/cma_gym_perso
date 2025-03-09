import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Employee extends Model {}

Employee.init(
  {
    title: {
      type: DataTypes.STRING(50), // Type de la colonne preuve
      allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    image: {
        type: DataTypes.STRING,      // Type de la colonne duration
        allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    sequelize,  // La connexion Sequelize
    tableName: "employee",  // Nom exact de la table en BDD

  }
  
);

