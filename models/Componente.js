const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Categoria = require("./Categoria");

const Componente = sequelize.define("Componente", {
  codigo_componente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome_componente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc_componente: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  CategoriaId: { // Atualização da chave estrangeira
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id_categoria',
    },
  },
});

// Adicionando a associação com a tabela Categoria
Componente.belongsTo(Categoria, { foreignKey: "CategoriaId" });

module.exports = Componente;