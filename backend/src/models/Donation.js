import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Donation = sequelize.define(
	"Donation",
	{
		id_donation: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},

		amount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},

		payment_method: {
			type: DataTypes.ENUM(
				"Tarjeta Débito/Crédito",
				"Transferencias",
				"PayPal",
				"Mercado Pago"
			),
			allowNull: false,
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		donation_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "donations",
		timestamps: false,
	}
);

export default Donation;
