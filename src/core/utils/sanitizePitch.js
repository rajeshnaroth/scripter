export function sanitizePitch(pitch) {
  const MIN_MIDI_PITCH = 0;
  const MAX_MIDI_PITCH = 125;
  return pitch < MIN_MIDI_PITCH ? MIN_MIDI_PITCH : pitch > MAX_MIDI_PITCH ? MAX_MIDI_PITCH : pitch;
}
