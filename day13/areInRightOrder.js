export function areInRightOrder(left, right) {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) {
      return true;
    }

    if (left > right) {
      return false;
    }

    return undefined;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    let i = 0;

    while (left[i] !== undefined && right[i] !== undefined) {
      const result = areInRightOrder(left[i], right[i]);

      if (result !== undefined) {
        return result;
      }

      i += 1;
    }

    if (left[i] === undefined && right[i] === undefined) {
      return undefined;
    }

    return left[i] === undefined;
  }

  if (Number.isInteger(left)) {
    return areInRightOrder([left], right);
  }

  if (Number.isInteger(right)) {
    return areInRightOrder(left, [right]);
  }

  throw "Uh?!";
}
