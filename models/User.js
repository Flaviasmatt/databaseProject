module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false
  });

  // Definir associações
  User.associate = function(models) {
    User.belongsToMany(models.Hotel, { through: models.Rate });
    User.belongsToMany(models.Room, { through: models.Reservation });
  };

  return User;
};

  
