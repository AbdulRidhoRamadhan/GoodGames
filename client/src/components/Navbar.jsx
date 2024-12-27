import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function Logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to={"/"}
              className="text-2xl font-bold tracking-tight hover:text-indigo-400 transition-colors duration-200"
            >
              Good Games
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to={"/popular"}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Game of your Choice
            </Link>
          </div>

          <div className="hidden md:block">
            <button
              onClick={Logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Log Out
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to={"/"}
              className="block text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to={"/popular"}
              className="block text-gray-300 hover:text-white transition-colors duration-200"
            >
              Game of your Choice
            </Link>
            <button
              onClick={Logout}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
