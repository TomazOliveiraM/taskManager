const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/auth');
const inscricaoController = require('../controllers/inscricaoController');
const inscricaoModel = require('../models/inscricaoModel');

// Criar inscrição (usuário logado)
router.post('/', verificarToken, inscricaoController.create);

// Listar inscrições do usuário logado
router.get('/', verificarToken, inscricaoController.listByUsuario);

// Cancelar inscrição (usuário logado)
router.delete('/', verificarToken, inscricaoController.cancel);

module.exports = router;
