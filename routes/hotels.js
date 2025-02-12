const express = require('express');
const router = express.Router();
const { Hotel, Room, Rating } = require('../models'); // Importa os modelos Hotel, Room e Rating
const HotelService = require('../services/HotelService');
const hotelService = new HotelService();

// Rota GET - Exibir todos os hotéis
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.findAll();
        res.render('hotels', { hotels });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota GET - Exibir os quartos de um hotel específico
router.get('/rooms/:id', async (req, res) => {
    try {
        const hotelId = req.params.id;
        const hotel = await Hotel.findByPk(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }

        const rooms = await Room.findAll({ where: { hotelId } });
        if (!rooms.length) {
            return res.status(404).json({ message: 'No rooms found for this hotel.' });
        }

        res.render('rooms', { rooms, hotel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota GET - Exibir detalhes de um hotel específico
router.get('/:id', async (req, res) => {
    try {
        const hotelId = req.params.id;
        const hotel = await hotelService.getHotelDetails(hotelId);
        res.render('hotelDetail', { hotel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST - Criar um novo hotel
router.post('/', async (req, res) => {
    try {
        const { Name, Location } = req.body;
        if (!Name || !Location) {
            return res.status(400).json({ error: "Name and Location are required" });
        }

        const newHotel = await Hotel.create({ Name, Location });
        res.redirect('/hotels');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE - Deletar um hotel por ID
router.delete('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.id);
        if (!hotel) {
            return res.status(404).json({ error: "Hotel not found" });
        }

        await hotel.destroy();
        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST - Avaliar um hotel
router.post('/:hotelId/rate', jsonParser, async function(req, res) {
    try {
        let value = req.body.Value;
        await hotelService.makeARate(1, req.params.hotelId, value);
        res.redirect(`/hotels/${req.params.hotelId}`);
    } catch (error) {
        res.status(500).json({ error: "Erro ao avaliar o hotel", message: error.message });
    }
});

module.exports = router;





























