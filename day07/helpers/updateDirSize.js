export function updateDirSize(currentDir, fileSize) {
  currentDir.size += fileSize;

  if (currentDir.parentDir) {
    updateDirSize(currentDir.parentDir, fileSize);
  }
}
