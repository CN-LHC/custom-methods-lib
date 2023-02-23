import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.js",
  output: [
    {
      name: "custom-methods-lib",
      file: "./lib/index.js",
      format: "umd",
      sourcemap: true,
      globals: {},
    },
    {
      name: "custom-methods-lib",
      file: "./lib/index.es.js",
      format: "es",
      sourcemap: true,
      globals: {},
    },
  ],
  plugins: [
    commonjs(),
    json(),
    resolve({
      extensions: [".js"],
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js"],
    }),
    terser(),
  ],
};
