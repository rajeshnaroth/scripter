import { NRAGAS } from "../constants";
import { ragaMap } from "../ragaMap";

test("ragaMap tests", () => {
  expect(ragaMap.length).toEqual(NRAGAS);
  expect(ragaMap[0].name).toEqual("1. Kanakangi");
});
