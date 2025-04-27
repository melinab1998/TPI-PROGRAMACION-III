import { DataTypes } from 'sequelize';
import  sequelize  from "../config/db.js"
import Users from './Users.js';

export const LostPets = sequelize.define("LostPets", {
    
    id_lost_pet: {
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM("Macho", "Hembra"),
        allowNull: false,
        
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    lost_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'LostPets',
    timestamps: false
});

export default LostPets;