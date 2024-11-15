const express = require('express');

const controller= require('../controllers/usuariosController');  // Importa as funções do controlador

const router = express.Router();

// Rota para criar um novo usuário
router.post('/usuarios', controller.createUser);

// Rota para editar um usuário existente
router.put('/usuarios/:id', controller.updateUser);  // Usa o ID do usuário na URL

// Rota para excluir um usuário
router.delete('/usuarios/:id', controller.deleteUser);  // Usa o ID do usuário na URL

// Rota para visualizar todos os usuários
router.get('/usuarios', controller.getAllUsers);

router.get('/getUsuarios/:id', controller.getUserNameById);

// Rota de login
router.post('/login', controller.login);

module.exports = router;
