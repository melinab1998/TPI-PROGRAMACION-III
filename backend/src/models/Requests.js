import { DataTypes } from 'sequelize';
import  sequelize  from "../config/db.js"
import Users from './Users.js';
import Pets from './Pets.js';

const Requests = sequelize.define("requests", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false
  },
  housingType: {
    type: DataTypes.STRING
  },
  ownershipStatus: {
    type: DataTypes.STRING
  },
  ownerConsultation: {
    type: DataTypes.STRING
  },
  hasCourtyard: {
    type: DataTypes.STRING
  },
  hasPets: {
    type: DataTypes.STRING
  },
  petsNeutered: {
    type: DataTypes.STRING
  },
  hadOtherPets: {
    type: DataTypes.STRING
  },
  reason: {
    type: DataTypes.TEXT
  },
  vacationPlan: {
    type: DataTypes.TEXT
  },
  movingPlan: {
    type: DataTypes.TEXT
  },
  dailyWalks: {
    type: DataTypes.STRING
  },
  whatsappFollowUp: {
    type: DataTypes.STRING
  },
  termsAccepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

Requests.belongsTo(Users, { foreignKey: 'id_user' });
Requests.belongsTo(Pets, { foreignKey: 'id_pet' });
export default Requests;