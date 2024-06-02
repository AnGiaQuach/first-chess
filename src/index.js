const { Chess } = require("chess.js");
import "./style.css";
import {
  RenderBoard,
  RenderPieces,
  removePieces,
  RenderAllPieces,
  RenderMove,
  getStockfish,
  ResetBackground,
} from "./operate.js";

// const chess = new Chess(
//   "rnbqkbnr/pppppppp/8/8/8/5NP1/PPPPPPBP/RNBQK2R w KQkq - 0 1"
// );

// chess.move("O-O");
// console.log(chess.ascii());

// let x = 1;
// let name = String.fromCharCode(96 + x) + "2";
// console.log(name);

const chess = new Chess("5k2/Q2K4/3R4/8/8/8/8/q7 w - - 0 1");
const BOARD_WITDH = 8;
RenderBoard();
RenderAllPieces(chess);

let playerTurn = true;
const playerColor = "w";
let preMove = [];
let selectedPosition = "";

for (let i = 1; i <= 8; i++) {
  for (let j = 1; j <= 8; j++) {
    const position = String.fromCharCode(96 + i) + `${j}`;

    const square = document.querySelector(`#${position}`);
    square.addEventListener("click", () => {
      if (preMove.includes(position)) {
        console.log("it was a move by user!");

        //chess.put(chess.get(`${selectedPosition}`), position);
        chess.move(`${selectedPosition}-${position}`);
        const { type, color } = chess.get(`${selectedPosition}`);
        RenderPieces(type, color, position);
        removePieces(selectedPosition);
        ResetBackground();

        selectedPosition = "";
        preMove = [];

        getStockfish(chess.fen());
      } else {
        console.log(`${position} square was clicked !!`);
        preMove = RenderMove(position, chess);
        selectedPosition = position;
        console.log(`selected position : ${selectedPosition}`);
        console.log(preMove);
      }
    });
  }
}
// const tmpSq = document.querySelector("#a1");
// tmpSq.addEventListener("click", () => {
//   RenderMove("a1", chess);
// });

// console.log(chess.moves({ verbose: true }));
