const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const json = require("@rollup/plugin-json");
const external = require("rollup-plugin-peer-deps-external");
const postcss = require("rollup-plugin-postcss");
const sourcemaps = require('rollup-plugin-sourcemaps');
const dts = require('rollup-plugin-dts');

const pkg = require("./package.json");

module.exports = [
  {
    input: pkg.source,
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      external(),
      postcss(),
      json(),
      typescript({ tsconfig: './tsconfig.json', outDir: "dist/cjs", declarationDir: "dist/cjs/types" }),
      resolve(),
      sourcemaps(),
      terser({
        output: { comments: false },
        compress: { drop_console: true }
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: pkg.source,
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      external(),
      postcss(),
      json(),
      typescript({ tsconfig: './tsconfig.json', outDir: "dist/esm", declarationDir: "dist/esm/types" }),
      resolve(),
      sourcemaps(),
      terser({
        output: { comments: false },
        compress: { drop_console: true }
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: pkg.source,
    output: [
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      external(),
      postcss(),
      json(),
      typescript({ tsconfig: './tsconfig.json' }),
      resolve(),
      sourcemaps(),
      terser({
        output: { comments: false },
        compress: { drop_console: true }
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      dts.dts()
    ],
  }
];
