// Este archivo se encargará de manejar el almacenamiento local del navegador (localStorage) para guardar y recuperar el token de autenticación del usuario.

// Función para guardar el token en el almacenamiento local
export const guardarToken = (token) => {
    localStorage.setItem("token", token);
};

// Función para obtener el token del almacenamiento local
export const obtenerToken = () => {
    return localStorage.getItem("token");
};

// Función para eliminar el token del almacenamiento local
export const eliminarToken = () => {
    localStorage.removeItem("token");
};