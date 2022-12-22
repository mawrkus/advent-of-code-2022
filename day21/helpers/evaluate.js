const ops = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "=": (a, b) => a === b,
};

export function evaluate(node) {
  if (typeof node.number !== "undefined") {
    return node.number;
  }

  const key = `${node.left.name}${node.op}${node.right.name}`;

  if (evaluate.cache.has(key)) {
    return evaluate.cache.get(key);
  }

  const result = ops[node.op](evaluate(node.left), evaluate(node.right));

  evaluate.cache.set(key, result);

  return result;
}

evaluate.cache = new Map();
