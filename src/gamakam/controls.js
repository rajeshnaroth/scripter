export const CONTROL_DELAY = 0;

const isControl = (control) => control === CONTROL_DELAY;

// globals
const lengths = ["1/16", "1/8", "1/4", "1/2", "1"];
const lengthList = lengths.map((len, index) => ({ name: len, value: index }));
var length = lengthList[2].value;

// Scripter Plugin definition
export var PluginParameters = [
  {
    name: "Gamakam Length in beats",
    type: "menu",
    valueStrings: lengthList.map((d) => d.name),
    defaultValue: length,
  },
];

// Scripter API
export function ParameterChanged(param, value) {
  if (!isControl(param)) {
    return;
  }
  if (param === CONTROL_DELAY) {
    length = lengthList[value].value;
    return;
  }
}

export function getLength() {
  return length;
}
