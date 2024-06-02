const { Chess } = require("chess.js");

let chess = new Chess(
  "r2qkbnr/ppp2ppp/8/1B2pQ2/3nP3/8/PPP2PPP/RNB1K2R b KQkq - 3 7"
);

console.log(chess.moves({ square: "a8" }));
chess.move("d8-d7");
console.log(chess.ascii());

// chess.load("r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7");

// console.log(chess.moves({ square: "e7" })); // Ne7 is unambiguous because the knight on c6 is pinned
// console.log(chess.ascii());
