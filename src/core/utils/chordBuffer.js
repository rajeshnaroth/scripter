/* global Note, NoteOn, NoteOff, Trace */
function feed(note) {
  const getIndex = (note) => this.pitches.findIndex((pitch) => pitch === note.pitch);
  if (!(note instanceof Note)) {
    return -1;
  }
  if (note instanceof NoteOn) {
    this.pitches.add(note.pitch);
    this.pitches.sort();
    const pitchIndex = getIndex(note);
    if (pitchIndex < 0) {
      Trace(`Error. Unable to find pitch after adding ${note.ptch}`);
      return;
    }
    return pitchIndex + 1;
  }
  if (note instanceof NoteOff) {
    const pitchIndex = getIndex(note);
    if (pitchIndex < 0) {
      Trace(`Error. Unable to find matching NoteOff for note ${note.ptch}`);
      return;
    }
    this.pitches.splice(pitchIndex, 1);
    return pitchIndex + 1;
  }
}

function toString() {
  return this.pitches.join(",");
}

const buffer = {
  pitches: [],
};

const chordBuffer = {
  feed: feed.bind(buffer),
  toString: toString.bind(buffer),
  size: () => buffer.pitches.length,
};

export { chordBuffer };
