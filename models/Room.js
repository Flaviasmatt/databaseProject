module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    pricePerDay: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false
  });

  // Definir associações
  Room.associate = function(models) {
    Room.belongsTo(models.Hotel);
    Room.belongsToMany(models.User, { through: models.Reservation });
  };

  return Room;
};
