const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

const Hotel = require('./hotel')(sequelize);

sequelize.sync({ alter: true }) // Garante que as tabelas estão criadas
    .then(() => console.log('Banco de dados sincronizado com sucesso.'))
    .catch(err => console.error('Erro ao sincronizar DB:', err));

module.exports = { sequelize, Hotel };

