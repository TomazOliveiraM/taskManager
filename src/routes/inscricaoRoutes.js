const express = require('express');
const router = express.Router();
const inscricaoController = require('../controllers/inscricaoController');
const verificarToken = require('../middlewares/auth');

// Criar inscrição (usuario_id será pego do token)
router.post('/', verificarToken, inscricaoController.create);

// Listar inscrições do usuário autenticado
router.get('/me', verificarToken, inscricaoController.listByUsuario);

// Cancelar inscrição
router.delete('/', verificarToken, inscricaoController.cancel);

module.exports = router;
