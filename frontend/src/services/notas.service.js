import api from "./api";

const postNota = async (nota, token) => {
    const respuesta = await api.post("notas/me", nota, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return respuesta.data;
};

const getNotas = async (token) => {
    const respuesta = await api.get("notas/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return respuesta.data;
};

export { postNota, getNotas };