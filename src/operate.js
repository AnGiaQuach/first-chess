const { Chess } = require("chess.js");

function RenderBoard() {
  const chessBoard = document.querySelector(".chess-board");
  const BOARD_WITDH = 8;
  let idx = 1;

  for (let i = BOARD_WITDH; i >= 1; i--) {
    let idx2 = 1;
    for (let j = 1; j <= BOARD_WITDH; j++) {
      let square = document.createElement("div");
      const squareName = String.fromCharCode(96 + idx2) + `${idx}`;
      let squareColor;
      if ((idx & 1 && j & 1) || (!(idx & 1) && !(j & 1))) {
        squareColor = "#769656";
      } else {
        squareColor = "#eeeed2";
      }

      square.setAttribute("id", `${squareName}`);
      square.setAttribute(
        "style",
        `grid-row: ${i} / ${i + 1}; grid-column: ${j} / ${j + 1};
         background-color:${squareColor};
         display:flex;
         justify-content:center;
         align-items:center;
         `
      );
      chessBoard.appendChild(square);
      idx2++;
    }
    idx++;
  }
}

function RenderPieces(type, color, pos) {
  const square = document.querySelector(`#${pos}`);
  const pieces = document.createElement("img");
  pieces.src = `https://assets-themes.chess.com/image/ejgfv/150/${
    color + type
  }.png`;
  pieces.style = "width:4rem;height:4rem";
  square.appendChild(pieces);
}

function removePieces(pos) {
  const square = document.querySelector(`#${pos}`);
  const piece = document.querySelector(`#${pos} img`);
  if (piece == null) {
    return;
  }
  square.removeChild(piece);
}

function RenderAllPieces(chess) {
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const position = String.fromCharCode(96 + i) + `${j}`;

      if (chess.get(`${position}`)) {
        const { color, type } = chess.get(`${position}`);
        RenderPieces(type, color, position);
      }
    }
  }
}

function ResetBackground() {
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const position = String.fromCharCode(96 + i) + `${j}`;
      const square = document.querySelector(`#${position}`);
      if ((i & 1 && j & 1) || (!(i & 1) && !(j & 1))) {
        square.style.backgroundColor = "#769656";
      } else {
        square.style.backgroundColor = "#eeeed2";
      }
    }
  }
}

function RenderMove(position, chess) {
  ResetBackground();
  const movePieces = chess.moves({ square: position });
  console.log(movePieces);
  const preMove = [];

  for (let s of movePieces) {
    for (let i = 1; i < s.length - 1; i++) {
      let asciiA = s.charCodeAt(i);
      let asciiB = s.charCodeAt(i + 1);
      if (asciiA >= 97 && asciiA <= 104 && asciiB >= 49 && asciiB <= 56) {
        s = s[i] + s[i + 1];
        break;
      }
    }
    if (s == "O-O") {
      s = "g1";
    } else if (s == "O-O-O") {
      s = "c1";
    }
    console.log(s);

    const squareID = s.slice(-2);
    preMove.push(squareID);
    console.log(squareID);

    const square = document.querySelector(`#${squareID}`);
    square.style.backgroundColor = "#181818";
  }
  return preMove;
}

async function getStockfish(userFen) {
  //https://stockfish.online/api/s/v2.php?depth=15&fen=rn1q1rk1/pp2b1pp/2p2n2/3p1pB1/3P4/1QP2N2/PP1N1PPP/R4RK1%20b%20-%20-%201%2011
  const depth = 15;
  const stockfishURI =
    "https://stockfish.online/api/s/v2.php?" +
    `depth=${depth}` +
    `&fen=${userFen}`;

  const reponse = await fetch(`${stockfishURI}`);
  const fenString = await reponse.json();
  let cont = fenString.continuation;
  let move = "";
  for (let i = 0; i < cont.length; i++) {
    if (cont[i] == " ") {
      break;
    }
    move += cont[i];
  }

  return move;
}

export {
  RenderBoard,
  RenderPieces,
  removePieces,
  RenderAllPieces,
  ResetBackground,
  RenderMove,
  getStockfish,
};
