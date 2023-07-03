const Equipamento = require('../models/Equipamento');
const Componente = require('../models/Componente');
const Categoria = require('../models/Categoria');

// Obter todos os equipamentos
exports.getEquipamentos = async (req, res) => {
  try {
    const equipamentos = await Equipamento.findAll({
      include: [
        {
          model: Componente,
          include: [Categoria],
        },
      ],
    });

    res.json(equipamentos);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter os equipamentos.' });
  }
};

// Criar um novo equipamento
// Criar um novo equipamento
exports.createEquipamento = async (req, res) => {
  try {
    const { nome_equipamento, ComponenteId } = req.body;

    const novoEquipamento = await Equipamento.create({
      nome_equipamento,
      ComponenteId,
    });

    res.status(201).json(novoEquipamento);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar o equipamento.' });
  }
};

// Obter um equipamento por ID
exports.getEquipamentoById = async (req, res) => {
  try {
    const { id } = req.params;

    const equipamento = await Equipamento.findByPk(id, {
      include: [
        {
          model: Componente,
          include: [Categoria],
        },
      ],
    });

    if (!equipamento) {
      return res.status(404).json({ error: 'Equipamento não encontrado.' });
    }

    res.json(equipamento);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter o equipamento.' });
  }
};

// Atualizar um equipamento por ID
exports.updateEquipamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_equipamento, ComponenteId } = req.body;

    const equipamento = await Equipamento.findByPk(id);

    if (!equipamento) {
      return res.status(404).json({ error: 'Equipamento não encontrado.' });
    }

    equipamento.nome_equipamento = nome_equipamento;
    equipamento.ComponenteId = ComponenteId;

    await equipamento.save();

    res.json(equipamento);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o equipamento.' });
  }
};

// Excluir um equipamento por ID
exports.deleteEquipamento = async (req, res) => {
  try {
    const { id } = req.params;

    const equipamento = await Equipamento.findByPk(id);

    if (!equipamento) {
      return res.status(404).json({ error: 'Equipamento não encontrado.' });
    }

    await equipamento.destroy();

    res.json({ message: 'Equipamento excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o equipamento.' });
  }
};