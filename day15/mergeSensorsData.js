export function mergeSensorsData(rangesX) {
  const merged = [...rangesX];
  let count = merged.length;
  let hasMerged;

  do {
    for (let i = 0; i < count; i += 1) {
      const [ax1, ax2] = merged[i];
      hasMerged = false;

      for (let j = i + 1; j < count; j += 1) {
        const [bx1, bx2] = merged[j];
        // console.log("%s vs %s", merged[i], merged[j]);
        // a is in b
        if (ax1 >= bx1 && ax2 <= bx2) {
          // console.log(" %s IN %s", merged[i], merged[j]);
          merged.splice(i, 1);
          // console.log(" -> ", merged);
          hasMerged = true;
          break;
        }

        // b is in a
        if (bx1 >= ax1 && bx2 <= ax2) {
          // console.log(" %s IN %s", merged[j], merged[i]);
          merged.splice(j, 1);
          // console.log(" -> ", merged);
          hasMerged = true;
          break;
        }

        // a + b
        if (ax1 <= bx1 && ax2 >= bx1 - 1) {
          // console.log(" %s + %s", merged[i], merged[j]);
          merged[i] = [ax1, bx2];
          merged.splice(j, 1);
          // console.log(" -> ", merged);
          hasMerged = true;
          break;
        }

        // b + a
        // bx1=0 bx2=12 ax1=12 ax2=20
        if (ax1 <= bx2 + 1 && bx2 <= ax2) {
          // console.log(" %s + %s", merged[j], merged[i]);
          merged[i] = [bx1, ax2];
          merged.splice(j, 1);
          // console.log(" -> ", merged);
          hasMerged = true;
          break;
        }
      }

      if (hasMerged) {
        break;
      }
    }

    count = merged.length;
  } while (hasMerged);

  return merged;
}
