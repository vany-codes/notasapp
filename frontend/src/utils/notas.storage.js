// Solo guaredara las notas publicas, no las privadas, ya que estas se guardan en el backend y no en el localStorage
const NOTAS_PUBLICAS_KEY = "notas_publicas"; // Clave para almacenar las notas públicas en el almacenamiento local del navegador

const obtenerNotasPublicas = () => {
    const notas = JSON.parse(localStorage.getItem(NOTAS_PUBLICAS_KEY)) || []; // Recuperar las notas públicas del almacenamiento local del navegador y convertirlo de JSON a objeto, si no hay notas, devuelve un array vacío
    return notas;
}

const guardarNotasPublicas = (notas) => {
    const { titulo, contenido, prioridad, estado, fecha } = notas; // Desestructurar el objeto notas para obtener el título y el contenido

    const nuevaNota = {
        id: Date.now(), // Generar un id único para la nota usando la fecha actual en milisegundos
        titulo: titulo.trim(), // Eliminar los espacios en blanco al inicio y al final del título
        contenido: contenido.trim(), // Eliminar los espacios en blanco al inicio y al final del contenido
        fecha: fecha || new Date().toISOString(), // Guardar la fecha de creación de la nota en formato ISO
        prioridad: prioridad, // Guardar la prioridad de la nota
        estado: estado || "Público", // Guardar el estado de la nota como público si no se proporciona
        updatedAt: new Date().toISOString(), // Guardar la fecha de actualización de la nota en formato ISO
    }

    const notasExistentes = obtenerNotasPublicas(); // Obtener las notas públicas existentes del almacenamiento local del navegador
    const notasActualizadas = [...notasExistentes, nuevaNota]; // Crear un nuevo array con las notas existentes y la nueva nota
    localStorage.setItem(NOTAS_PUBLICAS_KEY, JSON.stringify(notasActualizadas)); // Guardar las notas actualizadas en el almacenamiento local del navegador
}

const eliminarNotasPublicas = (id) => {
    const notasExistentes = obtenerNotasPublicas(); // Obtener las notas públicas existentes del almacenamiento local del navegador
    const notasActualizadas = notasExistentes.filter(nota => nota.id !== id); // Crear un nuevo array con las notas existentes que no tengan el id de la nota a eliminar
    localStorage.setItem(NOTAS_PUBLICAS_KEY, JSON.stringify(notasActualizadas)); // Guardar las notas actualizadas en el almacenamiento local del navegador
};

export { guardarNotasPublicas, obtenerNotasPublicas, eliminarNotasPublicas };