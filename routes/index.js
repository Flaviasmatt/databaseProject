const express = require('express');
const router = express.Router();

// Importando as rotas específicas
const hotelsRouter = require('./hotels');  // Rota para hotéis
const roomsRouter = require('./rooms');    // Rota para quartos
const ratesRouter = require('./rates');    // Rota para avaliações

// Definindo a rota base para redirecionar as outras
router.get('/', (req, res) => {
  res.send('Welcome to the Hotel Management System');
});

// Usando as rotas específicas
router.use('/hotels', hotelsRouter);   // Prefixo para todas as rotas de hotéis
router.use('/rooms', roomsRouter);     // Prefixo para todas as rotas de quartos
router.use('/rates', ratesRouter);     // Prefixo para todas as rotas de avaliações

module.exports = router;



