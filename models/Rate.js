module.exports = (sequelize, DataTypes) => {
    const Rate = sequelize.define("Rate", {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      }
    }, {
      timestamps: false
    });
  
    return Rate;
  };
  