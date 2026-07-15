const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization; // Obtiene el encabezado de autorización de la solicitud
    if (!authHeader) { // Verifica si el encabezado de autorización está presente
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // Extrae el token del encabezado de autorización

    if (!token) { // Verifica si el token está presente
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica el token usando la clave secreta
        req.user = decoded; // Almacena la información decodificada del usuario en la solicitud para su uso posterior
        next(); // Llama a la siguiente función de middleware o ruta
    } catch (error) {
        // console.error(error.name, error.message); // Imprime el nombre y mensaje del error en la consola para depuración

        if (error.name === "TokenExpiredError") { // Verifica si el error es debido a que el token ha expirado
            return res.status(401).json({ message: "Token expirado" });
        } else if (error.name === "JsonWebTokenError") { // Verifica si el error es debido a un token inválido
            return res.status(401).json({ message: "Token inválido" });
        } else {
            return res.status(500).json({ message: "Error al verificar el token" }); // Maneja otros errores inesperados
        }
    }
};

module.exports = {
    verifyToken,
};