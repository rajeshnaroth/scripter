import { sanitizePitch } from "./sanitizePitch";
import { getSwaramIndex } from "./getSwaramIndex";

export function westernToRagaNote(pitch, root, currentRaga, skippedNotes) {
  let swaraIndex = getSwaramIndex(pitch, root);
  const skipSwara = Boolean(skippedNotes[swaraIndex]);
  if (skipSwara) {
    swaraIndex = (swaraIndex + 1) % 7;
  }
  const swaramOffset = currentRaga.scale[swaraIndex];
  const firstNoteInOctave = Math.floor((pitch - root) / 12) * 12 + swaramOffset;
  return sanitizePitch(firstNoteInOctave + root);
}
