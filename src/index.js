import fs   from 'fs'
import path from 'path'

import regenerator      from 'regenerator'
import { createFilter } from 'rollup-pluginutils'


/**
 * rollup-plugin-regenerator
 * @param {Object} options
 *   @param {Boolean} includeRuntime - include regenerator polyfills (default: true)
 * @return {Object} rollup plugin with transform function
 */
function rollupPluginRegenerator(options = {}) {
  const filter = createFilter(options.include, options.exclude)
  // Wrap runtime in another iife to prevent 'this' in root scope warning from rollup.
  const banner = options.includeRuntime !== false
    ? `!(function(){${fs.readFileSync(require.resolve('regenerator-runtime/runtime'), 'utf8')}}());`
    : ''

  return {
    name: 'regenerator',
    banner,
    transform: (code, id) => {
      if (!filter(id))
        return null

      return {
        code: regenerator.compile(code).code.toString(),
        map: { mappings: '' },
      }
    },
  }
}

export default rollupPluginRegenerator
