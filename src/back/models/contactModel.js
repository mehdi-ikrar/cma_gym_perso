import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Contact extends Model {}

Contact.init(
  {
    adresse: {
      type: DataTypes.STRING(50), // Type de la colonne preuve
      allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    facebook: {
        type: DataTypes.STRING,      // Type de la colonne duration
        allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    horraire: {
      type: DataTypes.STRING,
      allowNull: false
  },
  },
  {
    sequelize,  // La connexion Sequelize
    tableName: "contact",  // Nom exact de la table en BDD

  }
  
);

