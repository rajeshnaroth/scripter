import { getSwaramNumber, getSwaramHarmony } from "../getSwaramNumber";

test("getSwaramNumber tests", () => {
  expect(getSwaramNumber(0, 0)).toEqual(0);
  expect(getSwaramNumber(1, 0)).toEqual(1);
  expect(getSwaramNumber(2, 0)).toEqual(1);
  expect(getSwaramNumber(0, 1)).toEqual(6);
  //
  expect(getSwaramHarmony(0, 2)).toEqual(2);
  expect(getSwaramHarmony(3, 2)).toEqual(5);
  expect(getSwaramHarmony(5, 2)).toEqual(0);
  expect(getSwaramHarmony(6, 2)).toEqual(1);
});
