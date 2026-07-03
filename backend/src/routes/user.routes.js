const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { registerValidation, loginValidation } = require('../validations/user.validation');
const validate = require('../middlewares/validation.middleware');

// Ruta para crear un nuevo usuario
router.post('/register', registerValidation, validate, registerUser);

// Ruta para iniciar sesión
router.post('/login', loginValidation, validate, loginUser);

// Ruta de prueba para verificar el token (protegida por el middleware de autenticación)
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acceso permitido a la ruta protegida', user: req.user });
});
// Ruta para obtener todos los usuarios, demomento para pruebas, despues se puede eliminar o proteger con un middleware de autenticación
router.get('/users', getUsers);

// Ruta para obtener un usuario por ID
router.get('/users/me', verifyToken, getUserById);

// Ruta para actualizar un usuario por ID
router.put('/users/me', verifyToken, updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/users/me', verifyToken, deleteUser);

module.exports = router;