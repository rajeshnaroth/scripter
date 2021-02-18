export function getLength(beatLength) {
  const lengthMap = {
    "1/16T": 0.166,
    "1/16": 0.25,
    "1/16.": 0.375,
    "1/8T": 0.333,
    "1/8": 0.5,
    "1/8.": 0.75,
    "1/4T": 0.666,
    "1/4": 1,
    "1/4.": 1.5,
    "1/2T": 1.333,
    "1/2": 2,
    "1/2.": 3,
    1: 4,
    2: 8,
  };
  return lengthMap[beatLength] || 1;
}
