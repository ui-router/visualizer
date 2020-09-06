const { nodeResolve } = require('@rollup/plugin-node-resolve');
// const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postCss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  input: 'src/visualizer.ts',
  plugins: [
    nodeResolve(),
    // commonjs(),
    typescript(),
    // import from .css, .less, and inject into the document <head></head>
    postCss(),
  ],
  output: [
    {
      file: '_bundles/ui-router-visualizer.js',
      format: 'umd',
      name: '@uirouter/visualizer',
      sourcemap: true,
    },
    {
      file: '_bundles/ui-router-visualizer.esm.js',
      format: 'es',
      sourcemap: true,
    },
  ],
};
