import { DataTypes } from 'sequelize';
import {sequelizeExtranet} from '../config/db-connect.js';


const UsersExtranet = sequelizeExtranet.define('Users-Extranet', {
    idTable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    isConfirmPhone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    codeConfirmForPhone: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    twoStepVerification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    twoStepVerificationType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    activationCodeEmail: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default UsersExtranet;