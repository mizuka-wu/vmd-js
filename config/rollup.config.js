export default {
  input: 'src/index.js',
  output: {
    name: 'Vmd',
    file: 'dist/vmd.js',
    format: 'umd',
    external: ['shiftjis']
  }
}
