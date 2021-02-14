import { getRagaIndex } from "../getRagaIndex";

test("getRagaIndex tests", () => {
  expect(getRagaIndex(0, 0, 0)).toEqual(0);
  expect(getRagaIndex(5, 1, 5)).toEqual(71);
  expect(getRagaIndex(2, 1, 3)).toEqual(51);
  expect(() => getRagaIndex(6, 1, 5)).toThrow(Error);
});
