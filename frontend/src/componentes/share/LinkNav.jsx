import { Link } from "react-router";

function LinkNav({ to, children }) {
    return (
        <Link 
            to={to} 
            className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all duration-300 block"
        >
            {children}
        </Link>
    );
}

export default LinkNav;