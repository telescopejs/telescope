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
    async renderCode(text, res) {
      return highlight(text, res.language || res.contentType)
    },
    markdownTransformers: [],
    async renderMarkdown(text, response) {
      return await markdown(text, {
        fromUrl: response.fromUrl || response.url,
        imgFromUrl: response.imgFromUrl,
        transformers: this.markdownTransformers
      })
    },
    async renderImage(res) {
      return `<a href="${res.url}"><img src="${res.url}"/></a>`
    }
  }
}
