const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Componente = require('./Componente');
const Categoria = require('./Categoria');

const Equipamento = sequelize.define('Equipamento', {
  id_equipamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_equipamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CategoriaId: { // Atualização da chave estrangeira
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id_categoria',
    },
  },
  ComponenteId: { // Atualização da chave estrangeira
    type: DataTypes.INTEGER,
    references: {
      model: Componente,
      key: 'codigo_componente',
    },
  },
});

// Adicionando a associação com a tabela Componente
Equipamento.belongsTo(Componente, { foreignKey: 'codigo_componente'});
Equipamento.belongsTo(Categoria, { foreignKey: 'id_categoria' });

module.exports = Equipamento;
