// models/Gamer.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from './db.client.js';

export class Admin extends Model {}

Admin.init({
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'admin',

});
