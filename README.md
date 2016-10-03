A Rollup.js plugin to compile ECMAScript 6 generator functions
=============================
# rollup-plugin-regenerator

This [Rollup](http://rollupjs.org/) plugin will replace `async` and `generators` functions with es5 promise based functions.
Plugin using [`regenerator`](https://github.com/facebook/regenerator) lib.

## Install

```
npm install --save-dev rollup-plugin-regenerator
```

```js
var rollup      = require('rollup').rollup;
var regenerator = require('rollup-plugin-regenerator');

rollup({
  entry: 'main.js',
  plugins: [ regenerator() ]
}).then(...);
```
## Options

* `include`, `exclude`: A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional).
* `includeRuntime`: Include regenerator polyfills (optional, default: `true`).

## License

MIT
