const { Sequelize, DataTypes } = require("sequelize"); // Importando explicitamente Sequelize e DataTypes

module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    StartDate: {
      type: DataTypes.DATE, // Corrigido para usar DataTypes diretamente
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATE, // Corrigido para usar DataTypes diretamente
      allowNull: false
    }
  }, {
    timestamps: false,
    hasTrigger: true
  });

  return Reservation;
};