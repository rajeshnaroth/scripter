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

function sanitizePitch(pitch) {
  const MIN_MIDI_PITCH = 0;
  const MAX_MIDI_PITCH = 125;
  return pitch < MIN_MIDI_PITCH ? MIN_MIDI_PITCH : pitch > MAX_MIDI_PITCH ? MAX_MIDI_PITCH : pitch;
}

const NNOTES = 12;
const NRAGAS = 72;
const NRAGAS_HALF = NRAGAS / 2;

const rootNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const swarams = ["SA", "RI", "GA", "MA", "PA", "DA", "NI"];

// returns 0 == sa, 1 == ri and so on
function getSwaramNumber(pitch, root) {
  const note = sanitizePitch(pitch + NNOTES - root) % NNOTES;
  const swaramIndexMap = [0, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6];
  return swaramIndexMap[note];
}

function getSwaramHarmony(swaramNumber, harmony) {
  return (swaramNumber + harmony) % 7;
}

function getSwaramHarmonyOctave(swaramNumber, harmony) {
  return swaramNumber + harmony > 6 ? 1 : 0;
}

function getSubstitution(swaraIndex, skippedNotes, ascending) {
  const skipSwara = Boolean(skippedNotes[swaraIndex]);
  if (!skipSwara) {
    // no need to skip
    return swaraIndex;
  }
  const newIndex = ascending ? (swaraIndex + 1) % 7 : (swaraIndex - 1) % 7;
  return newIndex;
}

function westernToRagaNote(pitch, root, currentRaga, ascending, skippedNotes, harmony) {
  let swaram = getSwaramNumber(pitch, root);
  let octave = 0;
  if (harmony > 0) {
    octave = getSwaramHarmonyOctave(swaram, harmony); // get octave before mutating swaram value in the next line
    swaram = getSwaramHarmony(swaram, harmony);
  }
  const swaraIndex = getSubstitution(swaram, skippedNotes, ascending);

  const swaramOffset = currentRaga.scale[swaraIndex];
  const firstNoteInOctave = Math.floor((pitch - root) / 12) * 12 + swaramOffset;

  return sanitizePitch(firstNoteInOctave + root + octave * 12);
}

const ragaNames = [
  "1. Kanakangi",
  "2. Ratnangi",
  "3. Ganamurti",
  "4. Vanaspati",
  "5. Manavati",
  "6. Tanarupi",
  "7. Senavati",
  "8. Hanumatodi",
  "9. Dhenuka",
  "10 Natakapriya",
  "11. Kokilapriya",
  "12. Rupavati",
  "13. Gayakapriya",
  "14. Vakulabharanam",
  "15. Mayamalavagaula",
  "16. Chakravakam",
  "17. Suryakantam",
  "18. Hatakambari",
  "19. Jhankaradhvani",
  "20. Natabhairavi",
  "21. Kiravani",
  "22. Kharaharapriya",
  "23. Gowrimanohari",
  "24. Varunapriya",
  "25. Mararanjani",
  "26. Charukesi",
  "27. Sarasangi",
  "28. Harikambhoji",
  "29. Dheera sankarabharanam",
  "30. Naganandini",
  "31. Yagapriya",
  "32. Raga vardhini",
  "33. Gangeyabhushani",
  "34. Vagadhesvari",
  "35. Soolini",
  "36. Chalanaatai",
  "37. Salagam",
  "38. Jalarnavam",
  "39. Jhalavarali",
  "40. Navaneetam",
  "41. Pavani",
  "42. Raghupriya",
  "43. Gavambodhi",
  "44. Bhavapriya",
  "45. Subhapantuvarali",
  "46. Shadvidhamargini",
  "47. Suvarnangi",
  "48. Divyamani",
  "49. Dhavalambari",
  "50. Namanarayani",
  "51. Kamavardhini",
  "52. Ramapriya",
  "53. Gamanasrama",
  "54. Visvambhari",
  "55. Syamalangi",
  "56. Shanmukhapriya",
  "57. Simhendra madhyama",
  "58. Hemavati",
  "59. Dharmavati",
  "60. Neetimati",
  "61. Kantamani",
  "62. Rishabhapriya",
  "63. Latangi",
  "64. Vachaspati",
  "65. Mechakalyani",
  "66. Chitrambari",
  "67. Sucharitra",
  "68. Jyotisvarupini",
  "69. Dhatuvardhini",
  "70. Nasika bhushani",
  "71. Kosalam",
  "72. Rasikapriya",
];

