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
  C: "X", // Scissors vs Rock
  A: "Y", // Rock vs Paper
  B: "Z", // Paper vs Scissors
};

const losingMovesLookup = {
  A: "Z", // Rock vs Scissors
  B: "X", // Paper vs Rock
  C: "Y", // Scissors vs Paper
};

const winScore = 6;
const drawScore = 3;

const input = textInput
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

let output = 0;

for (let [oppponentMove, myMove] of input) {
  if (myMove === "Z") {
    // needs to win
    const myNewMove = winningMovesLookup[oppponentMove];

    output += winScore + movesToScoresLookup[myNewMove];
  } else if (myMove === "Y") {
    // needs a draw
    output += drawScore + movesToScoresLookup[oppponentMove];
  } else if (myMove === "X") {
    // needs to lose
    const myNewMove = losingMovesLookup[oppponentMove];

    output += movesToScoresLookup[myNewMove];
  }
}

console.log(input);
console.log("→", output);
