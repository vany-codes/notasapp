const { validationResult } = require("express-validator");

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        success: false,
        errors: errors.array().map(error => ({
            campo: error.path,
            mensaje: error.msg
        }))
    });

};

module.exports = validate;