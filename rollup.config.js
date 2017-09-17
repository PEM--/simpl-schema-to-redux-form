import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  input: 'src/index.js',
  output: {
    file: 'index.min.js',
    format: 'umd'
  },
  name: 'simpl-schema-to-redux-form',
  external: [
    'dot-object',
    'moize',
    'react',
    'simpl-schema'
  ],
  globals: {
    'dot-object': 'dot',
    moize: 'moize',
    react: 'React',
    'simpl-schema': 'SimpleSchema'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true,
      modulesOnly: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    (process.env.NODE_ENV === 'production' && uglify({}, minify))
  ]
}
