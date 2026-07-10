/* eslint-disable no-unused-vars */
import { Mail, Lock, LogIn } from "lucide-react";
import { useContext, useState } from "react";
import LabelForm from "../componentes/share/LabelForm";
import InputForm from "../componentes/share/InputForm";
import { Navigate, useNavigate } from "react-router";
import { loginUsuario } from "../data/usuario.local";
import { validateEmail } from "../utils/validators";
import { postLogin } from "../services/user.service";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [correo_electronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Accede a la función de login desde el contexto de autenticación

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!correo_electronico.trim() || !contrasena) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const emailError = validateEmail(correo_electronico);
        if (emailError) {
            setError(emailError);
            return;
        }

        setLoading(true);

        try {
            const credenciales = {
                email: correo_electronico.trim().toLowerCase(),
                password: contrasena.trim(),
            };

            // console.log("Iniciando sesión:", credenciales);
            const respuesta = await postLogin({ correo_electronico: credenciales.email, contrasena: credenciales.password });

            // Imprime la respuesta del backend para depuración y el token recibido
            console.log("Respuesta del backend:", respuesta);
            
            const { user, token } = respuesta; // Desestructura la respuesta para obtener el usuario y el token
            
            // Llama a la función de login del contexto para actualizar el estado global
            login(user, token);
            
            navigate("/notas");
            // Aquí irá tu petición al backend


        } catch (err) {
            setError("Correo o contraseña incorrectos.");
            console.error("Error de inicio de sesión:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegistroRedirect = () => {
        navigate("/registro");
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl p-8">
                
                {/* Encabezado */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                        <LogIn size={32} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Iniciar sesión</h2>
                    <p className="text-gray-400">Accede para sincronizar y gestionar tus notas.</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        ⚠ {error}
                    </div>
                )}

                {/* Formulario */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    
                    {/* Email */}
                    <div>
                        {/* Componente LabelForm aplicado */}
                        <LabelForm htmlFor="email" name="Email" />
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            {/* Componente InputForm aplicado */}
                            <InputForm
                                type="email"
                                id="email"
                                placeholder="correo@ejemplo.com"
                                value={correo_electronico}
                                onChange={(e) => setCorreoElectronico(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div>
                        {/* Componente LabelForm aplicado */}
                        <LabelForm htmlFor="password" name="Contraseña" />
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            {/* Componente InputForm aplicado */}
                            <InputForm
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Recordar y olvidé contraseña */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded border-gray-600 bg-gray-900 text-blue-600 focus:ring-0"
                            />
                            Recordarme
                        </label>
                        <button type="button" className="text-blue-400 hover:text-blue-300 transition">
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-semibold shadow-lg transition hover:scale-[1.02]"
                    >
                        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </button>
                </form>

                {/* Pie */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        ¿No tienes una cuenta?{" "}
                        <button type="button" className="text-blue-400 hover:text-blue-300 font-semibold transition" onClick={handleRegistroRedirect}>
                            Regístrate
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;