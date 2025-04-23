import { DataTypes } from 'sequelize';
import  sequelize  from "../config/db.js"
import Users from './Users.js';
import Pets from './Pets.js';

export const Requests = sequelize.define("requests", {
    id_request: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: Users, 
            key: "id_user"
        }
    },
    id_pet: {
        type: DataTypes.INTEGER,
        references: {
            model: Pets, 
            key: "id_pet"
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM("Pendiente", "Aceptado", "Rechazado"),
        allowNull: false,
        defaultValue: "Pendiente"
    },
    requestDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: 'requests',
    timestamps: false
});

export default Requests;