function ModalDelet({ nota, onClose, onDelete }) {

    const handleEliminar = () => {
        onDelete(nota);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-gray-700 p-6 shadow-2xl">

                <h2 className="text-2xl font-bold text-white mb-4">
                    Confirmar eliminación
                </h2>

                <p className="text-gray-300 mb-6">
                    ¿Estás seguro de eliminar la nota{nota.id && (
                        <span className="font-semibold text-white">
                            "{nota.titulo}"
                        </span>
                    )}
                    ? Esta acción no se puede deshacer.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleEliminar}
                        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white transition"
                    >
                        Eliminar
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ModalDelet;