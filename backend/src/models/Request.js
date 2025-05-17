import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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
			allowNull: false,
		},
		ownershipStatus: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ownerConsultation: {
			type: DataTypes.STRING,
		},
		hasCourtyard: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		hasPets: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		petsNeutered: {
			type: DataTypes.STRING,
		},
		hadOtherPets: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		reason: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		vacationPlan: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		movingPlan: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		dailyWalks: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		whatsappFollowUp: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
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
export default Request;
