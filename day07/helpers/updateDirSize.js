export function updateDirSize(fs, currentPath, fileSize) {
  if (!currentPath.length) {
    return;
  }

  fs[currentPath] =
    typeof fs[currentPath] === "undefined"
      ? fileSize
      : fs[currentPath] + fileSize;

  updateDirSize(fs, currentPath.slice(0, -1), fileSize);
}
