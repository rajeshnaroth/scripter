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
    input: "./src/pan-delay/main.js",
    output: {
      file: "./dist/pan-delay.js",
      format: "cjs",
      name: "bundle",
    },
  },
];
