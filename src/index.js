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

const chess = new Chess();
const BOARD_WITDH = 8;
RenderBoard();
RenderAllPieces(chess);

let playerTurn = true;
const playerColor = "w";
let preMove = [];
let selectedPosition = "";

async function updateChess(currentFen) {
  playerTurn = false;
  console.log(currentFen);
  try {
    const moveReponse = await getStockfish(currentFen);
    playerTurn = true;
    chess.move(moveReponse);
    const position = moveReponse[2] + moveReponse[3];
    const selectedPosition = moveReponse[0] + moveReponse[1];
    const { type, color } = chess.get(`${position}`);
    //remove firstplace n place to plan put on
    removePieces(position);
    removePieces(selectedPosition);
    RenderPieces(type, color, position);

    console.log(chess.ascii());
  } catch (error) {
    console.log("ERROR:", error);
  }
}

for (let i = 1; i <= 8; i++) {
  for (let j = 1; j <= 8; j++) {
    const position = String.fromCharCode(96 + i) + `${j}`;

    const square = document.querySelector(`#${position}`);
    square.addEventListener("click", () => {
      if (playerTurn == false) {
        return;
      }
      if (preMove.includes(position)) {
        console.log("it was a move by user!");

        chess.move(`${selectedPosition}-${position}`);
        console.log(chess.ascii());
        const { type, color } = chess.get(`${position}`);
        //remove piece from firstplace n the place plan to put on

        removePieces(selectedPosition);
        removePieces(position);
        RenderPieces(type, color, position);
        //remove previous highlight premove

        ResetBackground();
        updateChess(chess.fen());
        selectedPosition = "";
        preMove = [];
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
