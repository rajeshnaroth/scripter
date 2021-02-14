import { NRAGAS_HALF } from "../constants";
import { isBetween } from "./validations";

export function getRagaIndex(head, ma, tail) {
  if (!isBetween(ma, 0, 1)) {
    throw new Error("getRagaIndex, ma value must be between 0 and 1 inclusive");
  }
  if (!isBetween(head, 0, 5)) {
    throw new Error("getRagaIndex, head value must be between 0 and 5 inclusive");
  }
  if (!isBetween(tail, 0, 5)) {
    throw new Error("getRagaIndex, tail value must be between 0 and 5 inclusive");
  }
  return ma * NRAGAS_HALF + head * 6 + tail;
}
