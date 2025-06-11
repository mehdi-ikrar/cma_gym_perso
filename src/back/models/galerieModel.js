import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db.client.js';

export class Galerie extends Model {}

Galerie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actuality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'actuality',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    tableName: 'galerie',
  }
);