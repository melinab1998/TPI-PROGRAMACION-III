import { DataTypes } from 'sequelize';
import  sequelize  from "../config/db.js"
import Users from './Users.js';

export const FoundPets = sequelize.define("FoundPets", {
    
    id_found_pet: {
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
    species: {
        type: DataTypes.ENUM("Perro", "Gato"),
        allowNull: false
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Desconocida"
    },
    gender: {
        type: DataTypes.ENUM("Macho", "Hembra"),
        allowNull: false,
        
    },
    description: 
        {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    found_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    state: {
        type: DataTypes.ENUM("Pendiente", "Devuelto"),
        allowNull: true,
        defaultValue: "Pendiente",
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'FoundPets',
    timestamps: false
});

export default FoundPets;