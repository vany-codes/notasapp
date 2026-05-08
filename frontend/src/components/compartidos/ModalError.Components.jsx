// ✅ Correcto
function ErrorMessage({ mensaje }) {
    if (!mensaje) return null;
    return ( 
        <div>
            <p className="text-red-500 text-md italic mt-1 ml-1 animate-pulse"> ⚠️ {mensaje}</p>
        </div>
    );
}

export default ErrorMessage;