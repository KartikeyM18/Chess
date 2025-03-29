import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";


const ChessBoard = ({ board, socket, setBoard, chess, color, setMyTurn }: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][],
  socket: WebSocket,
  setBoard: React.Dispatch<React.SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]>>,
  chess: Chess,
  color: Color,
  setMyTurn: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const [from, setFrom] = useState<null | Square>(null);
  const [clicked, setClicked] = useState('');

  return (
    <div className="">
      {board.map((row, i) => {
        return <div key={i} className="flex">
          {row.map((square, j) => {
            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
            // console.log(squareRepresentation); 
            
            return <div onClick={() => {
              
              if (!from) {
                if(square?.color === color){
                  setFrom(squareRepresentation);
                  setClicked(squareRepresentation);
                } 
              } else {
                socket.send(JSON.stringify({
                  type: MOVE,
                  payload: {
                    from,
                    to: squareRepresentation
                  }
                }))
                setFrom(null);
                setClicked('');
                const prevBoard = chess.fen();
                chess.move({
                  from,
                  to: squareRepresentation
                });
                const afterBoard = chess.fen();
                if(prevBoard !== afterBoard) setMyTurn(false);
                setBoard(chess.board());
                console.log({ from, to: squareRepresentation });
              }
            }}
              key={j} className={`md:w-16 md:h-16 w-11 h-11  ${clicked == squareRepresentation? 'bg-red-400': `${((i + j) % 2) ? 'bg-green-500' : 'bg-green-200'}`}`}>
              <div className="w-full h-full pb-3 flex justify-center items-center">
                {square ? <img className="md:w-7 w-5 " src={`/${square?.color === 'b' ? `B_${square?.type?.toUpperCase()}` : `W_${square?.type?.toUpperCase()}` }.png`}/> : null}
              </div>
            </div>
          })}
        </div>
      })}
    </div>
  )
}

export default ChessBoard
