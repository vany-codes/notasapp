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

const postLogin = async (loginData) => {
    try {
        const { correo_electronico, contrasena } = loginData;
        const respuesta = await api.post("/login",
            {
                correo_electronico: correo_electronico,
                contrasena: contrasena
            }
        );
        return respuesta.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};

export { postUser, postLogin };