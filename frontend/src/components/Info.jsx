import { useNavigate } from "react-router";

function Info() {
    const navegation = useNavigate()

    const handleStart = () => {
        navegation("/nueva")
    }
    return ( 
        <>
            <section className="mb-6 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a Vany Notes</h2>
            <p className="text-gray-700">Hola, soy <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Vany-devs</span>, y actualmente me encuentro desarrollando esta aplicación con la valiosa colaboración de <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Perla Green</span>, quien ha contribuido en el diseño de la plataforma.</p>

            <p className="text-gray-700"> <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Vany Notes</span> es un espacio pensado para que organices tus ideas de forma sencilla y segura. Podrás crear <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">notas públicas</span> (guardadas en tu dispositivo) y <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">notas privadas</span> (disponibles desde cualquier lugar con tu cuenta).</p>

            <p className="text-gray-700">También podrás <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">crear, editar y eliminar</span> tus notas fácilmente, asignando prioridades de baja, media o alta.</p>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <p>🚀 Este proyecto aún está en desarrollo, ¡gracias por acompañarme en el crecimiento de Vany Notes!</p>
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all transform hover:scale-105" onClick={handleStart}>
                ¡Empecemos!
            </button>
            </section>
        </>
     );
}

export default Info;