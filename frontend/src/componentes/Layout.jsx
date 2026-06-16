import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-slate-950 text-white flex flex-col">

            {/* Header */}
            <Header />

            {/* Contenido principal */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default Layout;