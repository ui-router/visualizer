import { defineConfig } from 'rolldown';
import styles from 'rollup-plugin-styles';

export default defineConfig({
  input: 'src/visualizer.ts',
  // Tell rolldown to let plugins handle CSS instead of its built-in extraction
  moduleTypes: {
    '.css': 'js',
  },
  plugins: [
    // Inject CSS into the document <head> at runtime
    styles({ mode: 'inject' }),
  ],
  resolve: {
    alias: {
      // Redirect react jsx-runtime to preact's jsx-runtime
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  output: [
    {
      file: '_bundles/ui-router-visualizer.js',
      format: 'umd',
      name: '@uirouter/visualizer',
      sourcemap: true,
    },
    {
      file: '_bundles/ui-router-visualizer.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
});
