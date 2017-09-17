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
    'change-emitter',
    'dot-object',
    'fbjs/lib/shallowEqual',
    'hoist-non-react-statics',
    'invariant',
    'is-promise',
    'moize',
    'prop-types',
    'react',
    'simpl-schema'
  ],
  globals: {
    'change-emitter': 'changeEmitter',
    'dot-object': 'dot',
    'hoist-non-react-statics': 'hoistStatics',
    invariant: 'invariant',
    'is-promise': 'isPromise',
    moize: 'moize',
    'prop-types': 'PropTypes',
    react: 'React',
    'fbjs/lib/shallowEqual': 'shallowEqual',
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
