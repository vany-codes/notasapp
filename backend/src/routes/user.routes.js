const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');

// Ruta para crear un nuevo usuario
router.post('/users', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

// Ruta para obtener un usuario por ID
router.get('/users/:id', getUserById);

// Ruta para actualizar un usuario por ID
router.put('/users/:id', updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/users/:id', deleteUser);

module.exports = router;