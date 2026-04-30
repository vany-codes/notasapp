import Footer from "./Footer";
import Headers from "./Header";
import Info from "./Info";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-r from-blue-100 to-purple-200">
        <Headers />

        {/* 2. Agregamos 'flex-1' para que el main crezca y empuje al footer */}
        <main className="flex-1 w-full max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg mt-6 shadow-lg shadow-blue-400/30">
            
            <Info />
        </main>

        {/* 3. El footer se quedará abajo automáticamente por el flex-1 del main */}
        <Footer />
        </div>
    );
}

export default Layout;