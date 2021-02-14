import { rootNotes } from "../core/constants";
import { getRagaIndex } from "../core/helpers";
import { ragaMap } from "../core/ragaMap";

export const CONTROL_ROOT = 0;
export const LABEL_RAGA_NAME = 1;
const CONTROL_HEAD = 2;
const CONTROL_MID = 3;
const CONTROL_TAIL = 4;
const LABEL_RAGA_LAYOUT = 5;

const isControl = (control) => control !== LABEL_RAGA_NAME && control != LABEL_RAGA_LAYOUT;

const headNames = ["R1-G1 Weird", "R1-G2 Arabic", "R1-G3 Gaulam", "R2-G2 Minor", "R2-G3 Major", "R3-G3 Jazz"];
const tailNames = ["D1-N1 Weird", "D1-N2 Arabic", "D1-N3 Gaulam", "D2-N2 Minor", "D2-N3 Major", "D3-N3 Jazz"];

// globals
export var controlValues = [-1, 0, 4, 0, 4, -1];
export var currentRaga = ragaMap[0];

export function setCurrentRaga(index) {
  currentRaga = ragaMap[index];
}

// Scripter global
export var PluginParameters = [
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

// Scripter API
export function ParameterChanged(param, value) {
  if (!isControl(param)) {
    return;
  }
  controlValues[param] = value;
  // Trace(param + "-" + value);
  const ragaNumber = getRagaIndex(controlValues[CONTROL_HEAD], controlValues[CONTROL_MID], controlValues[CONTROL_TAIL]);
  setCurrentRaga(ragaNumber);
  const label = "Raga-" + currentRaga.name;

  // Trace("Param Changed " + label + ":" + currentRaga.layout);
  PluginParameters[LABEL_RAGA_NAME].name = label;
  PluginParameters[LABEL_RAGA_LAYOUT].name = currentRaga.layout;
}

export function getRagaName() {
  return PluginParameters[LABEL_RAGA_NAME].name;
}

export function getRoot() {
  return controlValues[CONTROL_ROOT];
}
