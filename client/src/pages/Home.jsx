import { useEffect, useState } from "react";

function CreateModal() {
    const [username, setUsername] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [mines, setMines] = useState(10);
    const [usePassword, setUsePassword] = useState(false);
    const [password, setPassword] = useState("");



    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-600">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-4xl font-bold text-center">
                    Create a game
                </h1>
                <form onSubmit={(e) => e.preventDefault()}>
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
                        <label htmlFor="width" className="block mt-4 text-white text-sm font-semibold mr-2">
                            Width
                        </label>
                        <input
                            id="width"
                            type="number"
                            placeholder="Width"
                            className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                            min={10}
                            max={150}
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />

                        <label htmlFor="height" className="block mt-4 text-white text-sm font-semibold ml-4 mr-2">
                            Height
                        </label>
                        <input
                            id="height"
                            type="number"
                            placeholder="Height"
                            className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                            min={10}
                            max={150}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>


                    <label htmlFor="mines" className="block mt-4 text-white text-sm font-semibold">
                        Mines
                    </label>
                    <input
                        id="mines"
                        type="number"
                        placeholder="Mines"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                        min={10}
                        max={150}
                        value={mines}
                        onChange={(e) => setMines(e.target.value)}
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

function JoinModal() {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-600">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-4xl font-bold text-center">
                    Join a game
                </h1>

                <form>
                    <label htmlFor="gameId" className="block mt-4 text-white text-sm font-semibold">
                        Game ID
                    </label>
                    <input 
                        id="gameId"
                        type="text"
                        placeholder="Game ID"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                    />

                    <label htmlFor="username" className="block mt-4 text-white text-sm font-semibold">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                    />

                    <label htmlFor="password" className="block mt-4 text-white text-sm font-semibold">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full mt-4 p-2 border border-gray-300 rounded bg-gray-800 text-white"
                    />

                    <button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
}

function Home() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
  
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setShowCreateModal(false);
                setShowJoinModal(false);
            }
        });
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mt-10">
                Welcome to minesweeper!
            </h1>

            <div className="flex justify-center mt-10">
                <button onClick={() => setShowCreateModal(!showCreateModal)} className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

                    Create
                </button>

                <button onClick={() => setShowJoinModal(!showJoinModal)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Join
                </button>
            </div>

            {showCreateModal && <CreateModal />}
            {showJoinModal && <JoinModal />}

            <div className="rounded-full p-48 bg-blue-500 absolute bottom-0 left-0"></div>
            <div className="rounded-full p-48 bg-pink-500 absolute top-0 left-0"></div>

            <div className="rounded-full p-48 bg-green-500 absolute top-0 right-0"></div>
            <div className="rounded-full p-48 bg-yellow-500 absolute bottom-0 right-0"></div>



        </div>
    );
}

export default Home;