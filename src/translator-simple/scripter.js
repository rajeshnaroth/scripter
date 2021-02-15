/* global UpdatePluginParameters */

import { console } from "../core/console";
import { westernToRagaNote } from "../core/helpers";
import { currentRaga, getRoot, getRagaNumber } from "./controls";

let oldIndex = "";

// Scripter global
export var NeedsTimingInfo = true; // required to trigger ProcessMidi

// Scripter API
export function ProcessMIDI() {
  // Update Raga Labels if params have changed
  if (oldIndex !== getRagaNumber()) {
    oldIndex = getRagaNumber();
    UpdatePluginParameters();
  }
}

// Scripter API
export function HandleMIDI(event) {
  // event.trace();
  const root = getRoot();
  event.pitch = westernToRagaNote(event.pitch, root, currentRaga);
  // Trace("Root=" + root + ",Current=" + event.pitch + ", New=" + westernToRagaNote(event.pitch, root));
  event.send();
}

// Scripter API
export function Idle() {
  console.flush();
}
