// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput.trim().split("\n");

console.log(input);

let output = 0;

for (let items of input) {
  const itemsCount = items.length;
  const compartment1 = new Set(items.slice(0, itemsCount / 2));
  const compartment2 = new Set(items.slice(-itemsCount / 2));

  for (let item of compartment1) {
    if (compartment2.has(item)) {
      const utf16Code = item.charCodeAt(0); // A-Z -> [65, 90] /// a-z -> [97, 122]
      const priority = utf16Code >= 97 ? utf16Code - 96 : utf16Code - 38;

      output += priority;
    }
  }
}

console.log("→", output);
