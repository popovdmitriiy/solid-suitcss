import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import dts from "rollup-plugin-dts";
import resolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

const config = {
  name: "Launch UI",
  extensions: [".ts", ".tsx"],
};

export default [
  {
    input: "index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript(),
      peerDepsExternal(),
      resolve({ extensions: config.extensions }),
      commonjs(),
      babel({
        extensions: config.extensions,
        include: ["lib/**/*"],
        exclude: "node_modules/**",
      }),
      del({ targets: "dist/*" }),
    ],
    external: ["solid-js/web"],
  },
  {
    input: "index.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
];
