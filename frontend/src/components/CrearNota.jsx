import { useNavigate } from "react-router";

function CrearNota() {
    const navegation = useNavigate()

    const handleSave = () => {
        navegation("/mis-notas")
    }

    return ( 
        <>
            <div className="mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-3xl font-black bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Nueva Nota
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Organiza tus pensamientos en un instante.</p>
                </div>

                <form className="space-y-6">
                    {/* Título */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Título de la Nota</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-gray-400" 
                            placeholder="Ej. Compras del supermercado..." 
                        />
                    </div>

                    {/* Fila de Selectores (Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="priority" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Prioridad</label>
                            <select 
                                id="priority" 
                                name="priority" 
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all cursor-pointer"
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
                                name="status" 
                                className="w-full p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all cursor-pointer"
                            >
                                <option value="publico">🌍 Público (Local)</option>
                                <option value="privado">🔒 Privado (Cloud)</option>
                            </select>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Contenido</label>
                        <textarea 
                            id="content" 
                            name="content" 
                            rows="6" 
                            className="w-full p-4 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none" 
                            placeholder="Escribe el contenido de tu nota aquí..."
                        ></textarea>
                    </div>

                    {/* Botón Guardar */}
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