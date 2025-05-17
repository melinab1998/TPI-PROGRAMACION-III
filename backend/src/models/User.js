import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const User = sequelize.define(
	"User",
	{
		id_user: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM("user", "admin", "superadmin"),
			allowNull: false,
			defaultValue: "user",
		},
	},
	{
		tableName: "users",
		timestamps: false,
	}
);
export default User;
