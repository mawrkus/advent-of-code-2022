// const textInput = require("./sample");
const textInput = require("./input");

const input = textInput
  .trim()
  .split("\n\n")
  .map((elfCalories) => elfCalories.split("\n"));

let output = Number.NEGATIVE_INFINITY;

for (let elfCalories of input) {
  const elfCaloriesSum = elfCalories.reduce((acc, calories) => acc + Number(calories), 0);

  if (elfCaloriesSum > output) {
    output = elfCaloriesSum;
  }
}
console.log(input);
console.log("→", output);
