import { createContext, useState } from "react";
import { eliminarToken, guardarToken } from "../utils/storage";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);

    const estaAutenticado = !!token;

    const login = (usuario, token) => { // Esta función se llamará cuando el usuario inicie sesión correctamente
        setUsuario(usuario);
        setToken(token);
        guardarToken(token); // Guardar el token en el almacenamiento local del navegador
    };
    
    const logout = () => { // Esta función se llamará cuando el usuario cierre sesión
        setUsuario(null);
        setToken(null);
        eliminarToken(); // Eliminar el token del almacenamiento local del navegador
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