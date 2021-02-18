/* global xtest, expect */
import { chordBuffer } from "../chordBuffer";

xtest("getSwaramNumber tests", () => {
  const cOn = new NoteOn(1);
  const dOn = new NoteOn(2);
  const eOn = new NoteOn(2);
  const cOff = new NoteOff(1);
  const dOff = new NoteOff(2);
  const eOff = new NoteOff(3);

  expect(chordBuffer.size()).toEqual(0);
  chordBuffer.feed(cOn);
  expect(chordBuffer.size()).toEqual(1);
  chordBuffer.feed(dOn);
  chordBuffer.feed(eOn);
  expect(chordBuffer.size()).toEqual(2);
  expect(chordBuffer.toString()).toEqual("1,2,3");
  // chordBuffer.feed(cOff);
});
