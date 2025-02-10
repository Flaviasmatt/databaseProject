module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define("Hotel", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false
  });

  // Definir associações
  Hotel.associate = function(models) {
    Hotel.hasMany(models.Room);
    Hotel.belongsToMany(models.User, { through: models.Rate });
  };

  return Hotel;
};

  