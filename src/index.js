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

  let includeRuntime = options.includeRuntime !== false

  return {
    name: 'regenerator',
    transform: (code, id) => {
      if (!filter(id))
        return null

      const result = regenerator.compile(code, { includeRuntime }).code
      includeRuntime = false

      return {
        code: result.toString(),
        map: { mappings: '' },
      }
    },
  }
}

export default rollupPluginRegenerator
