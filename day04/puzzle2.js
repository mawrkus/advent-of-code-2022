// import textInput from "./sample.js";
import textInput from "./input.js";

const input = textInput
  .trim()
  .split("\n")
  .map((line) =>
    line.split(",").map((section) => section.split("-").map(Number))
  );

console.log(input);

let output = 0;

for (const [section1, section2] of input) {
  if (
    (section1[0] >= section2[0] && section1[0] <= section2[1]) ||
    (section1[1] >= section2[0] && section1[1] <= section2[1]) ||
    (section2[0] >= section1[0] && section2[0] <= section1[1]) ||
    (section2[1] >= section1[0] && section2[1] <= section1[1])
  ) {
    output += 1;
  }
}

console.log("→", output);
