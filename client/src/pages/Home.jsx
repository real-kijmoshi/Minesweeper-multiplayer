import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useRoom from "../hooks/useRoom";

function CreateModal({ createRoom }) {
    const [username, setUsername] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [usePassword, setUsePassword] = useState(false);
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createRoom(username, numberOfPlayers, usePassword, password);
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-600">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-4xl font-bold text-center">
                    Create a game
                </h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="block mt-4 text-white text-sm font-semibold">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="numberOfPlayers" className="block mt-4 text-white text-sm font-semibold">
                        Number of players
                    </label>
                    <input
                        id="numberOfPlayers"
                        type="number"
                        placeholder="Number of players"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                        min={2}
                        max={10}
                        value={numberOfPlayers}
                        onChange={(e) => setNumberOfPlayers(e.target.value)}
                    />

                    <div className="mt-4 flex items-center justify-between text-white text-sm font-semibold">
                        <label htmlFor="password" className="block mt-4 text-white text-sm font-semibold">
                            Use password?
                        </label>
                        <input
                            id="password"
                            type="radio"
                            placeholder="Password"
                            className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                            value={usePassword}
                            onClick={() => setUsePassword(!usePassword)}
                        />
                    </div>

                    {usePassword && (
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}

                    <button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
CreateModal.propTypes = {
    createRoom: PropTypes.func.isRequired,
};

function JoinModal({ joinRoom }) {
    const [gameId, setGameId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await joinRoom(gameId, username, password);
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-600">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-4xl font-bold text-center">
                    Join a game
                </h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="gameId" className="block mt-4 text-white text-sm font-semibold">
                        Game ID
                    </label>
                    <input 
                        id="gameId"
                        type="text"
                        placeholder="Game ID"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                    />

                    <label htmlFor="username" className="block mt-4 text-white text-sm font-semibold">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password" className="block mt-4 text-white text-sm font-semibold">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
}
JoinModal.propTypes = {
    joinRoom: PropTypes.func.isRequired,
};

function Home() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [roomId, jwt, error, createRoom, joinRoom] = useRoom();
  
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
            window.location.href = `/rooms/${roomId}`;
        }
    }, [roomId]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);


    return (
        <div className="container mx-auto">
            <h1 className="text-6xl font-bold text-center mt-10 mb-10 z-10">
                Welcome to minesweeper!
            </h1>

            <div className="mt-10 flex flex-row justify-center z-10">
                <div className="flex justify-center mt-10">
                    <button onClick={() => setShowCreateModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded mr-4">
                        <h1 className="text-5xl font-bold">
                            Create
                        </h1>
                    </button>
                </div>

                <div className="flex justify-center mt-10">
                    <button onClick={() => setShowJoinModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">
                        <h1 className="text-5xl font-bold">
                            Join
                        </h1>
                    </button>
                </div>
            </div>


            {showCreateModal && <CreateModal createRoom={createRoom} />}
            {showJoinModal && <JoinModal joinRoom={joinRoom} />}

            {
                /*
                some circles
                */
            }
            <div className="rounded-full p-48 bg-blue-500 absolute bottom-0 left-0"></div>
            <div className="rounded-full p-48 bg-pink-500 absolute top-0 left-0"></div>
            <div className="rounded-full p-48 bg-green-500 absolute top-0 right-0"></div>
            <div className="rounded-full p-48 bg-yellow-500 absolute bottom-0 right-0"></div>
        </div>
    );
}

export default Home;