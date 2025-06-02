import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Category extends Model {}

Category.init(
  {
    title: {
      type: DataTypes.STRING(50), // Type de la colonne preuve
      allowNull: false,           // Cette colonne ne peut pas être nulle
    },
  },
  {
    sequelize,  // La connexion Sequelize
    tableName: "category",  // Nom exact de la table en BDD

  }
  
);

