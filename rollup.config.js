import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postCss from 'rollup-plugin-postcss';

export default {
  input: 'src/visualizer.ts',
  plugins: [
    nodeResolve(),
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
