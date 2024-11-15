const express = require('express');
const controller = require('../controllers/agendamentosController');

const router = express.Router();

// Rota para criar agendamento
router.post('/agendar', controller.createAgendamento);

// Rota para editar agendamento
router.put('/editar/:id', controller.updateAgendamento);

// Rota para excluir agendamento
router.delete('/deletar/:id', controller.deleteAgendamento);

// Rota para listar todos os agendamentos
router.get('/lista', controller.getAllAgendamentos);

module.exports = router;