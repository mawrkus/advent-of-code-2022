export function buildTree(input) {
  for (const node of Object.values(input)) {
    if (node.leftName) {
      node.left = input[node.leftName];
      delete node.leftName;
    }

    if (node.rightName) {
      node.right = input[node.rightName];
      delete node.rightName;
    }
  }

  return input;
}
