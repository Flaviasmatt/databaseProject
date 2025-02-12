console.log("Rotas de reservations carregadas com sucesso!");

const express = require("express");
const router = express.Router();
const db = require("../models");

// Criar uma nova reserva (POST /reservations)
router.post("/", async (req, res) => {
  try {
    const { startDate, endDate, userId, roomId } = req.body;

    // Verificar se as datas estão corretas (startDate não pode ser posterior ao endDate)
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: "A data de início não pode ser posterior à data de término." });
    }

    // Verificar se já existe uma reserva para esse usuário e quarto (prevenção de duplicatas)
    const existingReservation = await db.Reservation.findOne({
      where: {
        UserId: userId,
        RoomId: roomId,
        EndDate: { [db.Sequelize.Op.gt]: new Date(startDate) },  // verifica se a nova reserva entra em conflito com as existentes
        StartDate: { [db.Sequelize.Op.lt]: new Date(endDate) }
      }
    });

    if (existingReservation) {
      return res.status(400).json({ error: "Já existe uma reserva para esse usuário e quarto nesse período." });
    }

    // Criar a reserva
    const reservation = await db.Reservation.create({
      startDate,
      endDate,
      UserId: userId,
      RoomId: roomId,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar reserva.", details: error.message });
  }
});

// Obter todas as reservas (GET /reservations)
router.get("/", async (req, res) => {
  try {
    const reservations = await db.Reservation.findAll({
      include: [db.User, db.Room],  // Inclui informações dos usuários e quartos
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar reservas.", details: error.message });
  }
});

module.exports = router;

