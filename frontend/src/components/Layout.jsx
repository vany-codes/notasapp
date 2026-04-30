import Headers from "./Header";

function Layout() {
    return ( 
        <div className="min-h-screen flex flex-col bg-linear-to-r from-blue-100 to-purple-200">
        <Headers />

      {/* 2. Agregamos 'flex-1' para que el main crezca y empuje al footer */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg mt-6 shadow-lg shadow-blue-400/30">
        
        <section className="mb-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Bienvenido a Vany Notes</h2>
          <p className="text-gray-700">Hola, soy <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Vany-devs</span>, y actualmente me encuentro desarrollando esta aplicación con la valiosa colaboración de <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Perla Green</span>, quien ha contribuido en el diseño de la plataforma.</p>

          <p className="text-gray-700"> <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Vany Notes</span> es un espacio pensado para que organices tus ideas de forma sencilla y segura. Podrás crear <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">notas públicas</span> (guardadas en tu dispositivo) y <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">notas privadas</span> (disponibles desde cualquier lugar con tu cuenta).</p>

          <p className="text-gray-700">También podrás <span className="font-bold bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">crear, editar y eliminar</span> tus notas fácilmente, asignando prioridades de baja, media o alta.</p>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <p>🚀 Este proyecto aún está en desarrollo, ¡gracias por acompañarme en el crecimiento de Vany Notes!</p>
          <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all transform hover:scale-105">
            ¡Empecemos!
          </button>
        </section>
      </main>

      {/* 3. El footer se quedará abajo automáticamente por el flex-1 del main */}
      <footer className="w-full max-w-5xl mx-auto bg-gray-800 text-white p-4 mt-6 rounded-t-lg text-center shrink-0">
        <p>&copy; 2025 Vany-devs — Desarrollado con ❤️ junto a Perla Green</p>
      </footer>
    </div>
     );
}

export default Layout;