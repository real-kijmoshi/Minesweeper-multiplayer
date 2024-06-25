import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useRoom from "../hooks/useRoom";

const themes = {
  dark: {
    bg: "bg-gray-900",
    text: "text-white",
    border: "border-gray-300",
    hover: "hover:bg-gray-700",
    buttonBg: "bg-gray-900",
    buttonHover: "hover:bg-gray-700",
    buttonText: "text-white",
  },
  light: {
    bg: "bg-gray-100",
    text: "text-black",
    border: "border-gray-700",
    hover: "hover:bg-gray-300",
    buttonBg: "bg-gray-100",
    buttonHover: "hover:bg-gray-300",
    buttonText: "text-black",
  },
  blue: {
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    text: "text-white",
    border: "border-gray-300",
    buttonBg: "bg-blue-500",
    buttonHover: "hover:bg-blue-600",
    buttonText: "text-white",
  },
  greenish: {
    bg: "bg-green-500",
    hover: "hover:bg-green-700",
    text: "text-white",
    border: "border-gray-300",
    buttonBg: "bg-green-500",
    buttonHover: "hover:bg-green-700",
    buttonText: "text-white",
  }
}

function CreateModal({ createRoom, theme }) {
  const [username, setUsername] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createRoom(username, numberOfPlayers, usePassword, password);
  };

  const currentTheme = themes[theme];

  return (
    <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-600 ${currentTheme.bg}`}>
      <div className={`p-8 rounded-lg shadow-xl w-96 ${currentTheme.border} ${currentTheme.text}`}>
        <h1 className={`text-4xl font-bold text-center ${currentTheme.text}`}>Create a game</h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className={`block mt-4 ${currentTheme} text-sm font-semibold`}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className={`w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label
            htmlFor="numberOfPlayers"
            className={`block mt-4 text-white text-sm font-semibold`}
          >
            Number of players
          </label>
          <input
            id="numberOfPlayers"
            type="number"
            placeholder="Number of players"
            className={`w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white`}
            min={2}
            max={10}
            value={numberOfPlayers}
            onChange={(e) => setNumberOfPlayers(e.target.value)}
          />

          <div className={`mt-4 flex items-center justify-between text-white text-sm font-semibold`}>
            <label
              htmlFor="password"
              className={`block mt-4 text-white text-sm font-semibold`}
            >
              Use password?
            </label>
            <input
              id="password"
              type="checkbox"
              className={`ml-2 form-checkbox rounded ${currentTheme.text}`}
              checked={usePassword}
              onChange={() => setUsePassword(!usePassword)}
            />
          </div>

          {usePassword && (
            <input
              type="password"
              placeholder="Password"
              className={`w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <button
            type="submit"
            className={`w-full mt-4 ${currentTheme.bg} ${currentTheme.hover} ${currentTheme.buttonText} font-bold py-2 px-4 rounded`}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

CreateModal.propTypes = {
  createRoom: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

function JoinModal({ joinRoom, theme }) {
  const [gameId, setGameId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await joinRoom(gameId, username, password);
  };

  const currentTheme = themes[theme];

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-600 ${currentTheme.bg}`}>
      <div className={`bg-gray-900 p-8 rounded-lg shadow-lg w-96 ${currentTheme.border}`}>
        <h1 className={`text-4xl font-bold text-center ${currentTheme.text}`}>Join a game</h1>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="gameId"
            className={`block mt-4 text-white text-sm font-semibold`}
          >
            Game ID
          </label>
          <input
            id="gameId"
            type="text"
            placeholder="Game ID"
            className={`w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white`}
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />

          <label
            htmlFor="username"
            className={`block mt-4 text-white text-sm font-semibold`}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className={`w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label
            htmlFor="password"
            className={`block mt-4 text-white text-sm font-semibold`}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className={`w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className={`w-full mt-4 ${currentTheme.bg} ${currentTheme.hover} text-white font-bold py-2 px-4 rounded`}
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

JoinModal.propTypes = {
  joinRoom: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [roomId, jwt, error, createRoom, joinRoom] = useRoom();
  const [theme, setTheme] = useTheme();

  const currentTheme = themes[theme];

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setShowCreateModal(false);
        setShowJoinModal(false);
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("absolute")) {
        setShowCreateModal(false);
        setShowJoinModal(false);
      }
    });
  }, []);

  useEffect(() => {
    if (jwt) {
      document.cookie = `jwt=${jwt}`;
    }
  }, [jwt]);

  useEffect(() => {
    if (roomId) {
      window.location.href = `/lobby/${roomId}`;
    }
  }, [roomId]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className={`flex flex-col justify-center items-center w-screen h-screen ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="container mx-auto">
        <h1 className="text-6xl font-bold text-center mt-10 mb-10 z-0">
          Welcome to minesweeper!
        </h1>
        <div className="mt-10 flex flex-row justify-center z-10">
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded mr-4"
            >
              <h1 className="text-5xl font-bold">Create</h1>
            </button>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowJoinModal(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded"
            >
              <h1 className="text-5xl font-bold">Join</h1>
            </button>
          </div>
        </div>

        {showCreateModal && <CreateModal createRoom={createRoom} theme={theme} />}
        {showJoinModal && <JoinModal joinRoom={joinRoom} theme={theme} />}

        {/* Adjusted circles for smaller screens */}
        <div className="rounded-full p-12 bg-yellow-500 absolute bottom-0 right-0 sm:p-12 md:p-24 lg:p-44 shadow-lg transform hover:scale-110 transition duration-500 ease-in-out"></div>
        <div className="rounded-full p-12 bg-pink-500 absolute top-0 left-0 sm:p-12 md:p-24 lg:p-44 shadow-lg transform hover:scale-110 transition duration-500 ease-in-out"></div>
        <div className="rounded-full p-12 bg-green-500 absolute top-0 right-0 sm:p-12 md:p-24 lg:p-44 shadow-lg transform hover:scale-110 transition duration-500 ease-in-out"></div>
        <div className="rounded-full p-12 bg-blue-500 absolute bottom-0 left-0 sm:p-12 md:p-24 lg:p-44 shadow-lg transform hover:scale-110 transition duration-500 ease-in-out"></div>

        {/* Theme buttons */}
        <div className="fixed bottom-0 right-0 m-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10">
          <button
            onClick={() => setTheme("dark")}
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Dark
          </button>
          <button
            onClick={() => setTheme("light")}
            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mr-4"
          >
            Light
          </button>
          <button
            onClick={() => setTheme("blue")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Blue
          </button>
          <button
            onClick={() => setTheme("greenish")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Greenish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
