import { getSwaramIndex } from "../getSwaramIndex";

test("getSwaramIndex tests", () => {
  expect(getSwaramIndex(0, 0)).toEqual(0);
  expect(getSwaramIndex(1, 0)).toEqual(1);
  expect(getSwaramIndex(2, 0)).toEqual(1);
  expect(getSwaramIndex(0, 1)).toEqual(6);
});
