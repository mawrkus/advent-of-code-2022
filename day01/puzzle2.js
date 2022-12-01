// const textInput = require("./sample");
const textInput = require("./input");

const input = textInput
  .trim()
  .split("\n\n")
  .map((elfCalories) => elfCalories.split("\n"));

let output;

const top3 = [];

for (let elfCalories of input) {
  const elfCaloriesSum = elfCalories.reduce((acc, calories) => acc + Number(calories), 0);

  if (top3.length < 3) {
    top3.push(elfCaloriesSum);
  } else {
    top3.sort((a, b) => a - b);

    if (elfCaloriesSum > top3[0]) {
      top3[0] = elfCaloriesSum;
    }
  }
}

output = top3.reduce((acc, topSum) => acc + topSum, 0);

console.log(input);
console.log("→", output);
