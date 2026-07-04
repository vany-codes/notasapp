const express = require('express');
const router = express.Router();


const { getNotas, getNotasByUsuarioId, createNota, updateNota, deleteNota } = require('../controllers/notas.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { createNotaValidation } = require('../validations/notas.validation');
const validate = require('../middlewares/validation.middleware');

router.get('/notas', getNotas); // Obtener todas las notas en general

router.get('/notas/me', verifyToken, getNotasByUsuarioId); // Obtener todas las notas del usuario autenticado
router.post('/notas/me', verifyToken, createNotaValidation, validate, createNota);
router.put('/notas/:id', verifyToken, createNotaValidation, validate, updateNota);
router.delete('/notas/:id', verifyToken, deleteNota);

module.exports = router;