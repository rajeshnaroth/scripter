import { sanitizePitch } from "./sanitizePitch";
import { getSwaramNumber, getSwaramHarmony, getSwaramHarmonyOctave } from "./getSwaramNumber";

function getSubstitution(swaraIndex, skippedNotes, ascending) {
  const skipSwara = Boolean(skippedNotes[swaraIndex]);
  if (!skipSwara) {
    // no need to skip
    return swaraIndex;
  }
  const newIndex = ascending ? (swaraIndex + 1) % 7 : (swaraIndex - 1) % 7;
  return newIndex;
}

export function westernToRagaNote(pitch, root, currentRaga, ascending, skippedNotes, harmony) {
  let swaram = getSwaramNumber(pitch, root);
  let octave = 0;
  if (harmony > 0) {
    octave = getSwaramHarmonyOctave(swaram, harmony); // get octave before mutating swaram value in the next line
    swaram = getSwaramHarmony(swaram, harmony);
  }
  const swaraIndex = getSubstitution(swaram, skippedNotes, ascending);

  const swaramOffset = currentRaga.scale[swaraIndex];
  const firstNoteInOctave = Math.floor((pitch - root) / 12) * 12 + swaramOffset;

  return sanitizePitch(firstNoteInOctave + root + octave * 12);
}
