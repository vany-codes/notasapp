import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import NotaFormulario from "../componentes/share/NotaForm";
import { postNota } from "../services/notas.service";
import { AuthContext } from "../context/AuthContext";
import { guardarNotasPublicas } from "../utils/notas.storage";

function Nota() {
    const { logout, token } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleCancelar = () => {
        console.log("Cerrar formulario perros");
    };

    const handleGuardar = async (nota) => {
        console.log("Guardar notas perros", nota);
        try {
            if (nota.estado === "Privado") {
                const notaGuardada = await postNota(nota, token);
                console.log("Nota privada guardada en el backend:", notaGuardada);
                navigate("/notas");
            } else {
                if (nota.titulo.trim() === "" || nota.contenido.trim() === "" ) {// Recordatoro convertirlo en una función de validación para reutilizarlo en otros lugares del código
                    setError("El título y el contenido no pueden estar vacíos.");
                    return false; // Evita que se guarde la nota si el título o contenido están vacíos
                }
                navigate("/notas");
                guardarNotasPublicas(nota);
                console.log("Nota pública guardada:", nota);
            }
        } catch (err) {
            if (err.response?.data?.message) {// Maneja el caso de error de sesión expirada, recordatorio es necesario ajustar el backend para que devuelva un mensaje de error adecuado cuando la sesión haya expirado
                setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
                console.error(`Error al guardar la nota: ${err.response.data.message}`);
            } else if (err.response?.data?.errors) {
                setError(err.response.data.errors[0].mensaje);
            } else {
                console.error("Error al guardar la nota. Por favor, inténtalo de nuevo.");
            }
            logout(); // Cierra la sesión si hay un error al guardar la nota
        }
    };

    return ( 
        <>
            <NotaFormulario onClose={handleCancelar} onSave={handleGuardar} error={error} />
        </>
     );
}

export default Nota;