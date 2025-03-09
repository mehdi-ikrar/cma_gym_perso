import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Activity extends Model {}

Activity.init(
  {
    category: {
      type: DataTypes.STRING(50), // Type de la colonne preuve
      allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    info: {
        type: DataTypes.STRING,      // Type de la colonne duration
        allowNull: false,           // Cette colonne ne peut pas être nulle
    },
    hour: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    public: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  },
  {
    sequelize,  // La connexion Sequelize
    tableName: "activity",  // Nom exact de la table en BDD

  }
  
);

