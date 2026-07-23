import { useContext, useState } from "react";
import NotaFormulario from "../componentes/share/NotaForm";
import { postNota } from "../services/notas.service";
import { AuthContext } from "../context/AuthContext";
import { guardarNotasPublicas } from "../utils/notas.storage";

function Nota() {
    const { token } = useContext(AuthContext);
    const [error, setError] = useState("");
    const handleCancelar = () => {
        console.log("Cerrar formulario perros");
    };

    const handleGuardar = async (nota) => {
        console.log("Guardar notas perros", nota);
        try {
            if (nota.estado === "Privado") {
                const notaGuardada = await postNota(nota, token);
                console.log("Nota privada guardada en el backend:", notaGuardada);
            } else {
                if (nota.titulo.trim() === "" || nota.contenido.trim() === "" ) {
                    setError("El título y el contenido no pueden estar vacíos.");
                    return false; // Evita que se guarde la nota si el título o contenido están vacíos
                }
                guardarNotasPublicas(nota);
                console.log("Nota pública guardada:", nota);
            }
        } catch (err) {
            // setError(err.response?.data?.message || "Error al guardar la nota. Por favor, inténtalo de nuevo.");
            if (err.response?.data?.message) {
                setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
                console.error(`Error al guardar la nota: ${err.response.data.message}`);
            } else {
                console.error("Error al guardar la nota. Por favor, inténtalo de nuevo.");
            }
        }
    };

    return ( 
        <>
            <NotaFormulario onClose={handleCancelar} onSave={handleGuardar} error={error} />
        </>
     );
}

export default Nota;