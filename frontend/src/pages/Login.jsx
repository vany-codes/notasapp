/* eslint-disable no-unused-vars */
import {
    Mail,
    Lock,
    LogIn,
} from "lucide-react";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Ingresa un correo electrónico válido.");
            return;
        }

        setLoading(true);

        try {
            const credenciales = {
                email: email.trim().toLowerCase(),
                password,
            };

            console.log("Iniciando sesión:", credenciales);

            // Aquí iría tu petición al backend

            // Ejemplo:
            // const response = await axios.post("/api/login", credenciales);

        } catch (err) {
            setError("Correo o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-10">

            <div
                className="
                    w-full
                    max-w-md
                    bg-gray-800/60
                    backdrop-blur-md
                    border border-gray-700
                    rounded-3xl
                    shadow-2xl
                    p-8
                "
            >

                {/* Encabezado */}
                <div className="text-center mb-8">

                    <div
                        className="
                            w-16 h-16 mx-auto mb-4
                            rounded-2xl
                            bg-blue-600/20
                            flex items-center justify-center
                        "
                    >
                        <LogIn
                            size={32}
                            className="text-blue-400"
                        />
                    </div>

                    <h2 className="text-3xl font-black text-white mb-2">
                        Iniciar sesión
                    </h2>

                    <p className="text-gray-400">
                        Accede para sincronizar y gestionar tus notas.
                    </p>

                </div>

                {/* Error */}
                {
                    error && (
                        <div
                            className="
                                mb-6
                                rounded-2xl
                                border border-red-500/30
                                bg-red-500/10
                                px-4 py-3
                                text-sm text-red-400
                            "
                        >
                            ⚠ {error}
                        </div>
                    )
                }

                {/* Formulario */}
                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >

                    {/* Email */}
                    <div>

                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-300 mb-2"
                        >
                            Email
                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-500
                                "
                            />

                            <input
                                type="email"
                                id="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="
                                    w-full
                                    pl-12
                                    pr-4
                                    py-3
                                    rounded-2xl
                                    bg-gray-900
                                    border border-gray-700
                                    text-white
                                    placeholder-gray-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-transparent
                                    transition
                                "
                            />

                        </div>

                    </div>

                    {/* Contraseña */}
                    <div>

                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-300 mb-2"
                        >
                            Contraseña
                        </label>

                        <div className="relative">

                            <Lock
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-500
                                "
                            />

                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="
                                    w-full
                                    pl-12
                                    pr-4
                                    py-3
                                    rounded-2xl
                                    bg-gray-900
                                    border border-gray-700
                                    text-white
                                    placeholder-gray-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-transparent
                                    transition
                                "
                            />

                        </div>

                    </div>

                    {/* Recordar y olvidé contraseña */}
                    <div className="flex items-center justify-between text-sm">

                        <label className="flex items-center gap-2 text-gray-400">
                            <input
                                type="checkbox"
                                className="rounded border-gray-600 bg-gray-900"
                            />
                            Recordarme
                        </label>

                        <button
                            type="button"
                            className="
                                text-blue-400
                                hover:text-blue-300
                                transition
                            "
                        >
                            ¿Olvidaste tu contraseña?
                        </button>

                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            py-3
                            rounded-2xl
                            bg-blue-600
                            hover:bg-blue-500
                            disabled:bg-blue-900
                            disabled:cursor-not-allowed
                            text-white
                            font-semibold
                            shadow-lg
                            transition
                            hover:scale-[1.02]
                        "
                    >
                        {
                            loading
                                ? "Iniciando sesión..."
                                : "Iniciar sesión"
                        }
                    </button>

                </form>

                {/* Pie */}
                <div className="mt-6 text-center">

                    <p className="text-sm text-gray-400">
                        ¿No tienes una cuenta?{" "}
                        <button
                            type="button"
                            className="
                                text-blue-400
                                hover:text-blue-300
                                font-semibold
                                transition
                            "
                        >
                            Regístrate
                        </button>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;