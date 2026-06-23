/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { obtenerSesionUsuario } from "../../data/usuario.local";
import { crearNota } from "../../data/notas.local";

function NotaFormulario({ nota }) {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [prioridad, setPrioridad] = useState("Baja");
    const [estado, setEstado] = useState("publico");

    useEffect(() => {
        if (nota) {
            setTitulo(nota.titulo);
            setContenido(nota.contenido);
            setPrioridad(nota.prioridad);
            setEstado(nota.estado);
        }
    }, [nota]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevaNota = {
            ...(nota && { id: nota.id }),
            titulo,
            contenido,
            prioridad,
            estado,
        };

        const usuario = obtenerSesionUsuario();

        crearNota(nuevaNota, usuario);

        console.log("Nota guardada:", nuevaNota);

        // Si es una nueva nota, limpiamos el formulario
        if (!nota) {
            setTitulo("");
            setContenido("");
            setPrioridad("Baja");
            setEstado("publico");
        }
    };

    return (
        <div
            className="
                w-full
                max-w-2xl
                mx-auto
                bg-gray-800/60
                backdrop-blur-md
                border border-gray-700
                rounded-3xl
                shadow-2xl
                p-8
            "
        >
            <h2 className="text-3xl font-black text-white mb-2">
                {nota ? "Editar nota" : "Nueva nota"}
            </h2>

            <p className="text-gray-400 mb-8">
                {nota
                    ? "Modifica la información de tu nota."
                    : "Completa la información de tu nota."}
            </p>

            <form
                className="space-y-6"
                onSubmit={handleSubmit}
            >
                {/* Título */}
                <div>
                    <label
                        htmlFor="titulo"
                        className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                        Título
                    </label>

                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ej. Comprar ingredientes"
                        className="
                            w-full
                            px-4
                            py-3
                            rounded-2xl
                            bg-gray-900
                            border border-gray-700
                            text-white
                            placeholder-gray-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-transparent
                            transition
                        "
                        required
                    />
                </div>

                {/* Contenido */}
                <div>
                    <label
                        htmlFor="contenido"
                        className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                        Contenido
                    </label>

                    <textarea
                        id="contenido"
                        name="contenido"
                        rows="6"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Escribe aquí tu nota..."
                        className="
                            w-full
                            px-4
                            py-3
                            rounded-2xl
                            bg-gray-900
                            border border-gray-700
                            text-white
                            placeholder-gray-500
                            resize-none
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-transparent
                            transition
                        "
                        required
                    />
                </div>

                {/* Selects */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Prioridad */}
                    <div>
                        <label
                            htmlFor="prioridad"
                            className="block text-sm font-semibold text-gray-300 mb-2"
                        >
                            Prioridad
                        </label>

                        <select
                            id="prioridad"
                            name="prioridad"
                            value={prioridad}
                            onChange={(e) => setPrioridad(e.target.value)}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-2xl
                                bg-gray-900
                                border border-gray-700
                                text-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-transparent
                                transition
                            "
                        >
                            <option value="baja">🟢 Baja</option>
                            <option value="media">🟡 Media</option>
                            <option value="alta">🔴 Alta</option>
                        </select>
                    </div>

                    {/* Estado */}
                    <div>
                        <label
                            htmlFor="estado"
                            className="block text-sm font-semibold text-gray-300 mb-2"
                        >
                            Estado
                        </label>

                        <select
                            id="estado"
                            name="estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-2xl
                                bg-gray-900
                                border border-gray-700
                                text-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-transparent
                                transition
                            "
                        >
                            <option value="publico">🌍 Público</option>
                            <option value="privado">🔒 Privado</option>
                        </select>
                    </div>

                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">

                    <button
                        type="button"
                        onClick={() => {
                            setTitulo("");
                            setContenido("");
                            setPrioridad("baja");
                            setEstado("publico");
                        }}
                        className="
                            px-6
                            py-3
                            rounded-2xl
                            border
                            border-gray-600
                            text-gray-300
                            hover:bg-gray-700
                            transition
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="
                            px-6
                            py-3
                            rounded-2xl
                            bg-blue-600
                            hover:bg-blue-500
                            text-white
                            font-semibold
                            shadow-lg
                            transition
                            hover:scale-105
                        "
                    >
                        {nota ? "Guardar cambios" : "Guardar nota"}
                    </button>

                </div>
            </form>
        </div>
    );
}

export default NotaFormulario;