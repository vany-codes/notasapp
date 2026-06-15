
import {
    Pencil,
    Trash2,
    Calendar,
    Flag,
    Plus
} from "lucide-react";
import notas from "../datos/notas";

function Inicio() {

    const colorPrioridad = {
        Alta: "bg-red-500/20 text-red-400",
        Media: "bg-yellow-500/20 text-yellow-400",
        Baja: "bg-green-500/20 text-green-400",
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-10">

            {/* Encabezado */}
            <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">

                <div>
                    <h2 className="text-4xl font-black text-white">
                        Mis notas
                    </h2>

                    <p className="text-gray-400 mt-2">
                        Tienes {notas.length} notas guardadas.
                    </p>
                </div>

                <button
                    className="
                        flex items-center gap-2
                        bg-blue-600 hover:bg-blue-500
                        px-6 py-3 rounded-2xl
                        font-semibold
                        transition hover:scale-105
                    "
                >
                    <Plus size={20} />
                    Nueva nota
                </button>

            </section>

            {/* Grid de notas */}
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {notas.map((nota) => (

                    <article
                        key={nota.id}
                        className="
                            bg-gray-800/60
                            backdrop-blur-md
                            border border-gray-700
                            rounded-3xl
                            p-6
                            shadow-xl
                            hover:border-blue-500
                            transition-all
                            hover:-translate-y-1
                        "
                    >

                        {/* Título */}
                        <div className="flex items-start justify-between mb-4">

                            <h3 className="text-2xl font-bold text-white">
                                {nota.titulo}
                            </h3>

                            <div className="flex gap-2">

                                <button
                                    className="
                                        p-2 rounded-xl
                                        hover:bg-blue-500/20
                                        text-gray-400 hover:text-blue-400
                                        transition
                                    "
                                    title="Editar"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    className="
                                        p-2 rounded-xl
                                        hover:bg-red-500/20
                                        text-gray-400 hover:text-red-400
                                        transition
                                    "
                                    title="Eliminar"
                                >
                                    <Trash2 size={18} />
                                </button>

                            </div>

                        </div>

                        {/* Contenido */}
                        <p className="text-gray-300 mb-6 line-clamp-3">
                            {nota.contenido}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Calendar size={16} />
                                {nota.fecha}
                            </div>

                            <span
                                className={`
                                    px-3 py-1 rounded-full
                                    text-sm font-semibold
                                    ${colorPrioridad[nota.prioridad]}
                                `}
                            >
                                <Flag size={14} className="inline mr-1" />
                                {nota.prioridad}
                            </span>

                        </div>

                    </article>

                ))}

            </section>

        </div>
    );
}

export default Inicio;