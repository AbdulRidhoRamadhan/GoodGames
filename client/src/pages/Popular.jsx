import { useEffect, useState } from "react";
import { api } from "../api/axios";
import CardsPopuler from "../components/CardsPopuler";
import { Link } from "react-router-dom";

export default function Popular() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const { data } = await api({
        method: "GET",
        url: "/populars",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      const sortedGames = data.games.sort((a, b) => {
        return b.metacritic_rating - a.metacritic_rating;
      });

      setGames(sortedGames);
    } catch (error) {
      console.error("Error fetching popular games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Game Collection
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Manage and explore your personally curated collection of favorite
              games and give your rating
            </p>
          </div>
          <Link to="/create">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Add New Game</span>
            </button>
          </Link>
        </div>

        {games.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No games in your collection yet.</p>
            <p className="mt-2">Start adding your favorite games!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <div
                key={game.id}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <CardsPopuler game={game} fetchGames={fetchGames} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
