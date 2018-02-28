/**
 * @file getContentTypeByExt
 * @author Cuttle Cong
 * @date 2018/2/28
 * @description
 */

export default function getContentTypeByExt(ext = '') {
  ext = ext.toLowerCase()
  switch (ext) {
    case 'md':
    case 'markdown':
      return 'md'
    case 'svg':
      return 'svg'
    default:
      return 'code'
  }
}
