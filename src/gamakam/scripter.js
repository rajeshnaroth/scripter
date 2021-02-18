/* global Note, NoteOn, PitchBend, NoteOff, GetTimingInfo */
import { console } from "../core/console";

let isBending = false;
let currentPitch = 0;

const bendBy = (nNotes) => (8192 / 12) * nNotes;

function getPitchBendCC(pitch) {
  // -8192 thru 0 to +8191
  pitch = pitch < -8192 ? -8192 : pitch > 8191 ? 8191 : pitch;
  const bend = new PitchBend();
  bend.value = pitch;

  return bend;
}

// Scripter API
export var NeedsTimingInfo = true; // required to trigger ProcessMIDI()
export function ProcessMIDI() {
  if (isBending) {
    currentPitch += 200;
    const b = getPitchBendCC(currentPitch);
    b.send();
    b.trace();
  }
}

// Scripter API
export function HandleMIDI(event) {
  // event.trace();

  if (!(event instanceof Note)) {
    event.send();
    return;
  }
  if (event instanceof NoteOn) {
    currentPitch += bendBy(2);
    isBending = true;
    Trace(` NoteOn BendBy${currentPitch}, ${isBending}`);
    event.send();
    return;
  }
  if (event instanceof NoteOff) {
    isBending = false;
    event.send();
    currentPitch = 0;
    getPitchBendCC(0).send(); // reset pitch
    Trace(`NoteOff Pitch=${currentPitch}, ${isBending}`);
    return;
  }
  // if Note On, fill buffer with pitch bend values to be picked up in ProcessMidi
  // If Note is Off, clear buffer
}

// Scripter API
export function Idle() {
  console.flush();
}
/*

TimingInfo.playing: Uses Boolean logic where “true” means the host transport is running.

TimingInfo.blockStartBeat: A floating point number indicates the beat position at the start of the process block. An alternative is to use the beatPos property. See Use the MIDI event beatPos property.

TimingInfo.blockEndBeat: A floating point number indicates the beat position at the end of the process block.

TimingInfo.blockLength: A floating point number indicates the length of the process block in beats.

TimingInfo.tempo: A floating point number indicates the host tempo.

TimingInfo.meterNumerator: An integer number indicates the host meter numerator.

TimingInfo.meterDenominator: An integer number indicates the host meter denominator.

TimingInfo.cycling: Uses Boolean logic where “true” means the host transport is cycling.

TimingInfo.leftCycleBeat: A floating point number indicates the beat position at the start of the cycle range.

TimingInfo.rightCycleBeat: A floating point number indicates the beat position at the end of the cycle range.
*/

let x = {
  playing: false,
  leftCycleBeat: 1,
  rightCycleBeat: 9,
  cycling: false,
  blockStartBeat: 740.6615872859954,
  blockLength: 0.005804999669408062,
  meterDenominator: 4,
  blockEndBeat: 740.6673922856648,
  tempo: 120,
  meterNumerator: 4,
};
