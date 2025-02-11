const { DataTypes } = require("sequelize");
const db = require("../sequelize/config.js");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIP: true,
    },
  },
  biografia: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = User