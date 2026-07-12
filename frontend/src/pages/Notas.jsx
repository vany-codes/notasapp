import {
  Pencil,
  Trash2,
  Calendar,
  Flag,
  Plus,
  Globe,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { obtenerNotasPublicas } from "../utils/notas.storage";

function Notas() {
  const navegar = useNavigate();
  const { usuario, estaAutenticado } = useContext(AuthContext);
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    // Obtener las notas públicas del almacenamiento local
    const cargarNotas = async () => {
      if (estaAutenticado) {

        // Si el usuario esta autenticado, carga todas las notas (públicas y privadas), de momento slo simulara con await new Promise((resolve) => setTimeout(resolve, 500)); // Simula una llamada a la API
        const notasPrivadas = []; // Aquí deberías obtener las notas privadas del usuario autenticado desde tu backend o almacenamiento local
        setNotas([...obtenerNotasPublicas(), ...notasPrivadas]);
      } else {
        const notasPublicas = obtenerNotasPublicas();
        setNotas(notasPublicas);
      }
    };

    cargarNotas();
  }, [estaAutenticado]);


  const handleCrearNota = () => {
    // Navegar a la página de creación de nota
    navegar("/crear-nota");
  }
  
  const colorPrioridad = {
    Alta: "bg-red-500/20 text-red-400",
    Media: "bg-yellow-500/20 text-yellow-400",
    Baja: "bg-green-500/20 text-green-400",
  };

  const colorEstado = {
    Publico: "bg-blue-500/20 text-blue-400",
    Privado: "bg-purple-500/20 text-purple-400",
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-10">
      {/* Encabezado */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">
        <div>
          <h2 className="text-4xl font-black text-white">Mis notas {usuario?.nombre} </h2>

          <p className="text-gray-400 mt-2">
            Tienes {notas.length} notas guardadas.
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl font-semibold text-white transition hover:scale-105"
          onClick={handleCrearNota}
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
            className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-3xl p-6 shadow-xl hover:border-blue-500 transition-all hover:-translate-y-1"
          >
            {/* Cabecera */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{nota.titulo}</h3>

              <div className="flex gap-2">
                <button
                  className=" p-2 rounded-xl hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>

                <button
                  className=" p-2 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-400 "
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
              {nota.contenido}
            </p>

            {/* Footer */}
            <div className="space-y-3">
              {/* Fecha */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                {nota.fecha}
              </div>

              {/* Etiquetas */}
              <div className="flex flex-wrap gap-2">
                {/* Prioridad */}
                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${colorPrioridad[nota.prioridad]}`}
                >
                  <Flag size={14} />
                  {nota.prioridad}
                </span>

                {/* Estado */}
                <span
                  className={` flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${colorEstado[nota.estado]}`}
                >
                  {nota.estado === "Publico" ? (
                    <Globe size={14} />
                  ) : (
                    <Lock size={14} />
                  )}

                  {nota.estado === "Publico" ? "Pública" : "Privada"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Notas;
