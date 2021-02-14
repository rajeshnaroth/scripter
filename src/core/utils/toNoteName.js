import { rootNotes } from "../constants";

export function toNoteName(pitch) {
  const note = sanitizePitch(pitch) % NNOTES;
  return rootNotes[note];
}
