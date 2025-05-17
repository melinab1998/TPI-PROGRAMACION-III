import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Users from "./Users.js";
import Pets from "./Pets.js";

const Request = sequelize.define(
	"Request",
	{
		id_pet: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
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
		housingType: {
			type: DataTypes.STRING,
		},
		ownershipStatus: {
			type: DataTypes.STRING,
		},
		ownerConsultation: {
			type: DataTypes.STRING,
		},
		hasCourtyard: {
			type: DataTypes.STRING,
		},
		hasPets: {
			type: DataTypes.STRING,
		},
		petsNeutered: {
			type: DataTypes.STRING,
		},
		hadOtherPets: {
			type: DataTypes.STRING,
		},
		reason: {
			type: DataTypes.TEXT,
		},
		vacationPlan: {
			type: DataTypes.TEXT,
		},
		movingPlan: {
			type: DataTypes.TEXT,
		},
		dailyWalks: {
			type: DataTypes.STRING,
		},
		whatsappFollowUp: {
			type: DataTypes.STRING,
		},
		termsAccepted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		tableName: "requests",
		//timestamps: false, nos interesa saber cuando se creo y cuando se cambio este modelo.
	}
);
//Cada solicitud pertenece a una mascota relacionado con su id unico
Request.belongsTo(Pets, { foreignKey: "id_pet" });
Request.belongsTo(Users, { foreignKey: "id_user" });
export default Request;
