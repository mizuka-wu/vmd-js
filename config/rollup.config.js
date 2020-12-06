import json from '@rollup/plugin-json'
import babel from 'rollup-plugin-babel'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import { terser } from 'rollup-plugin-terser'

const output = {
  name: 'Vmd',
  file: 'dist/vmd.js',
  format: 'umd',
  exports: 'named',
  globals: {
    shiftjis: 'shiftjis'
  }
}

export default {
  input: 'src/index.js',
  output: [
    output,
    {
      ...output,
      file: 'dist/vmd.min.js',
      plugins: [terser()]
    }
  ],
  external: ['shiftjis'],
  plugins: [
    nodePolyfills(),
    json(),
    babel()
  ]
}
