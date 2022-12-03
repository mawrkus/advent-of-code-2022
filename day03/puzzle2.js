// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput.trim().split("\n");

console.log(input);

let output = 0;

for (let i = 0; i < input.length; i += 3) {
  const [items1, items2, items3] = [input[i], input[i + 1], input[i + 2]];
  const [rucksack1, rucksack2, rucksack3] = [
    new Set(items1),
    new Set(items2),
    new Set(items3),
  ];
  for (let item of rucksack1) {
    if (rucksack2.has(item) && rucksack3.has(item)) {
      // A-Z -> [65, 90] /// a-z -> [97, 122]
      const utf16Code = item.charCodeAt(0);
      const priority = utf16Code >= 97 ? utf16Code - 96 : utf16Code - 38;
      output += priority;
    }
  }
}

console.log("→", output);
