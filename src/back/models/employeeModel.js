import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Employee extends Model {}

Employee.init(
  {
    name: {
      type: DataTypes.STRING(50), // Type de la colonne preuve
      allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    firstname: {
      type: DataTypes.STRING(50), // Type de la colonne preuve
      allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    image: {
      type: DataTypes.BLOB('long'),  // Le type BLOB permet de stocker des données binaires
      allowNull: true,              // Cette colonne peut être nulle, si l'image n'est pas envoyée
    },
    description: {
      type: DataTypes.STRING(250), // Type de la colonne preuve
      allowNull: true,           // Cette colonne ne peut pas être nulle
    },
    function: {
      type: DataTypes.STRING(50), // Type de la colonne preuve
      allowNull: true,           // Cette colonne ne peut pas être nulle
    }
  },
  {
    sequelize,  // La connexion Sequelize
    tableName: "employee",  // Nom exact de la table en BDD

  }
  
);

