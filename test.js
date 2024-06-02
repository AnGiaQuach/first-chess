const { Chess } = require("chess.js");

let chess = new Chess(
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R w KQkq - 0 1"
);

console.log(chess.moves({ square: "e1" }));
chess.move("e1-g1");
console.log(chess.ascii());
// chess.move({ verbos: true });
// console.log(chess.ascii());

// let s = "1";
// console.log(s.charCodeAt(0));

// chess.load("r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7");

// console.log(chess.moves({ square: "e7" })); // Ne7 is unambiguous because the knight on c6 is pinned
// console.log(chess.ascii());
