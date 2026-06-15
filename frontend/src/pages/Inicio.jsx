function Inicio() {
    return ( 
        <div
                    className="
                        w-full
                        max-w-5xl
                        rounded-3xl
                        bg-gray-800/60
                        backdrop-blur-md
                        border border-gray-700
                        shadow-2xl
                        p-8 md:p-12
                    "
                >

                    {/* Hero */}
                    <section className="text-center mb-12">

                        <h2 className="text-5xl md:text-6xl font-black mb-6 bg-linear-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                            Tus notas, siempre contigo
                        </h2>

                        <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">
                            Guarda ideas, tareas y recordatorios rápidamente.
                            Empieza sin registrarte y sincroniza tus notas cuando quieras.
                        </p>
                    </section>

                    {/* Funcionalidades */}
                    <section className="mb-12">

                        <h3 className="text-3xl font-bold text-center mb-8">
                            Todo lo que puedes hacer
                        </h3>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition">
                                <h4 className="text-xl font-bold mb-3">
                                    ✍️ Notas rápidas
                                </h4>

                                <p className="text-gray-400">
                                    Crea apuntes en segundos sin complicaciones.
                                </p>
                            </div>

                            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition">
                                <h4 className="text-xl font-bold mb-3">
                                    📌 Organiza tus tareas
                                </h4>

                                <p className="text-gray-400">
                                    Prioriza tus pendientes para mantenerte enfocado.
                                </p>
                            </div>

                            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition">
                                <h4 className="text-xl font-bold mb-3">
                                    🔐 Sincronización segura
                                </h4>

                                <p className="text-gray-400">
                                    Crea una cuenta y accede a tus notas desde cualquier dispositivo.
                                </p>
                            </div>

                            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-pink-500 transition">
                                <h4 className="text-xl font-bold mb-3">
                                    🚀 Próximamente
                                </h4>

                                <p className="text-gray-400">
                                    Texto enriquecido, emojis, formatos personalizados y muchas mejoras más.
                                </p>
                            </div>

                        </div>
                    </section>

                    {/* Información adicional */}
                    <section className="text-center mb-10">

                        <p className="text-gray-300 text-lg">
                            Empieza a escribir ahora mismo.
                            Tus notas se guardarán localmente y podrás crear una cuenta cuando quieras sincronizarlas.
                        </p>

                    </section>

                    {/* Botones */}
                    <section className="flex flex-col sm:flex-row gap-4 justify-center">

                        <button
                            className="
                                px-8 py-3
                                rounded-full
                                bg-blue-600
                                hover:bg-blue-500
                                font-bold
                                shadow-lg
                                transition
                                duration-300
                                hover:scale-105
                            "
                        >
                            Comenzar
                        </button>

                        <button
                            className="
                                px-8 py-3
                                rounded-full
                                border border-purple-500
                                hover:bg-purple-500
                                font-bold
                                transition
                                duration-300
                                hover:scale-105
                            "
                        >
                            Crear cuenta
                        </button>

                    </section>

                    {/* Créditos */}
                    <section className="mt-12 text-center">
                        <p className="text-sm text-gray-500">
                            Notasapp fue creada en colaboración con{" "}
                            <span className="font-semibold text-purple-400">
                                perlaGreen
                            </span>
                            .
                        </p>
                    </section>

                </div>
     );
}

export default Inicio;