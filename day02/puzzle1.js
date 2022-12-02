// const textInput = require("./sample");
const textInput = require("./input");

const movesToScoresLookup = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
};

const winningMovesLookup = {
  CX: true, // Rock vs Scissors
  AY: true, // Paper vs Rock
  BZ: true, // Scissors vs Paper
};

const winScore = 6;
const drawScore = 3;

const input = textInput
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

let output = 0;

for (let [oppponentMove, myMove] of input) {
  if (winningMovesLookup[oppponentMove + myMove]) {
    // win
    output += winScore + movesToScoresLookup[myMove];
  } else if (
    movesToScoresLookup[oppponentMove] === movesToScoresLookup[myMove]
  ) {
    // draw
    output += drawScore + movesToScoresLookup[myMove];
  } else {
    // lose
    output += movesToScoresLookup[myMove];
  }
}

console.log(input);
console.log("→", output);
