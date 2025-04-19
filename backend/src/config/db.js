import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables del archivo .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,// Si ponés true, Sequelize te muestra las consultas SQL en consola
  }
);

export default sequelize;