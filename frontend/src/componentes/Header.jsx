import LinkNav from "./share/LinkNav";

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
                                <LinkNav to="/" children="Inicio" />
                            </li>

                            <li>
                                <LinkNav to="/notas" children="Notas" />
                            </li>

                            <li>
                                <LinkNav to="/crear-nota" children="Crear nota" />
                            </li>

                            <li>
                                <LinkNav to="/registro" children="Registro" />
                            </li>

                            <li>
                                <LinkNav to="/login" children="Login" />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    );
}

export default Header;