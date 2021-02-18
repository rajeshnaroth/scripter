import { rootNotes } from "../core/constants";
import { getRagaIndex } from "../core/helpers";
import { ragaMap } from "../core/ragaMap";

const CONTROL_ROOT = 0;
const LABEL_RAGA_NAME = 1;
const CONTROL_HARMONY = 2;
const CONTROL_HEAD = 3;
const CONTROL_MID = 4;
const CONTROL_TAIL = 5;
const CONTROL_SKIP_RI = 6;
const CONTROL_SKIP_GA = 7;
const CONTROL_SKIP_MA = 8;
const CONTROL_SKIP_PA = 9;
const CONTROL_SKIP_DA = 10;
const CONTROL_SKIP_NI = 11;
const LABEL_RAGA_LAYOUT = 12;

const isControl = (control) => control !== LABEL_RAGA_NAME && control != LABEL_RAGA_LAYOUT;

const headNames = ["R1-G1 Weird", "R1-G2 Arabic", "R1-G3 Gaulam", "R2-G2 Minor", "R2-G3 Major", "R3-G3 Jazz"];
const tailNames = ["D1-N1 Weird", "D1-N2 Arabic", "D1-N3 Gaulam", "D2-N2 Minor", "D2-N3 Major", "D3-N3 Jazz"];

// globals
export var controlValues = [-1, 1, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, -1];
export var currentRaga = ragaMap[0];

export function setCurrentRaga(index) {
  currentRaga = ragaMap[index];
}

// Scripter global
export var PluginParameters = [
  {
    name: "Shruthi / Root Note",
    type: "menu",
    valueStrings: rootNotes,
    defaultValue: controlValues[CONTROL_ROOT],
  },
  {
    name: "Melakartha Raga / Base Scale",
    type: "text",
  },
  {
    name: "Harmony",
    type: "menu",
    valueStrings: ["None", "Seconds", "Thirds", "Fourths", "Fifths", "Sixths", "Sevenths", "Octave"],
    defaultValue: controlValues[CONTROL_HARMONY],
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
    name: "Skip Ri",
    type: "checkbox",
    defaultValue: controlValues[CONTROL_SKIP_RI],
  },
  {
    name: "Skip Ga",
    type: "checkbox",
    defaultValue: controlValues[CONTROL_SKIP_GA],
  },
  {
    name: "Skip Ma",
    type: "checkbox",
    defaultValue: controlValues[CONTROL_SKIP_MA],
  },
  {
    name: "Skip Pa",
    type: "checkbox",
    defaultValue: controlValues[CONTROL_SKIP_PA],
  },
  {
    name: "Skip Da",
    type: "checkbox",
    defaultValue: controlValues[CONTROL_SKIP_DA],
  },
  {
    name: "Skip Ni",
    type: "checkbox",
    defaultValue: controlValues[CONTROL_SKIP_NI],
  },
  {
    name: "Swara Positions",
    type: "text",
  },
];

// Scripter API
var paramsChanged = false;
export function ParameterChanged(param, value) {
  // Trace(param + " changed to -" + value + "isControl=" + !isControl(param));
  if (!isControl(param)) {
    return;
  }
  if (controlValues[param] !== value) {
    paramsChanged = true;
    controlValues[param] = value;
  }
  const ragaNumber = getRagaIndex(controlValues[CONTROL_HEAD], controlValues[CONTROL_MID], controlValues[CONTROL_TAIL]);
  setCurrentRaga(ragaNumber);
  const label = "Melakartha Raga-" + currentRaga.name;

  // Change labels;
  PluginParameters[LABEL_RAGA_NAME].name = label;
  PluginParameters[LABEL_RAGA_LAYOUT].name = currentRaga.getLayout(getSkippedNotes());
}

export const hasParamsChanged = () => paramsChanged;
export const resetParamsChangedState = () => (paramsChanged = false);

export const getRoot = () => controlValues[CONTROL_ROOT];

export const getHarmony = () => controlValues[CONTROL_HARMONY];

export const getSkippedNotes = () => [0, ...controlValues.slice(6)];
