/* global UpdatePluginParameters */

import { console } from "../core/console";
import { westernToRagaNote } from "../core/helpers";
import { currentRaga, getRoot, getRagaName } from "./controls";

let oldLabel = "";

// Scripter global
export var NeedsTimingInfo = true; // required to trigger ProcessMidi

// Scripter API
export function ProcessMIDI() {
  // Update Raga Labels if params have changed
  if (oldLabel !== getRagaName()) {
    oldLabel = getRagaName();
    // Trace("Update label to " + oldLabel);
    UpdatePluginParameters();
  }
}

// Scripter API
export function HandleMIDI(event) {
  // ßevent.trace();
  // Trace(toNoteName(event.pitch));
  const root = getRoot();
  event.pitch = westernToRagaNote(event.pitch, root, currentRaga);
  // Trace("Root=" + root + ",Current=" + event.pitch + ", New=" + westernToRagaNote(event.pitch, root));
  event.send();
}

// Scripter API
export function Idle() {
  console.flush();
}
