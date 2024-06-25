import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";

const themes = {
  dark: {
    background: "bg-gray-900",
    text: "text-white",
    button: "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800",
    boardBackground: "bg-gray-800",
    cellHidden: "bg-gray-700",
    cellWithNumber: "bg-black bg-opacity-50",
    cellActive: "bg-gray-600",
    cellClicked: "bg-gray-500",
    flag: "bg-yellow-500",
    bomb: "bg-red-500",
  },
  light: {
    background: "bg-white",
    text: "text-gray-600",
    button: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
    boardBackground: "bg-gray-100",
    cellHidden: "bg-gray-700",
    cellWithNumber: "bg-black bg-opacity-5",
    cellActive: "bg-gray-300",
    cellClicked: "bg-gray-500",
    flag: "bg-yellow-400",
    bomb: "bg-red-400",
  },
  greenish: {
    background: "bg-green-100",
    text: "text-green-900",
    button: "bg-green-600 hover:bg-green-700 active:bg-green-800",
    boardBackground: "bg-green-200",
    cellHidden: "bg-green-700",
    cellWithNumber: "bg-black bg-opacity-10",
    cellActive: "bg-green-400",
    cellClicked: "bg-green-500",
    flag: "bg-green-600",
    bomb: "bg-red-500",
  },
  blue: {
    background: "bg-blue-100",
    text: "text-blue-900",
    button: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
    boardBackground: "bg-blue-200",
    cellHidden: "bg-blue-500",
    cellWithNumber: "bg-black bg-opacity-10",
    cellActive: "bg-blue-400",
    cellClicked: "bg-blue-500",
    flag: "bg-blue-600",
    bomb: "bg-red-500",
  },
};

const textColorByNeighbours = [
  "text-blue-500",
  "text-green-500",
  "text-red-500",
  "text-purple-500",
  "text-yellow-500",
  "text-blue-700",
  "text-green-700",
  "text-red-700",
];

const normalize = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes}:${remainingSeconds}`;
  }

  if (minutes > 0) {
    return `${minutes}:${remainingSeconds}`;
  }

  return `${remainingSeconds}s`;
};

function Game() {
  const [board, setBoard] = useState([]);
  const [timer, setTimer] = useState(0);
  const [theme, setTheme] = useTheme(); // Get the current theme from the hook

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const WIDTH = 7;
    const HEIGHT = 6;
    const initialBoard = Array.from({ length: HEIGHT }, () =>
      Array(WIDTH).fill(null),
    );
    setBoard(initialBoard);

    // Test setup
    initialBoard[0][0] = 0;
    initialBoard[0][1] = 1;
    initialBoard[0][2] = 2;
    initialBoard[0][3] = 3;
    initialBoard[0][4] = 4;
    initialBoard[0][5] = 5;
    initialBoard[0][6] = 6;
    initialBoard[1][0] = 7;
    initialBoard[1][1] = 8;
    initialBoard[1][2] = 9;
    initialBoard[1][3] = 10;
    initialBoard[1][4] = 0;
  }, []);

  const handleClick = (type, x, y, e) => {
    e.preventDefault();
    //actions: click, flag, unflag
    if (type === "click") {
      //click to server
    } else if (type === "flag") {
      //flag to server

      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[y][x] = newBoard[y][x] === 9 ? null : 9;
        return newBoard;
      });
    }

    // console.log(`Clicked on cell ${x}-${y}`);
  };
  const currentTheme = themes[theme];

  return (
    <div
      className={`flex flex-col justify-center items-center ${currentTheme.background} w-screen h-screen`}
    >
      <h1 className={`text-6xl font-bold ${currentTheme.text}`}>
        {normalize(timer)}
      </h1>

      <div
        className={`rounded-lg shadow-lg space-y-2 p-10 ${currentTheme.boardBackground}`}
      >
        {board.map((row, y) => (
          <div
            key={y}
            className="flex flex-row justify-center items-center space-x-2"
          >
            {row.map((cell, x) => (
              <button
                key={`${x}-${y}`}
                id={`${x}-${y}`}
                className={`w-10 h-10 rounded-lg flex justify-center items-center transition-all duration-200 ${
                  cell === null
                    ? `cursor-pointer ${currentTheme.cellHidden} hover:${currentTheme.cellActive} active:${currentTheme.cellClicked}`
                    : ""
                } ${cell === 8 ? currentTheme.cellClicked : ""} ${
                  cell === 9 ? currentTheme.flag : ""
                } ${cell === 10 ? currentTheme.bomb : ""} ${
                  cell >= 0 && cell <= 7
                    ? `${textColorByNeighbours[cell]} font-bold ${currentTheme.cellWithNumber} cursor-pointer hover:${currentTheme.cellActive} active:${currentTheme.cellClicked}`
                    : ""
                }`}
                onClick={(e) => handleClick("click", x, y, e)}
                onContextMenu={(e) => handleClick("flag", x, y, e)}
              >
                {cell >= 0 && cell <= 7 ? cell : ""}
                {cell === 9 ? "🚩" : ""}
                {cell === 10 ? "💣" : ""}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-center items-center space-x-2 mt-10">
        <button
          className={`${currentTheme.button} text-white font-bold py-2 px-4 rounded`}
        >
          Restart
        </button>
        <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
          Give up
        </button>
      </div>
    </div>
  );
}

export default Game;
