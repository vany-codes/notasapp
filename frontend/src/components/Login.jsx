import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Por favor, completa todos los campos");
            return false;
        }
        // Aquí puedes agregar la lógica para enviar los datos al backend o realizar validaciones
        const userData = {
            email,
            password
        };
        console.log(userData);
        navigate('/inicio');
    }
    return ( 
        <div className="w-full max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold">Inicio de Sesión</h1>
            <form >
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
     );
}

export default Login;