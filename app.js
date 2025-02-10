var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reservationsRouter = require('./routes/reservations');
var app = express();

// Importar a conexão com o banco de dados
const db = require("./models");

// Sincronizar o banco de dados e criar tabelas (se ainda não existirem)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Banco de dados sincronizado com sucesso!");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar o banco de dados:", error);
    });

// Configuração da view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use('/reservations', reservationsRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Captura de erro 404 e encaminha para o tratador de erros
app.use(function(req, res, next) {
  next(createError(404));
});

// Tratador de erros
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza a página de erro
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