const saOffset = [0];
const riOffset = [1, 1, 1, 2, 2, 3]; // offset from root 0
const gaOffset = [2, 3, 4, 3, 4, 4];
const maOffset = [5, 6];
const paOffset = [7];
const daOffset = [8, 8, 8, 9, 9, 10];
const niOffset = [9, 10, 11, 10, 11, 11];

// A visual representation of the 12 notes
function getLayout(scale, skipList) {
  const scaleLayout = new Array(12).fill(0).map((_note, index) => {
    const swaraIndex = scale.findIndex((noteIndex) => noteIndex === index);
    const skipSwara = swaraIndex > 0 && Boolean(skipList[swaraIndex]);
    // Trace(`[${swaraIndex}]= ${skipList[swaraIndex]} skip ${skipSwara}`);
    return skipSwara || swaraIndex < 0 ? "--" : swarams[swaraIndex];
  });

  return scaleLayout.join(" ");
}

// Construct all Melakartha Raga Map
const ragaMap = ragaNames.map((ragaName, index) => {
  const maSection = Math.floor(index / NRAGAS_HALF);
  const riGaSection = Math.floor((index % NRAGAS_HALF) / 6);
  const daNiSection = Math.floor(index % 6);
  const scale = [
    saOffset[0],
    riOffset[riGaSection],
    gaOffset[riGaSection],
    maOffset[maSection],
    paOffset[0],
    daOffset[daNiSection],
    niOffset[daNiSection],
  ];

  return {
    name: ragaName,
    scale,
    getLayout: ((s) => (skipList) => getLayout(s, skipList))(scale),
  };
});

const CONTROL_ROOT = 0;
const CONTROL_RAGAS = 1;
const LABEL_RAGA_LAYOUT = 2;

const isControl = (control) => control != LABEL_RAGA_LAYOUT;

const ragaNames$1 = ragaMap.map((raga) => raga.name);

// globals
var controlValues = [0, 14, -1];
var currentRaga = ragaMap[0];

function setCurrentRaga(index) {
  currentRaga = ragaMap[index];
}

// Scripter global
var PluginParameters = [
  {
    name: "Root Note",
    type: "menu",
    valueStrings: rootNotes,
    defaultValue: controlValues[CONTROL_ROOT],
  },
  {
    name: "Raga",
    type: "menu",
    valueStrings: ragaNames$1,
    defaultValue: controlValues[CONTROL_RAGAS],
  },
  {
    name: "Swara Positions",
    type: "text",
  },
];

// Scripter API
function ParameterChanged(param, value) {
  if (!isControl(param)) {
    return;
  }
  controlValues[param] = value;
  const ragaNumber = controlValues[CONTROL_RAGAS];
  setCurrentRaga(ragaNumber);

  PluginParameters[LABEL_RAGA_LAYOUT].name = currentRaga.layout;
}

function getRagaNumber() {
  return controlValues[CONTROL_RAGAS];
}

function getRoot() {
  return controlValues[CONTROL_ROOT];
}

/* global UpdatePluginParameters */

let oldIndex = "";

// Scripter global
var NeedsTimingInfo = true; // required to trigger ProcessMidi

// Scripter API
function ProcessMIDI() {
  // Update Raga Labels if params have changed
  if (oldIndex !== getRagaNumber()) {
    oldIndex = getRagaNumber();
    UpdatePluginParameters();
  }
}

// Scripter API
function HandleMIDI(event) {
  // event.trace();
  const root = getRoot();
  event.pitch = westernToRagaNote(event.pitch, root, currentRaga);
  // Trace("Root=" + root + ",Current=" + event.pitch + ", New=" + westernToRagaNote(event.pitch, root));
  event.send();
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
    HandleMIDI();
    ParameterChanged();
    ProcessMIDI();
    Idle();
  }
})();
