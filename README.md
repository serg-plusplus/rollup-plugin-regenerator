# rollup-plugin-regenerator
A Rollup.js plugin to transpile ECMAScript 6 generator functions.

This [Rollup](http://rollupjs.org/) plugin will replace `async` and `generators` functions with es5 promise based functions.
Plugin using [`regenerator`](https://github.com/facebook/regenerator) lib.

## Install
```
npm install --save-dev rollup-plugin-regenerator
```

## Usage
```js
var rollup = require('rollup').rollup;
var regenerator = require('rollup-plugin-regenerator');

rollup({
  input: 'my-entry.js',
  context: 'window', // or 'global' for Node.js
  plugins: [
    regenerator()
  ]
}).then(...);
```

## Options
* `include`, `exclude`: A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional).
* `includeRuntime`: Include regenerator polyfills (optional, default: `true`).

## Prepared answers to your questions
- *I have a warning by Rollup: `The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten`*
  Just specify `context` option in Rollup inputOptios(as shown above).
- *Why source-maps are not generated?*
  I was unable to implement source-maps generating with [`regenerator`](https://github.com/facebook/regenerator). Moreover, `regenerator` has a [issue](https://github.com/facebook/regenerator/issues/18) in this regard.
- *Does it make sense to use this plugin?*
  No! Under the hood [`regenerator`](https://github.com/facebook/regenerator) uses `babel` for transformations, so it's better to use it as a `babel` [plugin](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-regenerator).

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Styleguide
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
Licensed under [MIT license](LICENSE).
