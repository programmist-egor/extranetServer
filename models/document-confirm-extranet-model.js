import { DataTypes } from 'sequelize';
import {sequelizeExtranet} from '../config/db-connect.js';


const DocumentConfirmExtranet = sequelizeExtranet.define('Document-Confirm-Extranet', {
    idTable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hotelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idDoc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nameObject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default DocumentConfirmExtranet;