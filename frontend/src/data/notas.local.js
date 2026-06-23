const LOCAL_STORAGE_NOTAS_PUBLICAS_KEY = 'notas_publicas';
const LOCAL_STORAGE_NOTAS_PRIVADAS_KEY = 'notas_privadas';

export const obtenerNNotas = (usuario) => {
    const notasPublicas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTAS_PUBLICAS_KEY)) || [];

    if (usuario === null) {
        return notasPublicas;
    } else {
        const notasPrivadas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTAS_PRIVADAS_KEY)) || [];
        const notasUsuario = notasPrivadas.filter(nota => nota.usuarioId === usuario.id);

        const notas = [...notasPublicas, ...notasUsuario];
        return notas;
    }
}

export const crearNota = (nota, usuario) => {
    const { titulo, contenido, prioridad } = nota;
    if (!titulo.trim() || !contenido.trim()) {
        throw new Error("Todos los campos son obligatorios.");
    }
    const nuevaNota = {
        id: Date.now(),
        titulo: titulo.trim(),
        contenido: contenido.trim(),
        fecha: nota?.fecha || new Date().toISOString().split("T")[0],
        prioridad: prioridad,
        estado: nota.estado,
        usuarioId: usuario ? usuario.id : "Local",
    };

    if (nota.estado === "publico") {
        const notasPublicas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTAS_PUBLICAS_KEY)) || []; // Obtener las notas públicas existentes, el Json.parse convierte el string en un objeto de JavaScript
        notasPublicas.push(nuevaNota);
        localStorage.setItem(LOCAL_STORAGE_NOTAS_PUBLICAS_KEY, JSON.stringify(notasPublicas)); // Guardar las notas públicas actualizadas en el localStorage, el Json.stringify convierte el objeto de JavaScript en un string
    } else {
        const notasPrivadas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTAS_PRIVADAS_KEY)) || []; // Obtener las notas privadas existentes, el Json.parse convierte el string en un objeto de JavaScript
        notasPrivadas.push(nuevaNota);
        localStorage.setItem(LOCAL_STORAGE_NOTAS_PRIVADAS_KEY, JSON.stringify(notasPrivadas)); // Guardar las notas privadas actualizadas en el localStorage, el Json.stringify convierte el objeto de JavaScript en un string
    }
};

export const actualizarNota = (notaActualizada, usuario) => {
    const { id, titulo, contenido, prioridad, estado } = notaActualizada;
    if (!titulo.trim() || !contenido.trim()) {
        throw new Error("Todos los campos son obligatorios.");
    }

    if (estado === "publico") {
        const notasPublicas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTAS_PUBLICAS_KEY)) || [];
        const index = notasPublicas.findIndex(nota => nota.id === id);
        if (index !== -1) { // index !== -1 significa que la nota fue encontrada en el array, ya que findIndex devuelve -1 si no encuentra el elemento y el índice del elemento si lo encuentra
            notasPublicas[index] = { ...notasPublicas[index], titulo: titulo.trim(), contenido: contenido.trim(), prioridad, estado };
            localStorage.setItem(LOCAL_STORAGE_NOTAS_PUBLICAS_KEY, JSON.stringify(notasPublicas));
        }
    } else {
        const notasPrivadas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTAS_PRIVADAS_KEY)) || [];
        const index = notasPrivadas.findIndex(nota => nota.id === id && nota.usuarioId === usuario.id);
        if (index !== -1) {
            notasPrivadas[index] = { ...notasPrivadas[index], titulo: titulo.trim(), contenido: contenido.trim(), prioridad, estado };
            localStorage.setItem(LOCAL_STORAGE_NOTAS_PRIVADAS_KEY, JSON.stringify(notasPrivadas));
        }
    }
};

export const eliminarNota = (notaId, usuario) => {
    const notasPublicas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTAS_PUBLICAS_KEY)) || [];
    const notasPrivadas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTAS_PRIVADAS_KEY)) || [];

    const notaPublicaIndex = notasPublicas.findIndex(nota => nota.id === notaId);
    if (notaPublicaIndex !== -1) {
        notasPublicas.splice(notaPublicaIndex, 1);
        localStorage.setItem(LOCAL_STORAGE_NOTAS_PUBLICAS_KEY, JSON.stringify(notasPublicas));
        return;
    }

    const notaPrivadaIndex = notasPrivadas.findIndex(nota => nota.id === notaId && nota.usuarioId === usuario.id);
    if (notaPrivadaIndex !== -1) {
        notasPrivadas.splice(notaPrivadaIndex, 1);
        localStorage.setItem(LOCAL_STORAGE_NOTAS_PRIVADAS_KEY, JSON.stringify(notasPrivadas));
    }
};