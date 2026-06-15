import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function Layout() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-slate-950 text-white flex flex-col">

            {/* Header */}
            <Header />

            {/* Contenido principal */}
            <Main />

            {/* Footer */}
            <Footer />

        </div>
    );
}

export default Layout;