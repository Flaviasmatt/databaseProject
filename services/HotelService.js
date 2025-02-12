const { sequelize } = require('../models'); // Importando o sequelize corretamente de models/index.js
const { QueryTypes } = require('sequelize');

class HotelService {
    constructor() {
        // Agora, usamos diretamente sequelize
        this.client = sequelize; 
        this.Hotel = require('../models').Hotel;
        this.Rate = require('../models').Rate;
        this.User = require('../models').User;
    }

    // Função para obter os detalhes do hotel, incluindo a média de avaliação
    async getHotelDetails(hotelId) {
        const hotel = await sequelize.query(
            'SELECT h.id, h.Name, h.Location, ROUND(AVG(r.Value), 1) AS AvgRate ' +
            'FROM hotels h LEFT JOIN rates r ON h.id = r.HotelId ' +
            'WHERE h.id = :hotelId GROUP BY h.id', {
                replacements: { hotelId: hotelId },
                type: QueryTypes.SELECT
        });

        const userRateCount = await sequelize.query(
            'SELECT COUNT(*) as Rated FROM rates WHERE HotelId = :hotelId AND UserId = :userId;', {
                replacements: { hotelId: hotelId, userId: 1 },
                type: QueryTypes.SELECT
        });

        if (userRateCount[0].Rated > 0) {
            hotel[0].Rated = true;
        } else {
            hotel[0].Rated = false;
        }

        return hotel[0];
    }

    // Função para avaliar um hotel
    async makeARate(userId, hotelId, value) {
        try {
            await sequelize.query(
                'INSERT INTO rates (Value, HotelId, UserId) VALUES (:value, :hotelId, :userId)', {
                    replacements: {
                        userId: userId,
                        hotelId: hotelId,
                        value: value
                    }
                });
            return 'Rating successful';
        } catch (err) {
            return err;
        }
    }
}

module.exports = HotelService;












