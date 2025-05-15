import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

export const User = sequelize.define("User", {
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
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'superadmin'),
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  tableName: 'users',     
  timestamps: false       
});
//Eso significa que un user puede hacer muchas solicitudes
User.hasMany(Requests, { foreignKey: 'id_user' });
export default User;