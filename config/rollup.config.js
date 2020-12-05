import resolve from '@rollup/plugin-node-resolve'
import common from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// import buble from '@rollup/plugin-buble'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import { terser } from 'rollup-plugin-terser'

const output = {
  name: 'Vmd',
  file: 'dist/vmd.js',
  format: 'umd',
  exports: 'named'
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
  plugins: [
    nodePolyfills(),
    json(),
    common(),
    resolve()
    // buble()
  ]
}
