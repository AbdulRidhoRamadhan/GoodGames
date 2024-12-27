import { useState, useEffect } from "react";
import { api } from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateUpdateForm({ type }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [metacritic_rating, setMetacritic_rating] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [game, setGame] = useState({});

  const fetchGame = async () => {
    try {
      const { data } = await api({
        method: "GET",
        url: `/populars/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setGame(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (type === "Update") {
      fetchGame();
    }
  }, [type]);

  useEffect(() => {
    if (game.title) {
      setTitle(game.title);
      setMetacritic_rating(game.metacritic_rating);
      setRelease_date(game.release_date);
      setImgUrl(game.imgUrl);
    }
  }, [game]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "Add") {
        await api.post(
          "/populars",
          {
            title,
            imgUrl,
            metacritic_rating,
            release_date,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );
        Swal.fire({
          title: "Success",
          text: "Game has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (type === "Update") {
        await api.put(
          `/populars/${id}`,
          {
            title,
            imgUrl,
            metacritic_rating,
            release_date,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );
        Swal.fire({
          title: "Success",
          text: "Game has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      navigate("/popular");
    } catch (error) {
      console.log(error.response.data.message);

      Swal.fire({
        title: "Error!",
        text: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter game title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Image URL
          </label>
          <input
            name="imgUrl"
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Metacritic Rating
          </label>
          <input
            name="metacritic_rating"
            type="number"
            value={metacritic_rating}
            onChange={(e) => setMetacritic_rating(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter rating (0-100)"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Release Date
          </label>
          <input
            name="release_date"
            type="date"
            value={release_date}
            onChange={(e) => setRelease_date(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
        >
          <span>{type} Game</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
