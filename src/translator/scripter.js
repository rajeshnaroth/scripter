/* global UpdatePluginParameters, NoteOn, NoteOff, Trace */

import { console } from "../core/console";
import { westernToRagaNote } from "../core/helpers";
import {
  currentRaga,
  getRoot,
  hasParamsChanged,
  resetParamsChangedState,
  getSkippedNotes,
  getHarmony,
} from "./controls";

let lastPitch = -1;
let ascending = true;

// Scripter global
export var NeedsTimingInfo = true; // required to trigger ProcessMidi

// Scripter API
export function ProcessMIDI() {
  // Update Raga Labels if params have changed
  if (hasParamsChanged()) {
    Trace("Params changed. Updating labels");
    resetParamsChangedState();
    UpdatePluginParameters();
  }
}

// Scripter API
export function HandleMIDI(event) {
  if (!(event instanceof NoteOn || event instanceof NoteOff)) {
    event.send();
    return;
  }
  if (event instanceof NoteOn) {
    ascending = event.pitch > lastPitch;
    lastPitch = event.pitch;
  }
  const root = getRoot();
  event.pitch = westernToRagaNote(event.pitch, root, currentRaga, ascending, getSkippedNotes());
  // Trace(`Root=${root} Current=${lastPitch} New=${event.pitch} Ascending=${ascending}`);
  event.send();
  event.trace();
  if (getHarmony() > 0) {
    event.pitch = westernToRagaNote(event.pitch, root, currentRaga, ascending, getSkippedNotes(), getHarmony());
    event.trace();
    event.send();
  }
}

// Scripter API
export function Idle() {
  console.flush();
}
