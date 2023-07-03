const express = require('express');
const router = express.Router();
const componenteController = require('../controllers/ComponentesController');

// Rota para obter todos os componentes
router.get('/', componenteController.getComponentes);

// Rota para criar um novo componente
router.post('/', componenteController.createComponente);

// Rota para obter um componente por ID
router.get('/:id', componenteController.getComponenteById);

// Rota para atualizar um componente por ID
router.put('/:id', componenteController.updateComponente);

// Rota para excluir um componente por ID
router.delete('/:id', componenteController.deleteComponente);

module.exports = router;