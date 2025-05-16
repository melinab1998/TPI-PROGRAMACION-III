import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

export const Shelter = sequelize.define("Shelter", {
    id_shelter: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'shelters',
    timestamps: false
});

export default Shelter;