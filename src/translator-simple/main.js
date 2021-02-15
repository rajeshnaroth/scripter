/* global Trace */

import { HandleMIDI, ProcessMIDI, Idle, NeedsTimingInfo } from "./scripter";
import { ParameterChanged } from "./controls";

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
