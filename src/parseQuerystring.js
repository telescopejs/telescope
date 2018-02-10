/**
 * @file: parseQuerystring
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import qs from 'querystring'

// table of querystring rule
//  | name | desc | default | eg |
//  | --- | --- | --- | --- |
//  | **q** | core: the url |
//  | type | the content text resource's type | dynamic value from url or mime type | `'md' \| 'json'` |
//  | style | TODO |
//  | lineNumber | show the line number of **code** content | true
//  | range | the line number range of text | null | [12, 15] \| [-10, -2]

export default function parse(path = '') {
  return qs.parse(path)
}
