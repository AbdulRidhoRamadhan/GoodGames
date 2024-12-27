import { Link } from "react-router-dom";

const Cards = ({ game }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700 flex flex-col h-[500px]">
      <div className="relative h-64">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {game.metacritic ? `Metacritic: ${game.metacritic}` : "No rating"}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow overflow-hidden">
          <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
            {game.name}
          </h3>
          <p className="text-gray-400">{game.released}</p>
        </div>

        <div className="mt-4">
          <Link to={`games/${game.id}`}>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
              <span>View Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
