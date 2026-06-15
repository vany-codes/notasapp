/* eslint-disable no-unused-vars */
import Notas from "../pages/Notas";
import NotaFormulario from "./share/NotaForm";

function Main() {
    const notaPrueba = {
    id: 1,
    titulo: "Comprar leche",
    contenido: "No olvidar comprar leche y pan.",
    fecha: "2024-06-01",
    prioridad: "Alta",
    estado: "privado",
};
    return ( 
        <main className="flex-1 flex items-center justify-center px-6 py-12">
            {/*<Inicio />*/}
            {/*<Notas></Notas>*/}
            <NotaFormulario nota={notaPrueba} />
        </main>
     );
}

export default Main;