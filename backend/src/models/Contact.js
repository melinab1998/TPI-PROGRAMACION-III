import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Contact = sequelize.define( 
	"Contact",
	{
		id_contact: {
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
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	},
	{
		tableName: "contacts",
		timestamps: false,
	}
);
export default Contact;