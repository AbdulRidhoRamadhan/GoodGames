import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/axios";
import { setGames, setLoading } from "../features/gameSlice";
import Cards from "../components/Cards";
import Hero from "../components/Hero";
import Chatbot from "./ChatBot";
export default function Home() {
  const dispatch = useDispatch();
  const { games, loading } = useSelector((state) => state.games);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(9);
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  const fetchGames = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get("/games");
      dispatch(setGames(data.results));
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [dispatch]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }

  const totalPages = Math.ceil(games.length / gamesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Hero />

      <button
        onClick={toggleChatbot}
        className="fixed bottom-5 left-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span>Chat with GeminiAI</span>
      </button>

      <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
              {currentGames.map((game) => (
                <Cards key={game.id} game={game} />
              ))}
            </div>

            <div className="flex justify-center mt-8 mb-8 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white transform scale-110 shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-indigo-500 hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
