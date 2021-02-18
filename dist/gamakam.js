'use strict';

// utility for debugging
// depwnds on Scripter's Trace function
// no unit tests

const console = {
  maxFlush: 20,
  b: [],
  log: function (msg) {
    this.b.push(msg);
  },
  flush: function () {
    var i = 0;
    while (i <= this.maxFlush && this.b.length > 0) {
      Trace(this.b.shift());
      i++;
    }
  },
};

/* global Note, NoteOn, PitchBend, NoteOff, GetTimingInfo */

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
var NeedsTimingInfo = true; // required to trigger ProcessMIDI()
function ProcessMIDI() {
  if (isBending) {
    currentPitch += 200;
    const b = getPitchBendCC(currentPitch);
    b.send();
    b.trace();
  }
}

// Scripter API
function HandleMIDI(event) {
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
function Idle() {
  console.flush();
}

const CONTROL_DELAY = 0;

const isControl = (control) => control === CONTROL_DELAY;

// globals
const lengths = ["1/16", "1/8", "1/4", "1/2", "1"];
const lengthList = lengths.map((len, index) => ({ name: len, value: index }));
var length = lengthList[2].value;

// Scripter Plugin definition
var PluginParameters = [
  {
    name: "Gamakam Length in beats",
    type: "menu",
    valueStrings: lengthList.map((d) => d.name),
    defaultValue: length,
  },
];

// Scripter API
function ParameterChanged(param, value) {
  if (!isControl(param)) {
    return;
  }
  if (param === CONTROL_DELAY) {
    length = lengthList[value].value;
    return;
  }
}

/* global Trace */

// Thes following lines are needed to force rollup to include
// all necessary Scripter funcitons and globals
// Scripter will trigger these as needed
(function main() {
  // The following will never happen. simply setting this to a constant false expression will not work
  // Hence the weird Date logic.
  if (Date.now() < 100) {
    Trace(NeedsTimingInfo);
    Trace(PluginParameters);
    HandleMIDI();
    ParameterChanged();
    ProcessMIDI();
    Idle();
  }
})();
