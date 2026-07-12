// Este archivo se encargará de manejar el almacenamiento local del navegador (localStorage) para guardar el token y el usuario así como recuperar la autenticación del usuario.

const TOKEN_KEY = "token"; // Clave para almacenar el token en el almacenamiento local del navegador
const USUARIO_KEY = "usuario"; // Clave para almacenar el usuario en el almacenamiento local del navegador

const guardarDatos = (token, usuario) => {
    localStorage.setItem(TOKEN_KEY, token); // Guardar el token en el almacenamiento local del navegador
    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario)); // Guardar el usuario en el almacenamiento local del navegador
};

const obtenerDatos = () => {
    const token = localStorage.getItem(TOKEN_KEY); // Recuperar el token del almacenamiento local del navegador
    const usuario = JSON.parse(localStorage.getItem(USUARIO_KEY)); // Recuperar el usuario del almacenamiento local del navegador y convertirlo de JSON a objeto
    return { token, usuario }; // Devolver un objeto con el token y el usuario
};

const eliminarDatos = () => {
    localStorage.removeItem(TOKEN_KEY); // Eliminar el token del almacenamiento local del navegador
    localStorage.removeItem(USUARIO_KEY); // Eliminar el usuario del almacenamiento local del navegador
};

export { guardarDatos, obtenerDatos, eliminarDatos };