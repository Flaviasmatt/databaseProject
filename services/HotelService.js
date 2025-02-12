const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');

class HotelService {
    constructor(db) {
        this.client = db.sequelize;
        this.Hotel = db.Hotel;
        this.Rate = db.Rate;
        this.User = db.User;
    }

    // Função para obter os detalhes do hotel, incluindo a média de avaliação
    async getHotelDetails(hotelId) {
        // Recupera os dados do hotel e a média de avaliações
        const hotel = await sequelize.query(
            'SELECT h.id, h.Name, h.Location, ROUND(AVG(r.Value), 1) AS AvgRate ' +
            'FROM hotels h LEFT JOIN rates r ON h.id = r.HotelId ' +
            'WHERE h.id = :hotelId GROUP BY h.id', {
                replacements: { hotelId: hotelId },
                type: QueryTypes.SELECT
        });

        // Recupera a contagem de avaliações feitas por um usuário
        const userRateCount = await sequelize.query(
            'SELECT COUNT(*) as Rated FROM rates WHERE HotelId = :hotelId AND UserId = :userId;', {
                replacements: { hotelId: hotelId, userId: 1 },
                type: QueryTypes.SELECT
        });

        // Verifica se o usuário já avaliou este hotel
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










