export const CONTROL_DELAY = 0;

const isControl = (control) => control === CONTROL_DELAY;

// globals
const delayList = [
  { name: "1", value: 2 },
  { name: "4", value: 4 },
];
var delay = delayList[1].value;

// Scripter Plugin definition
export var PluginParameters = [
  {
    name: "Delay",
    type: "menu",
    valueStrings: delayList.map((d) => d.name),
    defaultValue: delay,
  },
];

// Scripter API
export function ParameterChanged(param, value) {
  if (!isControl(param)) {
    return;
  }
  if (param === CONTROL_DELAY) {
    delay = delayList[value].value;
    return;
  }
}

export function getDelay() {
  return delay;
}
