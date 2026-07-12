import { createContext, useState } from "react";
import { eliminarDatos, guardarDatos, obtenerDatos, } from "../utils/usuario.storage";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => obtenerDatos().usuario); // Inicializa el estado del usuario con los datos almacenados en el almacenamiento local del navegador
    const [token, setToken] = useState(() => obtenerDatos().token); // Inicializa el estado del token con los datos almacenados en el almacenamiento local del navegador

    

    const estaAutenticado = !!token;

    const login = (usuario, token) => { // Esta función se llamará cuando el usuario inicie sesión correctamente
        setUsuario(usuario);
        setToken(token);
        guardarDatos(token, usuario); // Guardar el token y el usuario en el almacenamiento local del navegador
    };
    
    const logout = () => { // Esta función se llamará cuando el usuario cierre sesión
        setUsuario(null);
        setToken(null);
        eliminarDatos(); // Eliminar el token y el usuario del almacenamiento local del navegador
    };

    // El doble signo de admiración (!!) convierte cualquier valor en un booleano:

    /*
        !!null          // false
        !!undefined     // false
        !!{}            // true
        !!"Hola"        // true
    */
    
    return (
        <AuthContext.Provider value={{ usuario, token, estaAutenticado, login, logout }}> {/* Proporciona el estado y las funciones de autenticación a los componentes hijos */}
            {children}
        </AuthContext.Provider>
    );
};