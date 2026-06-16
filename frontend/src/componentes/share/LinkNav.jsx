import { Link } from "react-router";

function LinkNav({ to, children }) {
    return (
        <Link to={to} className="px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition duration-300">
            {children}
        </Link>
    );
}

export default LinkNav;
