const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const RoomService = require("../services/RoomService");
const db = require("../models");
const roomService = new RoomService(db);

// Rota GET - Exibir os quartos de um hotel específico
router.get('/:hotelId', async function(req, res, next) {
    try {
        const rooms = await roomService.getHotelRooms(req.params.hotelId);
        
        // Filtra os quartos onde o usuário com id=1 já tem uma reserva
        rooms.map(room => {
            room.Users = room.Users.filter(user => user.id === 1);  // Filtra o usuário com id=1
        });

        res.render('rooms', { rooms: rooms });
    } catch (error) {
        res.status(500).send("Erro ao buscar os quartos do hotel.");
    }
});

// Rota GET - Exibir todos os quartos disponíveis
router.get('/', async function(req, res, next) {
    try {
        const rooms = await roomService.get();

        // Filtra os quartos onde o usuário com id=1 já tem uma reserva
        rooms.map(room => {
            room.Users = room.Users.filter(user => user.id === 1);  // Filtra o usuário com id=1
        });

        res.render('rooms', { rooms: rooms });
    } catch (error) {
        res.status(500).send("Erro ao buscar os quartos.");
    }
});

// Rota POST - Criar uma nova reserva para um quarto
router.post('/reservation', jsonParser, async function(req, res, next) {
    let userId = req.body.UserId;
    let roomId = req.body.RoomId;
    let startDate = req.body.StartDate;
    let endDate = req.body.EndDate;

    try {
        // Verificar se o quarto já está reservado para esse usuário
        const existingReservation = await db.Reservation.findOne({
            where: {
                RoomId: roomId,
                UserId: userId,
                EndDate: { [db.Sequelize.Op.gte]: startDate }
            }
        });

        if (existingReservation) {
            return res.status(400).json({ message: "Já existe uma reserva para esse usuário e quarto." });
        }

        // Criando a nova reserva
        await roomService.rentARoom(userId, roomId, startDate, endDate);
        res.status(200).json({ message: 'Reserva feita com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: "Erro ao criar reserva", error: error.message });
    }
});

module.exports = router;














