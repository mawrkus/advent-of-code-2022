export function displayMap(input, path) {
  console.log();

  const paths = path.reduce((acc, pos) => ({ ...acc, [pos]: true }), {});

  for (let y = 0; y < input.length; y += 1) {
    const line = input[y].reduce(
      (acc, elevation, x) =>
        acc + (paths[[x, y]] ? `\u001b[37;1m${elevation}\u001b[0m` : elevation),
      ""
    );

    console.log(line);
  }

  console.log();
}
