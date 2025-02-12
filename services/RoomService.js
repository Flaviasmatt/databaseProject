const { sequelize } = require("../models");

class RoomService {
    constructor(db) {
        this.client = db.sequelize;
        this.Room = db.Room;
        this.Reservation = db.Reservation;
    }

    // Alugar um quarto especificado usando SQL direto
    async rentARoom(userId, roomId, startDate, endDate) {
        try {
            await sequelize.query('INSERT INTO reservations (StartDate, EndDate, RoomId, UserId) VALUES (:StartDate, :EndDate, :RoomId, :UserId)', {
                replacements: {
                    StartDate: startDate,
                    EndDate: endDate,
                    RoomId: roomId,
                    UserId: userId
                }
            });
            console.log("Room rented successfully");
        } catch (err) {
            throw new Error('Erro ao fazer a reserva: ' + err.message);
        }
    }
}

module.exports = RoomService;
