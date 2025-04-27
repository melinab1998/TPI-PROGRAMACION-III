import { DataTypes } from 'sequelize';
import  sequelize  from "../config/db.js"
import Users from './Users.js';

export const Donation = sequelize.define("donation", {
    
    id_donation: {
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

    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    payment_method: {
        type: DataTypes.ENUM("Tarjeta Débito/Crédito", "Transferencias", "PayPal", "Mercado Pago"),
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    donation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: 'donation',
    timestamps: false
});

export default Donation;