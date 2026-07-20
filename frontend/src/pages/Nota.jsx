function Nota({onClose, onSave}) {
    return ( 
        <>
            <form>
                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-2xl border border-gray-600 text-gray-300 hover:bg-gray-700 transition cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg transition hover:scale-105 cursor-pointer"
                    >
                        {onSave ? "Guardar cambios" : "Guardar nota"}
                    </button>
                </div>
            </form>
        </>
     );
}

export default Nota;