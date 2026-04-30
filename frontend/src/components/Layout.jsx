import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function Layout() {

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-r from-blue-100 to-purple-200">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 bg-gray-50/50 backdrop-blur-sm rounded-2xl mt-6 shadow-2xl shadow-blue-900/10 mb-8">
        
        <Outlet />
        
      </main>

      <Footer />
    </div>
  );
}

export default Layout;