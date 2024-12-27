import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../api/axios";

const GameCard = ({ game, fetchGames }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#4f46e5",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
      customClass: {
        popup: "rounded-xl border border-gray-700",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    });

    if (result.isConfirmed) {
      try {
        await api({
          method: "DELETE",
          url: `/populars/${game.id}`,
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        Swal.fire({
          title: "Deleted!",
          text: "The game has been removed from your collection.",
          icon: "success",
          background: "#1f2937",
          color: "#fff",
          customClass: {
            popup: "rounded-xl border border-gray-700",
          },
        });
        fetchGames();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong",
          icon: "error",
          background: "#1f2937",
          color: "#fff",
          customClass: {
            popup: "rounded-xl border border-gray-700",
          },
        });
      }
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-700 flex flex-col h-[500px]">
      <div className="relative h-64">
        <img
          src={game.imgUrl}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Rating: {game.metacritic_rating}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
            {game.title}
          </h3>
          <p className="text-gray-400">
            Released: {formatDate(game.release_date)}
          </p>
        </div>

        <div className="flex space-x-3 mt-4">
          <Link to={`/update/${game.id}`} className="flex-1">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span>Edit</span>
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
