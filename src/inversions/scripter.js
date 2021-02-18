/* global Note */
import { console } from "../core/console";
import { chordBuffer } from "../core/helpers";

// Scripter global
export var NeedsTimingInfo = true; // required to trigger ProcessMIDI()

// Scripter API
export function ProcessMIDI() {}

// Scripter API
export function HandleMIDI(event) {
  // event.trace();

  if (!(event instanceof Note)) {
    event.send();
    return;
  }
  const notePosition = chordBuffer.feed(event);
  if (notePosition <= 1) {
    event.send();
    return;
  }
  event.pitch += (notePosition - 2) * 12;
  event.send();
}

// Scripter API
export function Idle() {
  console.flush();
}
