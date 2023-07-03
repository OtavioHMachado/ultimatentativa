const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/EquipamentosController');

// Rota para obter todos os equipamentos
router.get('/', equipamentoController.getEquipamentos);

// Rota para criar um novo equipamento
router.post('/', equipamentoController.createEquipamento);

// Rota para obter um equipamento por ID
router.get('/:id', equipamentoController.getEquipamentoById);

// Rota para atualizar um equipamento por ID
router.put('/:id', equipamentoController.updateEquipamento);

// Rota para excluir um equipamento por ID
router.delete('/:id', equipamentoController.deleteEquipamento);

module.exports = router;
