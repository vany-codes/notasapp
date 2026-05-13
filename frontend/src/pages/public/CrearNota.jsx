import { useState } from "react";
import { useNavigate } from "react-router"; // Asegúrate que sea react-router-dom
import ErrorMessage from "../../components/compartidos/ModalError.Components";

function CrearNota() {
    const navigate = useNavigate(); // Cambiado a navigate
    
    // Corregido: Uso de [] en lugar de {}
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [prioridad, setPrioridad] = useState("low");
    const [estado, setEstado] = useState("publico");
    const [ errores, setErrores ] = useState({});


    const handleSave = (e) => {
        e.preventDefault(); // Importante: evita que la página se recargue
        let listaErrores = {};

        const nuevaNota = { 
            id: Date.now(), // Añadimos un ID para que React sea feliz
            titulo, 
            contenido, 
            prioridad, 
            estado 
        };

        if (!titulo.trim() && !contenido.trim()) listaErrores.general = "El título o el contenido no pueden estar vacíos";
        

        if (Object.keys(listaErrores).length > 0) {
            setErrores(listaErrores);
            return;
        }

        // Aquí guardarías en tu lista o base de datos
        console.log("Nota guardada:", nuevaNota);
        
        // Si quieres navegar después de guardar:
        navigate("/mis-notas");
    }

    return ( 
        <>
            <div className="mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-3xl font-black bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Nueva Nota
                </h2>
                <p className="text-gray-500 text-sm mt-1">Organiza tus pensamientos en un instante.</p>
            </div>

            {/* Añadimos onSubmit al form en lugar de onClick al botón */}
            <form className="space-y-6" onSubmit={handleSave}>
                <div>
                    <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Título de la Nota</label>
                    <input 
                        type="text" 
                        id="title" 
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" 
                        placeholder="Ej. Compras del supermercado..." 
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="priority" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Prioridad</label>
                        <select 
                            id="priority" 
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                            value={prioridad}
                            onChange={(e) => setPrioridad(e.target.value)}
                        >
                            <option value="low">🟢 Baja</option>
                            <option value="medium">🟡 Media</option>
                            <option value="high">🔴 Alta</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Estado de acceso</label>
                        <select 
                            id="status" 
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="publico">🌍 Público (Local)</option>
                            <option value="privado">🔒 Privado (Cloud)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Contenido</label>
                    <textarea 
                        id="content" 
                        rows="6" 
                        className="w-full p-4 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none" 
                        placeholder="Escribe el contenido de tu nota aquí..."
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        required
                    ></textarea>

                    <ErrorMessage mensaje={errores.general} />
                </div>

                <div className="flex justify-end pt-2">
                    <button 
                        type="submit" 
                        className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer" onClick={handleSave}
                    >
                        <span>💾</span> Guardar Nota
                    </button>
                </div>
            </form>
        </>
     );
}

export default CrearNota;