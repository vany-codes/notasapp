import CardNota from "./CardNota";
function Notas() {
    // Simulando datos que vendrán de tu base de datos o estado
  const notasPrueba = [
    {
      id: 1,
      titulo: "Que es Node.js",
      contenido: "Node.js es un entorno de ejecución de JavaScript construido sobre el motor V8 de Chrome. Permite ejecutar código JavaScript en el servidor...",
      prioridad: "Media",
      estado: "Público",
      fecha: "Hace 2 min"
    },
    {
      id: 2,
      titulo: "Que es JavaScript",
      contenido: "JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Orientado a objetos y multiparadigma.",
      prioridad: "Alta",
      estado: "Público",
      fecha: "Ayer"
    },
    {
      id: 3,
      titulo: "Que es React",
      contenido: "Biblioteca de JavaScript para construir interfaces de usuario. Desarrollada por Facebook para crear SPAs eficientes.",
      prioridad: "Baja",
      estado: "Público",
      fecha: "Hace 1 hora"
    },
    {
      id: 4,
      titulo: "Que es Tailwind CSS",
      contenido: "Framework de CSS que proporciona clases utilitarias para construir diseños personalizados directamente en el HTML.",
      prioridad: "Baja",
      estado: "Privado",
      fecha: "Hace 3 días"
    }
  ];
    return ( 
        <>
            <div className="max-w-4xl mx-auto h-full rounded-xl flex flex-col items-center">
          
                {/* Título de la sección */}
                <div className="w-full mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                    Mis Notas <span className="text-blue-500 text-sm ml-2 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">{notasPrueba.length}</span>
                    </h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all active:scale-95">
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