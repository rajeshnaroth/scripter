/* global NoteOn, NoteOff, ControlChange */
import { console } from "../core/console";
import { getDelay } from "./controls";

// Scripter global
export var NeedsTimingInfo = true; // required to trigger ProcessMIDI()

// Scripter API
export function ProcessMIDI() {
  // Update Raga Labels if params have changed
}

const newNoteOn = (pitch, velocity) => {
  let note = new NoteOn();
  note.velocity = velocity;
  note.pitch = pitch;
};
const newNoteOff = (pitch) => {
  let note = new NoteOff();
  note.pitch = pitch;
};
const newDecay = (original, decay, iteration) => original - decay * (iteration + 1);

// Scripter API
export function HandleMIDI(event) {
  // event.trace();
  const nEchoes = getDelay();
  // Trace("Root=" + root + ",Current=" + event.pitch + ", New=" + westernToRagaNote(event.pitch, root));
  event.send();
  if (event instanceof NoteOn) {
    for (
      let i = 0, vel = event.velocity - 20, pitch = event.pitch - 2, pan = 1;
      i < nEchoes;
      i++, vel -= 20, pitch += 2, pan *= -1
    ) {
      let cc = new ControlChange();
      cc.number = 10;
      cc.value = pan > 0 ? 127 : 0;
      cc.sendAfterBeats(i);

      let note = new NoteOn();
      note.velocity = newDecay(event.velocity, 30, i);
      note.pitch = pitch;
      note.sendAfterBeats(i);

      note.trace();
      cc.trace();
    }
  }
  if (event instanceof NoteOff) {
    for (let i = 0, pitch = event.pitch - 2; i < nEchoes; i++, pitch += 2) {
      let note = new NoteOff();
      note.pitch = pitch;
      note.sendAfterBeats(i);
      note.trace();
    }
  }
}

// Scripter API
export function Idle() {
  console.flush();
}
