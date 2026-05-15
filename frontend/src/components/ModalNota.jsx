import { createPortal } from "react-dom";

const ModalNota = ({ isOpen, onClose, titulo, contenido, prioridad, estado }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-9999 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{titulo}</h3>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <span className="px-2 py-1 text-xs font-semibold rounded">
            Prioridad: {prioridad}
          </span>

          <span className="ml-2 px-2 py-1 text-xs font-semibold bg-gray-100 rounded">
            Estado: {estado}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{contenido}</p>
      </div>
    </div>,
    document.body
  );
};

export default ModalNota;