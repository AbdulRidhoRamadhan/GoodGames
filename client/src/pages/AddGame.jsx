import CreateUpdateForm from "../components/CreateUpdateForm";
import { Link } from "react-router-dom";

export default function AddGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Add Game to your Collection
          </h2>
          <Link to="/popular">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back</span>
            </button>
          </Link>
        </div>
        <CreateUpdateForm type={"Add"} />
      </div>
    </div>
  );
}
