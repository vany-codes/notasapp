const { body } = require('express-validator');

const createNotaValidation = [
    body('titulo')
        .trim()
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El título debe tener entre 3 y 100 caracteres'),
        body('contenido')
        .trim()
        .notEmpty()
        .withMessage('El contenido es obligatorio'),
        body('prioridad')
        .trim()
        .notEmpty()
        .withMessage('La prioridad es obligatoria'),
        body('estado')
        .trim()
        .notEmpty()
        .withMessage('El estado es obligatorio'),

];

module.exports = {
    createNotaValidation
};