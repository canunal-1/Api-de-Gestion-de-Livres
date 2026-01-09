const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Library = sequelize.define('Library', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le nom de la bibliothèque est requis." }
    }
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "L'adresse est requise." }
    }
  }
}, {
  tableName: 'libraries',
  timestamps: true 
});

module.exports = Library;