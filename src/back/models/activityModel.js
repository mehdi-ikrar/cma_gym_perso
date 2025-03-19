import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Activity extends Model {}

Activity.init(
  {
    groupe: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    horraire: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    public: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cotisation: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    frequence: {
      type: DataTypes.STRING(30),
      allowNull: true, // Certaines activités n'ont pas cette propriété
    }
  },
  {
    sequelize,
    tableName: "activity",

  }
);