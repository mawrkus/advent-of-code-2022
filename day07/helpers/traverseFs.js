export function traverseFs(node, callbackFn, level = 0) {
  const keepOnTraversing = callbackFn(node, level);

  if (keepOnTraversing && node.items) {
    for (const child of Object.values(node.items)) {
      traverseFs(child, callbackFn, level + 1);
    }
  }
}
