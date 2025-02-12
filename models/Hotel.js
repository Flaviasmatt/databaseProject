const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Hotel', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'Hotels'
    });
};

  