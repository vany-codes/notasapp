const LOCAL_STORAGE_USUARIOS_KEY = 'usuarios';

export const obtenerUsuarios = () => {
    const usuariosJSON = localStorage.getItem(LOCAL_STORAGE_USUARIOS_KEY);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
};

export const crearUsuario = (usuario) => {
    const { nombre, email, password } = usuario;
    if (!nombre.trim() || !email.trim() || !password) {
        throw new Error("Todos los campos son obligatorios.");
    }

    // validar si el correo ya existe
    const usuarios = obtenerUsuarios();
    if (usuarios.some(u => u.email === email.trim().toLowerCase())) {
        throw new Error("El correo ya está registrado.");
    }

    const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
    };
    usuarios.push(nuevoUsuario);
    localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuarios));


    return nuevoUsuario;
};

export const editarUsuario = (id, nombre, email, password) => {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) {
        throw new Error("Usuario no encontrado.");
    }
    if (nombre) usuarios[index].nombre = nombre.trim();
    if (email) usuarios[index].email = email.trim().toLowerCase();
    if (password) usuarios[index].password = password.trim();
    localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuarios));
    return usuarios[index];
};

export const eliminarUsuario = (id) => {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) {
        throw new Error("Usuario no encontrado.");
    }
    const usuarioEliminado = usuarios.splice(index, 1)[0];
    localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuarios));
    return usuarioEliminado;
}