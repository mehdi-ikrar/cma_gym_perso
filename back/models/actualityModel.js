import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Actuality extends Model {}

Actuality.init(
  {
    title: {
      type: DataTypes.STRING(50), // Type de la colonne preuve
      allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    image: {
        type: DataTypes.STRING,      // Type de la colonne duration
        allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize,  // La connexion Sequelize
    tableName: "actuality",  // Nom exact de la table en BDD

  }
  
);

