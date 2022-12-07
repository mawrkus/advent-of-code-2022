export function traverseFs(node, callbackFn, level = 0) {
  callbackFn(node, level);

  if (!node.content) {
    return;
  }

  for (const child of node.content) {
    traverseFs(child, callbackFn, level + 1);
  }
}
