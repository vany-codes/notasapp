import { Link } from "react-router";

function Headers() {
    return ( 
        <>
            <header className="w-full max-w-5xl mx-auto bg-gray-800 text-white p-4 flex justify-between items-center rounded-b-lg shrink-0 shadow-lg">
                {/* LOGO: Usando colores más claros para resaltar en el fondo oscuro */}
                <h1 className="text-2xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                NotaApp
                </h1>
                <nav className="flex gap-4 text-sm md:text-base">
                    <Link to="/" className="transition-colors hover:text-blue-400">inicio</Link>
                    <Link to="/nueva" className="transition-colors hover:text-blue-400">Nueva Nota</Link>
                    <Link to="/mis-notas" className="transition-colors hover:text-blue-400">Notas</Link>
                    <Link to="/login" className="transition-colors hover:text-blue-400">Inicio de Sesión</Link>
                    <Link to="/register" className="transition-colors hover:text-blue-400">Registro</Link>
            </nav>
      </header>
        </>
     );
}

export default Headers;