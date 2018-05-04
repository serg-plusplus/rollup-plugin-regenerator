// [NATIVE] Provides simple wrappers around standard POSIX functions.
import { readFileSync as fsReadFileSync } from 'fs';
// A set of functions commonly used by Rollup plugins.
import { createFilter as rollupPluginutilsCreateFilter } from 'rollup-pluginutils';
// JavaScript syntax tree transformer, nondestructive pretty-printer, and automatic source map generator
import { parse as recastParse, print as recastPrint } from 'recast';
// Source transformer enabling ECMAScript 6 generator functions in JavaScript-of-today.
import {
  compile as regeneratorCompile,
  transform as regeneratorTransform
} from 'regenerator';

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

  var filter = rollupPluginutilsCreateFilter(opts.include, opts.exclude);
  var withSourceMap = opts.sourceMap !== false;
  var regeneratorRuntimeCode =
    opts.includeRuntime !== false
      ? fsReadFileSync(require.resolve('regenerator-runtime/runtime'), 'utf8')
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
        var inputAst = recastParse(code, {
          sourceFileName: id
        });
        var outputAst = regeneratorTransform(inputAst);

        res = recastPrint(outputAst, {
          sourceMapName: id
        });
      } else {
        res = regeneratorCompile(code);
      }

      return {
        code: res.code,
        map: withSourceMap && res.map ? res.map : { mappings: '' }
      };
    }
  };
}

export default rollupPluginRegenerator;
