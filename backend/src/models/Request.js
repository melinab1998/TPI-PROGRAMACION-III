import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Request = sequelize.define(
	"Request",
	{
		id_pet: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "pets",
				key: "id_pet",
			},
		},
		id_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "users",
				key: "id_user",
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
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
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		province: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dni: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		housing_type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ownership_status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		owner_consultation: {
			type: DataTypes.STRING,
		},
		has_courtyard: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		has_pets: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		pets_neutered: {
			type: DataTypes.STRING,
		},
		had_other_pets: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		reason: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		vacation_plan: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		moving_plan: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		daily_walks: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		whatsapp_follow_up: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		terms_accepted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		state: {
			type: DataTypes.ENUM("Pendiente", "Aprobada", "Rechazada", "En revisión"),
			allowNull: false,
			defaultValue: "Pendiente",
		},
	},
	{
		tableName: "requests",
		//timestamps: false, nos interesa saber cuando se creo y cuando se cambio este modelo.
	}
);
export default Request;
