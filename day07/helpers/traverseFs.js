export function traverseFs(node, callbackFn, level = 0) {
  const keepOnTraversing = callbackFn(node, level);

  if (keepOnTraversing && node.content) {
    for (const child of node.content) {
      traverseFs(child, callbackFn, level + 1);
    }
  }
}
