const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Criação das categorias "armazenagem" e "processamento"
(async () => {
  await Categoria.sync();

  await Categoria.findOrCreate({
    where: { nome: 'armazenagem' },
    defaults: { nome: 'armazenagem' },
  });

  await Categoria.findOrCreate({
    where: { nome: 'processamento' },
    defaults: { nome: 'processamento' },
  });

  console.log('Categorias criadas com sucesso.');
})().catch((error) => {
  console.error('Erro ao criar categorias:', error);
});

module.exports = Categoria;