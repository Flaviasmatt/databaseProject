module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define("Reservation", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    timestamps: false
  });

  // Definir associações
  Reservation.associate = function(models) {
    Reservation.belongsTo(models.User, { foreignKey: "UserId", onDelete: "CASCADE" });
    Reservation.belongsTo(models.Room, { foreignKey: "RoomId", onDelete: "CASCADE" });
  };

  return Reservation;
};

  