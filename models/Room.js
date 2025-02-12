const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Room = sequelize.define("Room", {
        pricePerDay: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        HotelId: {  // Definindo a chave estrangeira para o Hotel
            type: DataTypes.INTEGER,
            references: {
                model: 'Hotels', // Tabela referenciada
                key: 'id'        // Chave primária do Hotel
            },
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'Rooms'  // Nome da tabela
    });

    // Definir associações
    Room.associate = function(models) {
        Room.belongsTo(models.Hotel, { foreignKey: 'HotelId' });  // Definindo a chave estrangeira explicitamente
        Room.belongsToMany(models.User, { through: models.Reservation }); // Relacionamento com User via Reservation
    };

    return Room;
};




