import { useEffect, useState } from "react";
import Button from "../components/Button"
import ChessBoard from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess, Color } from "chess.js";
import { useNavigate } from "react-router-dom";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {

    const socket = useSocket();

    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    const [gameStarted, setGameStarted] = useState(false);
    const [color, setColor] = useState<Color>('w');
    const [gameOver, setGameOver] = useState(false);
    const [myTurn, setMyTurn] = useState(true);

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    console.log("Game Initialised");
                    setGameStarted(true);
                    setColor(message.payload.color[0]);
                    if (message.payload.color[0] === 'b') setMyTurn(false);
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    setMyTurn(true);
                    console.log("Move made: ", move);
                    break;
                case GAME_OVER:
                    setGameOver(true);
                    console.log("Game Over");
                    break;
            }
        }
    }, [socket])
    const navigate = useNavigate();

    if (!socket) return <div>Connecting...</div>

    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">

                <div className="grid md:grid-cols-6 gap-4 w-full relative">
                    <div className="md:col-span-4 w-full flex justify-center">
                        <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} color={color} setMyTurn={setMyTurn} />
                    </div>
                    <div className="md:col-span-2 w-full flex justify-center bg-slate-800">
                        <div className="pt-8">

                            {gameStarted ?
                                <div className="flex flex-col items-center">
                                    <h1 className="text-white text-3xl font-bold">You are {color === 'b' ? 'BLACK' : 'WHITE'} </h1>
                                    <h2 className="text-2xl text-red-500 font-bold">
                                        {myTurn? 'Your turn': '\u200B'}  
                                    </h2>
                                    {chess.history().map((move, index) => (
                                        <p key={index} className="text-white text-xl font-semibold">{move}</p>
                                    ))}
                                </div>

                                :
                                <Button onClick={() => {
                                    socket.send(JSON.stringify({
                                        type: INIT_GAME,

                                    }))
                                }}>
                                    Play
                                </Button>
                            }
                        </div>
                    </div>

                    {gameOver &&
                        <div className="w-full h-full backdrop-blur-xs flex justify-center items-center z-10 absolute ">
                            <div className="text-white text-5xl text-center w-full bg-slate-900  py-3 pb-6">

                                <h1 className="py-3">
                                    GAME OVER
                                </h1>
                                <Button onClick={() => navigate('/')}>Go Back</Button>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Game
