const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors'); // Middleware CORS

const app = express();

// Defina o EJS como motor de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Diretório onde estão as views

// Outros middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());  // Middleware CORS para permitir o acesso entre origens

// Configuração das rotas
const hotelsRouter = require('./routes/hotels');
app.use('/hotels', hotelsRouter);  // Registrando a rota /hotels

// Middleware para tratar 404 (Página não encontrada)
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page not found', error: {} });
});

// Middleware para tratamento global de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', {
        message: err.message || 'Internal Server Error',
        error: err || {}  // Passando o objeto de erro para a view
    });
});

module.exports = app;

