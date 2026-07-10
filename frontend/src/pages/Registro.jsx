/* eslint-disable no-unused-vars */
import { User, Mail, Lock, UserPlus, Navigation } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import LabelForm from "../componentes/share/LabelForm";
import InputForm from "../componentes/share/InputForm";
import { crearUsuario } from "../data/usuario.local";
import { validateEmail } from "../utils/validators";
import { postUser } from "../services/user.service";

function Registro() {
    const [nombre, setNombre] = useState("");
    const [correo_electronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim() || !correo_electronico.trim() || !contrasena || !confirmarContrasena) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const emailError = validateEmail(correo_electronico);
        if (emailError) {
            setError(emailError);
            return;
        }

        if (contrasena.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (contrasena !== confirmarContrasena) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        try {
            const nuevoUsuario = {
                nombre: nombre.trim(),
                correo_electronico: correo_electronico.trim().toLowerCase(),
                contrasena: contrasena.trim(),
            };

            //  console.log("Usuario registrado:", nuevoUsuario);
            //  crearUsuario(nuevoUsuario);

            const respuesta = await postUser(nuevoUsuario);

            console.log("Usuario registrado:", respuesta.data.nombre);
            navigate("/login");

            // Limpiar formulario
            setNombre("");
            setCorreoElectronico("");
            setContrasena("");
            setConfirmarContrasena("");
        } catch (err) {
            if (err.response?.data?.errors) {
                setError(err.response.data.errors[0].mensaje);
                // console.error("Error al registrar el usuario:", err.response.data.errors);
            } else {
                setError(err.response?.data?.message || "Error al registrar el usuario.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl p-8">
                
                {/* Encabezado */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                        <UserPlus size={32} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Crear cuenta</h2>
                    <p className="text-gray-400">Regístrate para sincronizar tus notas y acceder desde cualquier dispositivo.</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        ⚠ {error}
                    </div>
                )}

                {/* Formulario */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    
                    {/* Usuario */}
                    <div>
                        <LabelForm htmlFor="usuario" name="Usuario" />
                        <div className="relative">
                            {/* Corregido el posicionamiento del icono con -translate-y-1/2 */}
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <InputForm
                                type="text"
                                id="usuario"
                                placeholder="Tu nombre de usuario"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <LabelForm htmlFor="email" name="Email" />
                        <div className="relative">
                            {/* 2. Clases de Tailwind separadas y corregidas aquí */}
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
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
                        <LabelForm htmlFor="password" name="Contraseña" />
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <InputForm
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                        <p className={`text-sm mt-2 ${
                            contrasena.length === 0 ? "text-gray-500" : contrasena.length >= 6 ? "text-green-400" : "text-yellow-400"
                        }`}>
                            {contrasena.length === 0
                                ? "Mínimo 6 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número."
                                : contrasena.length >= 6
                                ? "✓ Contraseña válida."
                                : `Faltan ${6 - contrasena.length} caracteres.`}
                        </p>
                    </div>

                    {/* Confirmar contraseña */}
                    <div>
                        <LabelForm htmlFor="confirmarContrasena" name="Confirmar contraseña" />
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <InputForm
                                type="password"
                                id="confirmarContrasena"
                                placeholder="••••••••"
                                value={confirmarContrasena}
                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                            />
                        </div>
                        {confirmarContrasena && (
                            <p className={`text-sm mt-2 ${contrasena === confirmarContrasena ? "text-green-400" : "text-red-400"}`}>
                                {contrasena === confirmarContrasena ? "✓ Las contraseñas coinciden." : "✗ Las contraseñas no coinciden."}
                            </p>
                        )}
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-semibold shadow-lg transition hover:scale-[1.02]"
                    >
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                    </button>
                </form>

                {/* Pie */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        ¿Ya tienes una cuenta?{" "}
                        <button type="button" className="text-blue-400 hover:text-blue-300 font-semibold transition" onClick={handleLoginRedirect}>
                            Inicia sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Registro;