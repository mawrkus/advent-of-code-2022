export function parseInput(textInput) {
  return textInput
    .trim()
    .split("\n\n")
    .map((monkeysData) =>
      monkeysData
        .split(
          /(Monkey \d+:|[ ]*Starting items: [^\n]+|[ ]*Operation: [^\n]+|Test: .+)/s
        )
        .map((part) => part && part.trim())
        .filter(Boolean)
    )
    .map(([monkeyPart, itemsPart, operationPart, testPart]) => {
      const [, rawMonkeyNumber] = monkeyPart.match(/Monkey (\d+)/);
      const number = Number(rawMonkeyNumber);

      const [, rawItems] = itemsPart.match(/Starting items: (.+)/);
      const items = rawItems.split(", ").map(Number);

      const [, operation] = operationPart.match(/Operation: (.+)/);
      const operationFn = new Function(
        "old",
        operation.replace("new =", "return")
      );

      const [, divisibleBy, trueMonkeyNumber, falseMonkeyNumber] =
        testPart.match(
          /Test: divisible by (\d+)\W[ ]*If true: throw to monkey (\d+)\W[ ]*If false: throw to monkey (\d+)/
        );
      const recipientFn = new Function(
        "value",
        `return (value % ${divisibleBy} === 0) ? ${trueMonkeyNumber} : ${falseMonkeyNumber}`
      );

      return {
        number,
        items,
        operationFn,
        recipientFn,
        inspectedCount: 0,
        divisor: Number(divisibleBy),
      };
    });
}
