import { NNOTES } from "../constants";
import { sanitizePitch } from "./sanitizePitch";

// returns 0 == sa, 1 == ri and so on
export function getSwaramNumber(pitch, root) {
  const note = sanitizePitch(pitch + NNOTES - root) % NNOTES;
  const swaramIndexMap = [0, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6];
  return swaramIndexMap[note];
}

export function getSwaramHarmony(swaramNumber, harmony) {
  return (swaramNumber + harmony) % 7;
}

export function getSwaramHarmonyOctave(swaramNumber, harmony) {
  return swaramNumber + harmony > 6 ? 1 : 0;
}
