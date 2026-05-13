import { useState } from "react";
import { useNavigate } from "react-router";
import ErrorMessage from "../../components/compartidos/ModalError.Components";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let listaErrores = {};

        // Validaciones
        if (!email.trim()) listaErrores.email = "El correo electrónico es obligatorio";
        if (!password) listaErrores.password = "La contraseña es obligatoria";

        // Si hay errores, los mostramos
        if (Object.keys(listaErrores).length > 0) {
            setErrores(listaErrores);
            return;
        }

        // Si todo está bien, limpiamos errores y procedemos
        setErrores({});
        const userData = {
            email,
            password
        };
        console.log("✅ Datos de inicio de sesión:", userData);
        navigate('/inicio');
    }

    return ( 
        <div className="w-full max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-black mb-6 text-gray-800">Inicio de Sesión</h1>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                
                {/* Campo Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
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

                {/* Campo Password */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        className={`shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 transition-all ${errores.password ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-400'}`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errores.password) setErrores({...errores, password: null});
                        }}
                    />
                    <ErrorMessage mensaje={errores.password} />
                </div>

                <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default Login;