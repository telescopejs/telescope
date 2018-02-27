/**
 * @file registerRequire
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
const nps = require('path')
const fs = require('fs')
const Module = require('module')
const _resolveFilename = Module._resolveFilename
export const styleFiles = []

function isStyleFile(request) {
  const ext = nps.extname(request)
  // NOTE: only support css!
  // cause we need read the file and response it.
  return ['.css'].includes(ext.toLowerCase())
}

Module._resolveFilename = function (request, parent, isMain, opts) {
  const arr = request.split('!')
  const realRequest = arr[arr.length - 1]
  return _resolveFilename.apply(this, [realRequest, parent, isMain, opts])
}

Module._extensions['.css'] = function(module, filename) {
  module.exports = filename
}
