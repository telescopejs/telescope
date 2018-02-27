/**
 * @file: parseQuerystring
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import url from 'url'
import nps from 'path'

export default function getTypeFromURL(path = '') {
  const { pathname } = url.parse(path)
  return nps.extname(pathname).replace(/^\./, '')
}
