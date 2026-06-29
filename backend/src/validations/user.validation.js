const { body } = require("express-validator");

const registerValidation = [

    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

    body("correo_electronico")
        .trim()
        .notEmpty()
        .withMessage("El correo es obligatorio")
        .isEmail()
        .withMessage("Correo electrónico inválido")
        .normalizeEmail(),

    body("contrasena")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 })
        .withMessage("Debe tener mínimo 6 caracteres")
        .matches(/[A-Z]/)
        .withMessage("Debe contener una mayúscula")
        .matches(/[a-z]/)
        .withMessage("Debe contener una minúscula")
        .matches(/[0-9]/)
        .withMessage("Debe contener un número")

];

const loginValidation = [

    body("correo_electronico")
        .trim()
        .notEmpty()
        .withMessage("El correo es obligatorio")
        .isEmail()
        .withMessage("Correo inválido"),

    body("contrasena")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")

];

module.exports = {
    registerValidation,
    loginValidation
};