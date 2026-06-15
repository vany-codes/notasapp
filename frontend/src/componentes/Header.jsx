function Header() {
    return (
        <header className="w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

                    <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        Notasapp
                    </h1>

                    <nav>
                        <ul className="flex gap-3">
                            <li>
                                <a
                                    href="#"
                                    className="px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition duration-300"
                                >
                                    Inicio
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition duration-300"
                                >
                                    Acerca de
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition duration-300"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    );
}

export default Header;