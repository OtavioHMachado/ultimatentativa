const Sequelize = require('sequelize');

// Conexão com o banco de dados SQLite em memória
const sequelize = new Sequelize('sqlite::memory:');

module.exports = sequelize;