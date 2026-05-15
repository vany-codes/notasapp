import { useNavigate } from "react-router";
import CardNota from "../../components/CardNota";
import leerMemory from "../../memory/leer.memory";
function Notas() {
  const navegar = useNavigate();
  const notasPrueba = leerMemory();
   
    return ( 
        <>
            <div className="max-w-4xl mx-auto h-full rounded-xl flex flex-col items-center">
          
                {/* Título de la sección */}
                <div className="w-full mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                    Mis Notas <span className="text-blue-500 text-sm ml-2 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">{notasPrueba.length}</span>
                    </h2>
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                        onClick={() => navegar("/nueva")}
                    >
                        + Nueva Nota
                    </button>
                </div>

                {/* Listado de Notas */}
                <div className="w-full grid grid-cols-1 gap-1">
                    {notasPrueba.map((nota) => (
                    <CardNota 
                        key={nota.id}
                        titulo={nota.titulo}
                        contenido={nota.contenido}
                        prioridad={nota.prioridad}
                        estado={nota.estado}
                        fecha={nota.fecha}
                    />
                    ))}
                </div>
                
            </div>
        </>
     );
}

export default Notas;