function Headers() {
    return ( 
        <>
            <header className="w-full max-w-5xl mx-auto bg-gray-800 text-white p-4 flex justify-between items-center rounded-b-lg shrink-0 shadow-lg">
                {/* LOGO: Usando colores más claros para resaltar en el fondo oscuro */}
                <h1 className="text-2xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                NotaApp
                </h1>
                <nav className="flex gap-4 text-sm md:text-base">
                <a href="inicio" className="transition-colors hover:text-blue-400">inicio</a>
                <a href="new" className="transition-colors hover:text-blue-400">Nueva Nota</a>
                <a href="notes" className="transition-colors hover:text-blue-400">Notas</a>
                <a href="login" className="transition-colors hover:text-blue-400">Inicio de Sesión</a>
                <a href="register" className="transition-colors hover:text-blue-400">Registro</a>
            </nav>
      </header>
        </>
     );
}

export default Headers;