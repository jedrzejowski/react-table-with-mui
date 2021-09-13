import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import sourceMaps from "rollup-plugin-sourcemaps"
import camelCase from "lodash.camelcase"
import typescript from "rollup-plugin-typescript2"
import json from "rollup-plugin-json"

const pkg = require("./package.json")

const libraryName = pkg.name;

export default [{
    input: `src/${libraryName}.ts`,
    output: [
        { file: pkg.main, name: camelCase(libraryName), format: "umd", sourcemap: true },
        { file: pkg.module, format: "es", sourcemap: true },
    ],
    // Indicate here external modules you don"t wanna include in your bundle (i.e.: "lodash")
    external: [],
    watch: {
        include: "src/**",
    },
    plugins: [
        json(),
        typescript({ useTsconfigDeclarationDir: true }),
        commonjs(),
        resolve(),
        sourceMaps(),
    ],
}, {
    input: `examples/index.ts`,
    output: [
        { file: "dist/examples.js", name: camelCase(libraryName), format: "umd", sourcemap: true },
    ],
    // Indicate here external modules you don"t wanna include in your bundle (i.e.: "lodash")
    external: [],
    watch: {
        include: [
            "src/**",
            "examples/**",
        ],
    },
    plugins: [
        json(),
        typescript({ useTsconfigDeclarationDir: true }),
        commonjs(),
        resolve(),
        sourceMaps(),
    ],
}]
