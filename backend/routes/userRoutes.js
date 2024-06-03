const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const UserController = require('../controllers/userController');

// Rota de cadastro de usuário
router.post('/register', UserController.registerUser);

// Rota de login de usuário
router.post('/login', UserController.loginUser);

// Rota de obtenção de usuários para a tela de gestão
router.get('/admin/users', protect, UserController.getAllUsers);

//Rota de adição de usuários na tela de gestão
router.put('/admin/users', protect, UserController.addUser);

//Rota de atualização de usuário
router.put('/admin/users/:id', UserController.updateUser);

// Rota de exclusão de usuário
router.delete('/admin/users/:id', protect, UserController.deleteUser);

module.exports = router;