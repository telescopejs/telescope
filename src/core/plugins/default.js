/**
 * @file default
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
import fetch from '../utils/fetch'
import markdown from '../utils/markdown'
import highlight from '../utils/highlight'

module.exports = function defaultPlugin(telescope) {
  // telescope
  return {
    condition(url) {
      return true
    },
    urlTransform(url) {
      return url
    },
    async fetch(url) {
      return await fetch(url)
    },
    async render(response) {
      let range = telescope.options.range
      let text = await response.text()
      if (!Array.isArray(range)) {
        range = [range]
      }
      let [start, end] = range
      if (response.contentType !== 'md' && parseInt(start) == start && start != 0) {
        const lines = text.split('\n')
        // neg
        if (typeof end !== 'undefined' && -end === Math.abs(end)) {
          end = lines.length - 1 + end
        }
        text = lines.slice(start - 1, end).join('\n')
      }

      switch (response.contentType) {
      case 'code':
      case 'javascript':
      case 'css':
        return highlight(text, response.language || response.contentType)
      case 'md':
      default:
        return await markdown(text, {
          fromUrl: response.fromUrl || response.url,
          imgFromUrl: response.imgFromUrl
        })
      }
    }
  }
}
