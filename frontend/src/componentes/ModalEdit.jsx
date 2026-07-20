import NotaFormulario from "./share/NotaForm";

function ModalEdit({ nota }) {
    return ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <NotaFormulario nota={nota} />
        </div>
     );
}

export default ModalEdit;