const { Sequelize } = require('sequelize');

// Acá van los mismos datos que puse en docker-compose.yml
const sequelize = new Sequelize('miHogar-db', 'admin', 'admin123', {
  host: 'postgres',
  dialect: 'postgres',
  port: 5432,
  logging: false // Cambialo a true si querés ver las queries que se ejecuteen
});

module.exports = sequelize;