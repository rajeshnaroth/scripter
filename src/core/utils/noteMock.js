// Mocks
export class Note {
  constructor(pitch) {
    this.pitch = pitch;
  }
}

export class NoteOn extends Note {}
export class NoteOff extends Note {}
