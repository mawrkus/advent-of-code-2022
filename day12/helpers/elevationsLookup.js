export const elevationsLookup = new Array(26).fill(null).reduce((acc, _, i) => {
  acc[String.fromCharCode(i + 97)] = i + 1;
  return acc;
}, {});

elevationsLookup.S = elevationsLookup.a;
elevationsLookup.E = elevationsLookup.z;
