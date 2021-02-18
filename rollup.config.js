export default [
  {
    input: "./src/translator/main.js",
    output: {
      file: "./dist/translator.js",
      format: "cjs",
      name: "bundle",
    },
  },
  {
    input: "./src/translator-simple/main.js",
    output: {
      file: "./dist/translator-simple.js",
      format: "cjs",
      name: "bundle",
    },
  },
  {
    input: "./src/inversions/main.js",
    output: {
      file: "./dist/inversions.js",
      format: "cjs",
      name: "bundle",
    },
  },
  {
    input: "./src/gamakam/main.js",
    output: {
      file: "./dist/gamakam.js",
      format: "cjs",
      name: "bundle",
    },
  },
];
