const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verificarToken, autorizar } = require('../middlewares/auth');

// Criar evento — apenas admin e organizador
router.post('/', verificarToken, autorizar('admin', 'organizador'), eventController.create);

// Listar eventos — público
router.get('/', eventController.list);

// Ver evento por ID — público
router.get('/:id', eventController.getById);

// Atualizar evento — apenas admin e organizador
router.put('/:id', verificarToken, autorizar('admin', 'organizador'), eventController.update);

// Deletar evento — apenas admin
router.delete('/:id', verificarToken, autorizar('admin'), eventController.delete);

module.exports = router;
