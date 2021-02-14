"use strict";

const ragaList = [
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

const NNOTES = 12;
const NRAGAS = 72;
const NRAGAS_HALF = NRAGAS / 2;

const CONTROL_ROOT = 0;
const LABEL_RAGA_NAME = 1;
const CONTROL_HEAD = 2;
const CONTROL_MID = 3;
const CONTROL_TAIL = 4;
const LABEL_RAGA_LAYOUT = 5;
const isControl = (control) => control !== LABEL_RAGA_NAME && control != LABEL_RAGA_LAYOUT;

const NOTE_AREA_SA = 0;
const NOTE_AREA_RIGA = 1;
const NOTE_AREA_MA = 2;
const NOTE_AREA_PA = 3;
const NOTE_AREA_DANI = 4;

// even text controls have an index
var controlValues = [-1, 0, -1, 4, 0, 4];

const rootNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const swarams = ["SA", "RI", "GA", "MA", "PA", "DA", "NI"];

const saOffset = [0];
const riOffset = [1, 1, 1, 2, 2, 3]; // offset from root 0
const gaOffset = [2, 3, 4, 3, 4, 4];
const maOffset = [5, 6];
const paOffset = [7];
const daOffset = [8, 8, 8, 9, 9, 10];
const niOffset = [9, 10, 11, 10, 11, 11];

const headNames = ["R1-G1", "R1-G2", "R1-G3", "R2-G2", "R2-G3", "R3-G3"];
const tailNames = ["D1-N1", "D1-N2", "D1-N3", "D2-N2", "D2-N3", "D3-N3"];

// Construct all Melakartha Raga Map
const ragaMap = ragaList.map((ragaName, index) => {
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
  // A visual representation of the 12 notes
  const scaleLayout = new Array(12).fill(0).map((_note, index) => {
    const swaraIndex = scale.findIndex((noteIndex) => noteIndex === index);
    return swaraIndex < 0 ? "--" : swarams[swaraIndex];
  });

  return {
    name: ragaName,
    scale: scale,
    layout: scaleLayout.join(" "),
  };
});

var currentRaga = ragaMap[0];

function sanitizePitch(pitch) {
  const MIN_MIDI_PITCH = 0;
  const MAX_MIDI_PITCH = 125;
  return pitch < MIN_MIDI_PITCH ? MIN_MIDI_PITCH : pitch > MAX_MIDI_PITCH ? MAX_MIDI_PITCH : pitch;
}

function toNoteName(pitch) {
  const note = sanitizePitch(pitch) % NNOTES;
  return rootNotes[note];
}

// returns 0 == sa, 1 == ri and so on
function getSwaramIndex(pitch, root) {
  const note = sanitizePitch(pitch + NNOTES - root) % NNOTES;
  const swaramIndexMap = [0, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6];
  return swaramIndexMap[note];
}

function chromaToRagaNote(pitch, root) {
  const swaramOffset = currentRaga.scale[getSwaramIndex(pitch, root)];
  const firstNoteInOctave = Math.floor((pitch - root) / 12) * 12 + swaramOffset;
  return sanitizePitch(firstNoteInOctave + root);
}

function noteArea(pitch) {
  const note = sanitizePitch(pitch) % NNOTES;
  if (note === 0) {
    return NOTE_AREA_SA;
  }
  if (note === 7) {
    return NOTE_AREA_PA;
  }
  if (note < 5) {
    return NOTE_AREA_RIGA;
  }
  if (note < 7) {
    return NOTE_AREA_MA;
  }
  return NOTE_AREA_DANI;
}

function ragaIndex(head, ma, tail) {
  // just in case, sanitize input
  ma = ma % 2;
  head = head % 6;
  tail = tail % 6;
  const index = ma * NRAGAS_HALF + head * 6 + tail;
  return index >= 0 && index < ragaMap.length ? index : 0;
}

// Interface
var PluginParameters = [
  {
    name: "Root Note",
    type: "menu",
    valueStrings: rootNotes,
    defaultValue: controlValues[CONTROL_ROOT],
  },
  {
    name: "Raga aka Scale",
    type: "text",
  },
  {
    name: "Head",
    type: "menu",
    valueStrings: headNames,
    defaultValue: controlValues[CONTROL_HEAD],
  },
  {
    name: "Ma",
    type: "menu",
    valueStrings: ["Normal", "Lydian"],
    defaultValue: controlValues[CONTROL_MID],
  },
  {
    name: "Tail",
    type: "menu",
    valueStrings: tailNames,
    defaultValue: controlValues[CONTROL_TAIL],
  },
  {
    name: "Swara Positions",
    type: "text",
  },
];

var oldLabel = "";
var NeedsTimingInfo = true; // required to trigger ProcessMidi
export function ProcessMIDI() {
  // Update Raga Labels if params have changed
  if (oldLabel !== PluginParameters[LABEL_RAGA_NAME].name) {
    oldLabel = PluginParameters[LABEL_RAGA_NAME].name;
    // Trace("Update label to " + oldLabel);
    UpdatePluginParameters();
  }
}

export function HandleMIDI(event) {
  event.trace();

  // Trace(toNoteName(event.pitch));
  const root = controlValues[CONTROL_ROOT];
  event.pitch = chromaToRagaNote(event.pitch, root);
  // Trace("Root=" + root + ",Current=" + event.pitch + ", New=" + chromaToRagaNote(event.pitch, root));

  // console.log(currentRaga.scale);
  // console.log(currentRaga.layout);
  event.send();
}

export function ParameterChanged(param, value) {
  if (!isControl(param)) {
    return;
  }
  controlValues[param] = value;
  //Trace(param + "-" + value);
  const ragaNumber = ragaIndex(controlValues[CONTROL_HEAD], controlValues[CONTROL_MID], controlValues[CONTROL_TAIL]);
  currentRaga = ragaMap[ragaNumber];
  const label = "Raga-" + currentRaga.name;

  // Trace("Param Changed " + label + ":" + currentRaga.layout);
  PluginParameters[LABEL_RAGA_NAME].name = label;
  PluginParameters[LABEL_RAGA_LAYOUT].name = currentRaga.layout;
}

// Utils
export const console = {
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

export function Idle() {
  console.flush();
}
