# rollup-plugin-regenerator
A Rollup.js plugin to transform ECMAScript 6 generator and async functions.

This [Rollup](http://rollupjs.org) plugin will replace `async` and `generator` functions with ES5 Promise based functions.
Plugin using [`regenerator`](https://github.com/facebook/regenerator) module.

# BETTER SOLUTION:
* [`rollup-plugin-nodent`](https://github.com/oligot/rollup-plugin-nodent) - 
Convert ES2017 async/await with [`nodent`](https://github.com/MatAtBread/nodent).

## Install
```
npm install --save-dev rollup-plugin-regenerator
```
or with [`yarn`](https://yarnpkg.com/)
```
yarn add -D rollup-plugin-regenerator
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
* `includeRuntime`: If `false` - do not include 'regeneratorRuntime()' polyfill (optional).
* `sourceMap`: If `false` - forced disable source maps generating (optional).
* `include`, `exclude`: A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional).

## FAQ
- *I have a warning by Rollup: `The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten`.* Just specify `context` option in Rollup input options(as shown above).
- *Does it make sense to use this plugin?* I think no. Under the hood [`regenerator`](https://github.com/facebook/regenerator) uses `babel` for transformations, so it's better to use it as a `babel` [plugin](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-regenerator).

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License
Licensed under [MIT license](LICENSE).
