/**
 * @file: parseQuerystring
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import url from 'url'
import nps from 'path'



export function extname(path = '') {
  const { pathname } = url.parse(path)
  return nps.extname(pathname).replace(/^\./, '')
}

export default function getInformationFromURL(path = '') {
  const ext = extname(path)

  const { pathname } = url.parse(path)
  return nps.extname(pathname).replace(/^\./, '')
}
