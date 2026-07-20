import {
  Pencil,
  Trash2,
  Calendar,
  Flag,
  Plus,
  Globe,
  Lock,
} from "lucide-react";
import ModalDelet from "../componentes/ModalDelet";
import { useNavigate } from "react-router";
import ModalEdit from "../componentes/ModalEdit";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { eliminarNotasPublicas, obtenerNotasPublicas } from "../utils/notas.storage";
import { deleteNota, getNotas } from "../services/notas.service";

function Notas() {
  const navegar = useNavigate();
  const { usuario, estaAutenticado, token } = useContext(AuthContext);
  const [notas, setNotas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdit, setMostrarModalEdit] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);

  useEffect(() => {
    // Obtener las notas públicas del almacenamiento local
    const cargarNotas = async () => {
      if (estaAutenticado) {

        const notasPrivadas = await getNotas(token);
        setNotas([...obtenerNotasPublicas(), ...notasPrivadas]);
        console.log("Notas privadas y publicas");
      } else {
        const notasPublicas = obtenerNotasPublicas();
        setNotas(notasPublicas);
        console.log("Notas publicas");
      }
    };

    cargarNotas();
  }, [estaAutenticado, token]);


  const handleCrearNota = () => {
    // Navegar a la página de creación de nota
    navegar("/crear-nota");
  }

  const handleEliminarNota = (nota) => {
    setNotaSeleccionada(nota);
    setMostrarModal(true);
  };
  const confirmarEliminar = async (nota) => {
  console.log("Eliminar nota:", nota.id, nota.estado);

  try {
    if (nota.estado === "Privado" && estaAutenticado) {
      const respuesta = await deleteNota(nota.id, token);
      console.log("Respuesta eliminación:", respuesta);
    } else if (nota.estado === "Publico") {
      eliminarNotasPublicas(nota.id);
      console.log("Nota pública eliminada:", nota.id);
    }

    // Actualizar la lista en pantalla
    setNotas((prevNotas) =>
      prevNotas.filter((n) => n.id !== nota.id)
    );

    setMostrarModal(false);
    setNotaSeleccionada(null);

  } catch (err) {
    console.error("Error completo:", err);

    if (err.response?.data?.errors) {
      console.error(
        "Error del backend:",
        err.response.data.errors[0].mensaje
      );
    } else {
      console.error(
        "Error del backend:",
        err.response?.data?.message || err.message
      );
    }
  }
};
  
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
    <>
      {mostrarModal && (
        <ModalDelet
          nota={notaSeleccionada}
          onClose={() => setMostrarModal(false)}
          onDelete={confirmarEliminar}
        />
      )}
      {mostrarModalEdit && (
        <ModalEdit
          nota={notaSeleccionada}
          onClose={() => setMostrarModalEdit(false)}
        />
      )}
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
                  onClick={() => {
                    setNotaSeleccionada(nota);
                    setMostrarModalEdit(true);
                  }}
                >
                  <Pencil size={18} />
                </button>

                <button
                  className=" p-2 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-400 "
                  title="Eliminar"
                  onClick={() => handleEliminarNota(nota)}
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
    </>
  );
}

export default Notas;
