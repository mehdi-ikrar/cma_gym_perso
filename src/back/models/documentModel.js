import { Model, DataTypes } from 'sequelize';
import { sequelize } from './db.client.js';

export class Documents extends Model {}

Documents.init({
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'document',
});