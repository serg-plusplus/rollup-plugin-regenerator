module.exports = {
	entry: 'src/index.js',
	plugins: [
		require('rollup-plugin-babel')({
			runtimeHelpers: true,
		}),
	],
	external: [
		'fs',
		'path',
		'regenerator',
		'rollup-pluginutils',
		'babel-runtime/core-js/json/stringify',
    'babel-runtime/helpers/asyncToGenerator',
    'babel-runtime/regenerator',
	],
	targets: [
		{
			dest: 'lib/rollup-plugin-regenerator.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'lib/rollup-plugin-regenerator.es.js',
			format: 'es',
		}
	],
}
