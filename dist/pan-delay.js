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

function getDelay() {
  return delay;
}

/* global NoteOn, NoteOff, ControlChange */

// Scripter global
var NeedsTimingInfo = true; // required to trigger ProcessMIDI()
const newDecay = (original, decay, iteration) => original - decay * (iteration + 1);

// Scripter API
function HandleMIDI(event) {
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
function Idle() {
  console.flush();
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
