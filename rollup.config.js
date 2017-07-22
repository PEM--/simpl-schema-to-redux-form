import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  entry: 'src/index.js',
  dest: 'index.min.js',
  format: 'umd',
  moduleName: 'simpl-schema-to-redux-form',
  external: ['simpl-schema', 'dot-object'],
  globals: {
    'simpl-schema': 'SimpleSchema',
    'dot-object': 'dot'
  },
  plugins: [
    resolve({
      preferBuiltins: true,
      browser: true,
      modulesOnly: true
    }),
    babel({ exclude: 'node_modules/**' }),
    uglify({}, minify)
  ]
}
