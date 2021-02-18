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

/* global Note, NoteOn, NoteOff, Trace */
function feed(note) {
  const getIndex = (note) => this.pitches.findIndex((pitch) => pitch === note.pitch);
  if (!(note instanceof Note)) {
    return -1;
  }
  if (note instanceof NoteOn) {
    this.pitches.add(note.pitch);
    this.pitches.sort();
    const pitchIndex = getIndex(note);
    if (pitchIndex < 0) {
      Trace(`Error. Unable to find pitch after adding ${note.ptch}`);
      return;
    }
    return pitchIndex + 1;
  }
  if (note instanceof NoteOff) {
    const pitchIndex = getIndex(note);
    if (pitchIndex < 0) {
      Trace(`Error. Unable to find matching NoteOff for note ${note.ptch}`);
      return;
    }
    this.pitches.splice(pitchIndex, 1);
    return pitchIndex + 1;
  }
}

function toString() {
  return this.pitches.join(",");
}

const buffer = {
  pitches: [],
};

const chordBuffer = {
  feed: feed.bind(buffer),
  toString: toString.bind(buffer),
  size: () => buffer.pitches.length,
};

/* global Note */

// Scripter global
var NeedsTimingInfo = true; // required to trigger ProcessMIDI()

// Scripter API
function HandleMIDI(event) {
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
function Idle() {
  console.flush();
}

const CONTROL_DELAY = 0;

const isControl = (control) => control === CONTROL_DELAY;

// globals
const delayList = [
  { name: "1", value: 2 },
  { name: "4", value: 4 },
];
var delay = delayList[1].value;

// Scripter Plugin definition
var PluginParameters = [
  {
    name: "Delay",
    type: "menu",
    valueStrings: delayList.map((d) => d.name),
    defaultValue: delay,
  },
];

// Scripter API
function ParameterChanged(param, value) {
  if (!isControl(param)) {
    return;
  }
  if (param === CONTROL_DELAY) {
    delay = delayList[value].value;
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
    Idle();
  }
})();
