import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { guardarNotasPublicas } from "../../utils/notas.storage";
import { postNota } from "../../services/notas.service";

function NotaFormulario({ nota, onClose, onSave }) {
    const navegar = useNavigate();
    const [error, setError] = useState("");
    const { estaAutenticado, token, logout } = useContext(AuthContext);


    // Inicializamos el estado directamente con los datos de la nota (si existen)
    const [titulo, setTitulo] = useState(nota?.titulo || "");
    const [contenido, setContenido] = useState(nota?.contenido || "");
    const [prioridad, setPrioridad] = useState(nota?.prioridad || "Baja");
    
    // Si no está autenticado, el estado por defecto SIEMPRE debe ser Publico
    const [estado, setEstado] = useState(nota?.estado || "Publico");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaNota = {
            ...(nota && { id: nota.id }),
            titulo,
            contenido,
            prioridad,
            estado: estaAutenticado ? estado : "Publico", // Doble check por seguridad
        };

        try {
            // Valida si el usuario está autenticado y si intenta guardar una nota privada, para mandarla al backend
            if (nuevaNota.estado === "Privado" && estaAutenticado) {
                const respuesta = await postNota(nuevaNota, token);
                console.log("Nota guardada en el backend:", respuesta);
            } else {
                guardarNotasPublicas(nuevaNota);
            }
            navegar("/notas");

        } catch (err) {
            // setError(err.response?.data?.message || "Error al guardar la nota. Por favor, inténtalo de nuevo.");
            if (err.response?.data?.message) {
                setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
                console.error(`Error al guardar la nota: ${err.response.data.message}`);
                logout();
            } else {
                console.error("Error al guardar la nota. Por favor, inténtalo de nuevo.");
            }
        }
    }; // Cierra handleSubmit correctamente
    const handleCancelar = () => {
        navegar("/notas"); // Es más amigable devolver al usuario a la lista
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl p-8">
            {/* Error */}
            
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        ⚠ {error}
                    </div>
                )}
            <h2 className="text-3xl font-black text-white mb-2">
                {nota ? "Editar nota" : "Nueva nota"}
            </h2>

            <p className="text-gray-400 mb-8">
                {nota ? "Modifica la información de tu nota." : "Completa la información de tu nota."}
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Título */}
                <div>
                    <label htmlFor="titulo" className="block text-sm font-semibold text-gray-300 mb-2">
                        Título
                    </label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ej. Comprar ingredientes"
                        className="w-full px-4 py-3 rounded-2xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* Contenido */}
                <div>
                    <label htmlFor="contenido" className="block text-sm font-semibold text-gray-300 mb-2">
                        Contenido
                    </label>
                    <textarea
                        id="contenido"
                        rows="6"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Escribe aquí tu nota..."
                        className="w-full px-4 py-3 rounded-2xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                        required
                    />
                </div>

                {/* Selects */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Prioridad */}
                    <div>
                        <label htmlFor="prioridad" className="block text-sm font-semibold text-gray-300 mb-2">
                            Prioridad
                        </label>
                        <select
                            id="prioridad"
                            value={prioridad}
                            onChange={(e) => setPrioridad(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="Baja">🟢 Baja</option>
                            <option value="Media">🟡 Media</option>
                            <option value="Alta">🔴 Alta</option>
                        </select>
                    </div>

                    {/* Estado (Simplificado y corregido) */}
                    <div>
                        <label htmlFor="estado" className="block text-sm font-semibold text-gray-300 mb-2">
                            Estado
                        </label>
                        <select
                            id="estado"
                            value={estaAutenticado ? estado : "Publico"}
                            onChange={(e) => setEstado(e.target.value)}
                            disabled={!estaAutenticado} // Deshabilitado si es invitado
                            className="w-full px-4 py-3 rounded-2xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="Publico">🌍 Público</option>
                            {estaAutenticado && <option value="Privado">🔒 Privado</option>}
                        </select>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleCancelar}
                        className="px-6 py-3 rounded-2xl border border-gray-600 text-gray-300 hover:bg-gray-700 transition cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg transition hover:scale-105 cursor-pointer"
                    >
                        {nota ? "Guardar cambios" : "Guardar nota"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NotaFormulario;