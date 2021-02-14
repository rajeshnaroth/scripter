import { rootNotes } from "../core/constants";
import { ragaMap } from "../core/ragaMap";

export const CONTROL_ROOT = 0;
export const CONTROL_RAGAS = 1;
const LABEL_RAGA_LAYOUT = 2;

const isControl = (control) => control != LABEL_RAGA_LAYOUT;

const ragaNames = ragaMap.map((raga) => raga.name);

// globals
export var controlValues = [0, 14, -1];
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
    name: "Raga",
    type: "menu",
    valueStrings: ragaNames,
    defaultValue: controlValues[CONTROL_RAGAS],
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
  const ragaNumber = controlValues[CONTROL_RAGAS];
  setCurrentRaga(ragaNumber);

  PluginParameters[LABEL_RAGA_LAYOUT].name = currentRaga.layout;
}

export function getRagaNumber() {
  return controlValues[CONTROL_RAGAS];
}

export function getRoot() {
  return controlValues[CONTROL_ROOT];
}
