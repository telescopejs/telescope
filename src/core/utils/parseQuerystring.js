/**
 * @file: parseQuerystring
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import * as h from './helper'
import qs from 'qs'
// table of querystring rule
//  | name | desc | default | eg |
//  | --- | --- | --- | --- |
//  | **q** | core: the url |
//  | style |  |
//  | hlStyle |  |
//  @todo | lineNumber | show the line number of **code** content | true
//  | range | the line number range of text | null | [12, 15] \| [-10, -2]

export default function parse(path = '') {
  let i = path.indexOf('?')
  if (i >= 0) {
    path = path.substring(i + 1)
  }
  const parsed = qs.parse(path)
  h.deepEach(parsed, (val, key, ref) => {
    if (typeof val === 'string' &&
        (val === 'true' || val === 'false')
    ) {
      ref[key] = val === 'true'
    }
    else if (
      typeof val === 'string'
       && (
        (val.startsWith('[') && val.endsWith(']'))
        || (val.startsWith('{') && val.endsWith('}'))
      )
    ) {
      try {
        ref[key] = JSON.parse(val)
      } catch (err) {}
    }
  })
  return parsed
}
