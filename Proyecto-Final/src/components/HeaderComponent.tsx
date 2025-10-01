import { Link } from "react-router-dom";
function HeaderComponent() {
  return (
    <header className="bg-red-500 text-white shadow-md">
      <nav className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">Proyecto Final</h1>
        <ul className="flex gap-4">
          <li>
            <Link
              to="/"
              className="hover:underline hover:text-gray-200 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="hover:underline hover:text-gray-200 transition"
            >
              History
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderComponent;
