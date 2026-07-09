import api from "./api";

const postUser = async (userData) => {
    try {
        const {nombre, correo_electronico, contrasena} = userData;
        const respuesta = await api.post("/register",
            {
                nombre: nombre,
                correo_electronico: correo_electronico,
                contrasena: contrasena
            }
        );
        return respuesta.data;
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        throw error;
    }
};

export { postUser };