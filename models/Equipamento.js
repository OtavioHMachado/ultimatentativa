const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Componente = require('./Componente');

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
});

Equipamento.belongsTo(Componente, { foreignKey: 'ComponenteId' });

module.exports = Equipamento;
