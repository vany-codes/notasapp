import NotaFormulario from "../componentes/share/NotaForm";

function Nota() {
    return ( 
        <>
            <NotaFormulario onClose={() => console.log("Cerrar formulario")} onSave={(nota) => console.log("Guardar nota", nota)} />
        </>
     );
}

export default Nota;