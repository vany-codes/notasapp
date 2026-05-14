
const CardNota = ({ titulo, contenido, prioridad, estado, fecha }) => {
  
  // Mapeo de colores según la prioridad
  const configPrioridad = {
    Alta: {
      border: 'border-red-500',
      badge: 'bg-red-100 text-red-700',
      dot: 'bg-red-500'
    },
    Media: {
      border: 'border-amber-500',
      badge: 'bg-amber-100 text-amber-700',
      dot: 'bg-amber-500'
    },
    Baja: {
      border: 'border-emerald-500',
      badge: 'bg-emerald-100 text-emerald-700',
      dot: 'bg-emerald-500'
    }
  };

  const estilo = configPrioridad[prioridad] || configPrioridad.Baja;

  return (
    <div className={`w-full my-3 p-5 bg-white rounded-xl shadow-sm hover:shadow-md border-l-6 ${estilo.border} cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group`}>
      
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors flex items-center gap-2">
          <span className="text-blue-500 text-sm">📌</span> {titulo}
        </h4>
        <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-500 rounded-md border border-gray-200">
          {estado}
        </span>
      </div>

      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
        {contenido}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-tight shadow-xs shadow-black/5" style={{ backgroundColor: estilo.badge.split(' ')[0], color: estilo.badge.split(' ')[1] }}>
            <span className={`w-1.5 h-1.5 rounded-full ${estilo.dot} animate-pulse`}></span>
            {prioridad}
          </span>
        </div>
        <span className="text-[11px] text-gray-400 font-medium">{fecha}</span>
      </div>
      
    </div>
  );
};

export default CardNota;