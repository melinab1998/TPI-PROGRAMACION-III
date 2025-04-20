import { Sequelize } from 'sequelize';

const sequelize = new Sequelize (
    "mi-hogar",
    "admin",
    "admin1234",
    {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
        logging: false,
    }
);

export default sequelize