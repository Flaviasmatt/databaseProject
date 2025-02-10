const express = require("express");
const router = express.Router();
const db = require("../models");

// Criar uma nova reserva (POST /reservations)
router.post("/", async (req, res) => {
  try {
    const { startDate, endDate, userId, roomId } = req.body;

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
      include: [db.User, db.Room],
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar reservas.", details: error.message });
  }
});

module.exports = router;
