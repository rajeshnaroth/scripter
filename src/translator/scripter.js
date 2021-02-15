/* global UpdatePluginParameters, NoteOn, Trace */

import { console } from "../core/console";
import { westernToRagaNote } from "../core/helpers";
import { currentRaga, getRoot, getParamsToggle, getSkippedNotes } from "./controls";

let prevParamsToggle = false;
let lastPitch = -1;
let ascending = true;

// Scripter global
export var NeedsTimingInfo = true; // required to trigger ProcessMidi

// Scripter API
export function ProcessMIDI() {
  // Update Raga Labels if params have changed
  if (prevParamsToggle !== getParamsToggle()) {
    prevParamsToggle = getParamsToggle();
    Trace("Update label to " + prevParamsToggle);
    UpdatePluginParameters();
  }
}

// Scripter API
export function HandleMIDI(event) {
  if (event instanceof NoteOn) {
    ascending = event.pitch > lastPitch;
    lastPitch = event.pitch;
  }
  const root = getRoot();
  event.pitch = westernToRagaNote(event.pitch, root, currentRaga, getSkippedNotes());
  Trace(`Root=${root} Current=${lastPitch} New=${event.pitch} Ascending=${ascending}`);
  event.send();
}

// Scripter API
export function Idle() {
  console.flush();
}
