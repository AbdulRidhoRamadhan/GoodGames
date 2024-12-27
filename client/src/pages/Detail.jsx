import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useParams, Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const { data } = await api.get(`/games/${id}`);
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Game not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="relative h-96">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {game.name}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-sm">
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-full">
                Released: {game.released}
              </span>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full">
                Rating: {game.rating || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {game.description_raw}
              </p>
            </div>

            {game.platforms && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Platforms
                </h2>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((platform) => (
                    <span
                      key={platform.platform.id}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {platform.platform.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
