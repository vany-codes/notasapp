import api from "./api";

const postUser = async (userData) => {
    const respuesta = await api.post("/register", userData);
    return respuesta.data;
};

const postLogin = async (loginData) => {
    const respuesta = await api.post("/login", loginData);
    return respuesta.data;
};

export { postUser, postLogin };