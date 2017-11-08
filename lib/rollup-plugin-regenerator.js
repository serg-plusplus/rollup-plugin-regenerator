'use strict'

// [NATIVE] Provides simple wrappers around standard POSIX functions.
var fs = require('fs')

// A set of functions commonly used by Rollup plugins.
var rollupPluginutils = require('rollup-pluginutils')

// Source transformer enabling ECMAScript 6 generator functions in JavaScript-of-today.
var regenerator = require('regenerator')

/**
 * rollupPluginRegenerator
 *
 * @param {Object} opts - Optional settings.
 * @param {Boolean} opts.includeRuntime - include 'regeneratorRuntime()' polyfill as banner.
 * @param {Array|String} opts.include - Minimatch pattern(s) that must be met.
 * @param {Array|String} opts.exclude - Minimatch pattern(s) that must NOT be met.
 * @returns {Object} - plugin instance.
 */
function rollupPluginRegenerator (opts) {
  // defaultify options.
  if (!opts) opts = {}

  // make filter based on `opts.include` and `opts.exclude` patterns.
  var filter = rollupPluginutils.createFilter(opts.include, opts.exclude)

  // if 'opts.includeRuntime' is not false - get 'regeneratorRuntime()' polyfill as string.
  var runtimeCode =
    opts.includeRuntime !== false
      ? fs.readFileSync(require.resolve('regenerator-runtime/runtime'), 'utf8')
      : ''

  return {
    name: 'regenerator',
    banner: runtimeCode,
    transform: function (code, id) {
      // if `opts.include` is omitted or has zero length, filter
      // will return `true` by default. Otherwise, an ID must match
      // one or more of the minimatch patterns, and must not match
      // any of the `opts.exclude` patterns.
      if (!filter(id)) {
        return
      }

      // proceed with the transformation...
      var transpiled = regenerator.compile(code)

      return {
        code: transpiled.code,
        map: { mappings: '' }
      }
    }
  }
}

module.exports = rollupPluginRegenerator
