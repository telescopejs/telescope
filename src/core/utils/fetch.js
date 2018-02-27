/**
 * @file: fetch
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import fetch from 'isomorphic-fetch'
import { eachIterator} from './helper'

function normalizeHeaders(response) {
  const headers = response.headers
  // Iterator
  if (headers && typeof headers.next === 'function' && typeof headers.keys === 'function') {
    const newData = {}
    eachIterator(headers.keys(), function (key, index) {
      newData[key] = headers.get(key)
    })
    response.headers = newData
  }
}

export default async function wrappedFetch(url, ...args) {
  const response = await fetch(url, ...args)
  // normalizeHeaders(response)
  let type
  let val = response.headers.get('content-type')
  if (/image\//.test(val)) {
    type = 'image'
  }
  else if (/javascript/.test(val)) {
    type = 'javascript'
  }
  else if (/text\/css/.test(val)) {
    type = 'css'
  }
  else if (/text\/plain/.test(val)) {
    type = 'md'
  }
  const ext = url.replace(/.+\.(.+?)/, '$1').toLowerCase()
  if (type === 'md') {
    switch (ext) {
    case 'md':
    case 'markdown':
      break
    case 'svg':
      type = ext
      break
    default:
      type = 'code'
      response.language = ext
    }
  }
  response.contentType = type
  return response
}
