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
function rollupPluginStylus(options = {}) {
  const filter = createFilter(options.include, options.exclude)

  const includeRuntime = options.includeRuntime !== false

  return {
    transform: (code, id) => {
      if (!filter(id))
        return null

      const result = regenerator.compile(code, { includeRuntime }).code

      return {
        code: result.toString(),
        map: { mappings: '' },
      }
    },
  }
}

export default rollupPluginStylus
