import { DataTypes } from 'sequelize';
import  sequelize  from "../config/db.js"
import Requests from './Requests.js';

export const AdoptionHistory = sequelize.define("adoptionHistory", {
    
    id_adoption: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_request: {
        type: DataTypes.INTEGER,
        references: {
            model: Requests,
            key:  "id_request"
        }
    },
    adoption_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    state: {
        type: DataTypes.ENUM("Aceptado", "Cancelado", "Pendiente", "Devuelto"),
        defaultValue: "Pendiente",
    }

}, {
    tableName: 'adoptionHistory',
    timestamps: false
});

export default AdoptionHistory;