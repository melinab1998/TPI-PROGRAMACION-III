import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Pet = sequelize.define(
	"Pet",
	{
		id_pet: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		species: {
			type: DataTypes.ENUM("Perro", "Gato"),
			allowNull: false,
		},
		race: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Desconocida",
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		weight: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		gender: {
			type: DataTypes.ENUM("Macho", "Hembra"),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		shelter: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		adopted: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
		image_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "pets",
		timestamps: false,
	}
);

export default Pet;
