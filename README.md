# Ragifier

A nifty utiliy to translate a major/minor scale to one of the 72 Full Carnatic scales aka Melakartha ragas

## Scripting for Logic Pro's Scripter

### A few issues with Scripter

- Scripter doesn't allow all JavaScript features. Painfully missing is the setTimeout call.
- Everything runs within a small editor window with tiny fonts within Logic Pro.

### Rollup

Rollup helps wrap everything nicely into bundles with a few quircky things we need to do once the bundle is created. This helps us to share code across different Scripter presets. We can also unit test them.

### Understanding Carnatic Music and its scales

To make sense of this collection of plugins, some knowledge of the Carnatic Melakartha Ragas are needed. It is fascinating how 72 base ragas are created using simple mathematical permutations and comninations.

A (melakartha) raga is composed of 7 swarams (notes) picked from a chromatic scale of 12 notes.
Sa Ri Ga Ma Pa Da Ni
Two of these swarams, Sa and Pa, are always fixed at positions 1 and 7. We have to imagine three sections:

1. Ma that can take 2 different positions. The first position is the natural 4th note and the next one is similar to the Lydian scale.
2. Between Sa and Ma (call it the head), The notes Ri and Ga can have 6 different combinations
3. Between Pa and next Sa (call it the tail), The notes Ri and Ga can have 6 different combinations
