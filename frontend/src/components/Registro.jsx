import { useState } from "react";
import { useNavigate } from "react-router";
import ErrorMessage from "./compartidos/ModalNecesario";

function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Estado para manejar los mensajes de error por campo
    const [errores, setErrores] = useState({});
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let listaErrores = {};

        if (!nombre.trim()) listaErrores.nombre = "El nombre es obligatorio";
        if (!email.trim()) listaErrores.email = "El correo es necesario";
        if (!password) listaErrores.password = "La contraseña no puede estar vacía";
        if (!confirmPassword) listaErrores.confirmPassword = "La confirmación de contraseña no puede estar vacía";
        if (password !== confirmPassword) {
            listaErrores.confirmPassword = "Las contraseñas no coinciden";
        }

        if (Object.keys(listaErrores).length > 0) {
            setErrores(listaErrores);
            console.log("❌ Errores encontrados:", listaErrores);
            return;
        }

        setErrores({});
        console.log("✅ Datos listos:", { nombre, email, password });
        navigate('/login');
    }
    
    return ( 
        <div className="w-full max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-black mb-6 text-gray-800">Registro</h1>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                
                {/* Campo Nombre */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input
                        type="text"
                        className={`confirmPasswordshadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 transition-all ${errores.nombre ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`} 
                        value={nombre}
                        onChange={(e) => {
                            setNombre(e.target.value);
                            if (errores.nombre) setErrores({...errores, nombre: null}); // Limpia el error al escribir
                        }} 
                    />
                    <ErrorMessage mensaje={errores.nombre} />
                </div>

                {/* Campo Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        className={`shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 transition-all ${errores.email ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errores.email) setErrores({...errores, email: null});
                        }}
                    />
                    <ErrorMessage mensaje={errores.email} />
                </div>

                {/* Sección Passwords */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className={`shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 transition-all ${errores.password ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ErrorMessage mensaje={errores.password} />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Password</label>
                        <input
                            type="password"
                            className={`shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 transition-all ${errores.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <ErrorMessage mensaje={errores.confirmPassword} />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
                >
                    Crear Cuenta
                </button>
            </form>
        </div>
     );
}

export default Registro;