'use strict';

// [NATIVE] Provides simple wrappers around standard POSIX functions.
var fs = require('fs');
// A set of functions commonly used by Rollup plugins.
var rollupPluginutils = require('rollup-pluginutils');
// JavaScript syntax tree transformer, nondestructive pretty-printer, and automatic source map generator
var recast = require('recast');
// Source transformer enabling ECMAScript 6 generator functions in JavaScript-of-today.
var regenerator = require('regenerator');

/**
 * A Rollup.js plugin to transform ECMAScript 6 generator and async functions
 * @param {Object} opts - Optional settings.
 * @param {Boolean} opts.includeRuntime - If false - do not include 'regeneratorRuntime()' polyfill.
 * @param {Boolean} opts.sourceMap - If false - forced disable source maps generating.
 * @param {Array|String} opts.include - Minimatch pattern(s) that must be met.
 * @param {Array|String} opts.exclude - Minimatch pattern(s) that must NOT be met.
 * @returns {Object} - plugin instance.
 */
function rollupPluginRegenerator (opts) {
  // defaultify options.
  if (!opts) opts = {};

  var filter = rollupPluginutils.createFilter(opts.include, opts.exclude);
  var withSourceMap = opts.sourceMap !== false;
  var regeneratorRuntimeCode =
    opts.includeRuntime !== false
      ? fs.readFileSync(require.resolve('regenerator-runtime/runtime'), 'utf8')
      : '';

  return {
    name: 'regenerator',
    banner: regeneratorRuntimeCode,
    transform: function (code, id) {
      // if `opts.include` is omitted or has zero length, filter
      // will return `true` by default. Otherwise, an ID must match
      // one or more of the minimatch patterns, and must not match
      // any of the `opts.exclude` patterns.
      if (!filter(id)) {
        return;
      }

      // proceed with the transformation...
      var res;
      if (withSourceMap) {
        var inputAst = recast.parse(code, {
          sourceFileName: id
        });
        var outputAst = regenerator.transform(inputAst);

        res = recast.print(outputAst, {
          sourceMapName: id
        });
      } else {
        res = regenerator.compile(code);
      }

      return {
        code: res.code,
        map: withSourceMap && res.map ? res.map : { mappings: '' }
      };
    }
  };
}

exports = module.exports = rollupPluginRegenerator;
