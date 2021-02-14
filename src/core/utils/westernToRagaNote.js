import { sanitizePitch } from "./sanitizePitch";
import { getSwaramIndex } from "./getSwaramIndex";

export function westernToRagaNote(pitch, root, currentRaga) {
  const swaramOffset = currentRaga.scale[getSwaramIndex(pitch, root)];
  const firstNoteInOctave = Math.floor((pitch - root) / 12) * 12 + swaramOffset;
  return sanitizePitch(firstNoteInOctave + root);
}
