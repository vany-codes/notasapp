const LOCAL_STORAGE_USUARIOS_KEY = 'usuarios';
const LOCAL_STORAGE_SESION_KEY = 'sesionUsuario';

export const obtenerUsuarios = () => {
    const usuariosJSON = localStorage.getItem(LOCAL_STORAGE_USUARIOS_KEY);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
};

export const obtenerSesionUsuario = () => {
    const sesionJSON = localStorage.getItem(LOCAL_STORAGE_SESION_KEY);
    return sesionJSON ? JSON.parse(sesionJSON) : null;
}

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

export const loginUsuario = (email, password) => {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.email === email.trim().toLowerCase() && u.password === password.trim());
    if (!usuario) {
        throw new Error("Correo o contraseña incorrectos.");
    }
    const registro = { id: usuario.id, nombre: usuario.nombre, email: usuario.email };
    localStorage.setItem(LOCAL_STORAGE_SESION_KEY, JSON.stringify(registro));
    return registro;
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