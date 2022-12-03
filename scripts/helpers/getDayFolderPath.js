import path from "path";

export function getDayFolderPath(dayNumber) {
  const paddedDayNumber = dayNumber < 10 ? `0${dayNumber}` : dayNumber;

  return path.join(process.cwd(), `day${paddedDayNumber}`);
}
