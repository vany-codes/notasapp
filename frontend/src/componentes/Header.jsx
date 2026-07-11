import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LinkNav from "./share/LinkNav";

function Header() {
    const { usuario, logout } = useContext(AuthContext);

    return (
        <header className="w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                
                {/* Logo / Título */}
                <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text select-none">
                    Notasapp
                </h1>

                {/* Navegación Principal */}
                <nav>
                    <ul className="flex items-center gap-2">
                        <li><LinkNav to="/">Inicio</LinkNav></li>
                        <li><LinkNav to="/notas">Notas</LinkNav></li>
                        <li><LinkNav to="/crear-nota">Crear nota</LinkNav></li>

                        {/* Rutas para usuarios NO autenticados */}
                        {!usuario ? (
                            <>
                                <li><LinkNav to="/registro">Registro</LinkNav></li>
                                <li><LinkNav to="/login">Login</LinkNav></li>
                            </>
                        ) : (
                            /* Botón para usuarios autenticados */
                            <li>
                                <button 
                                    onClick={logout} 
                                    className="ml-2 px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-red-400 bg-gray-800/40 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-300 cursor-pointer"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default Header;