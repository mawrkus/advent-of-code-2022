function parseDayNumber() {
  const [, , rawDayNumber] = process.argv;

  const dayNumber = Number(rawDayNumber);

  if (Number.isNaN(dayNumber)) {
    throw new Error(
      "Please provide a valid day number: npm run start:day [day number]"
    );
  }

  if (dayNumber < 1 || dayNumber > 25) {
    throw new Error(
      "Please provide a day number between 1 and 25: npm run start:day [day number between 1 and 25]"
    );
  }
  return dayNumber;
}

exports.parseDayNumber = parseDayNumber;
