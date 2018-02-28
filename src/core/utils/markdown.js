/**
 * @file: fetch
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import Markdown from 'markdown-it'
import replaceLink from 'markdown-it-replace-link'
import taskList from 'markdown-it-task-lists'
import emoji from 'markdown-it-emoji'
import preamble from 'markdown-it-github-preamble'
import headings from 'markdown-it-github-headings'
import highlight from './highlight'

import nUrl from 'url'

// https://www.npmjs.com/package/markdown-it-replace-link
// https://www.npmjs.com/package/markdown-it-task-lists
// https://www.npmjs.com/package/markdown-it-emoji
// https://www.npmjs.com/package/markdown-it-github-preamble


/**
 * parse markdown to html which's style like github
 * @param markdown {string}
 * @param [options={}] {object}
 * @param [options.fromUrl=''] {string} the markdown from where
 * @param [options.markdownItOptions={}] {object}
 * @param [options.markdownItOptions.html=true] {boolean}
 * @return {Promise<string>}
 */
export default async function markdown(markdown, options = {}) {
  const {
    markdownItOptions = {},
    fromUrl           = '',
    transformers      = [],
    imgFromUrl        = fromUrl
  } = options
  const opts = Object.assign({
    html: true,
    replaceLink(link, env, token) {
      if (token.tag === 'img') {
        return nUrl.resolve(imgFromUrl, link)
      }
      return nUrl.resolve(fromUrl, link)
    },
    highlight,
    markdownItOptions
  })

  const mark = [taskList, emoji, preamble, replaceLink, headings]
    .concat(transformers)
    .reduce((main, plugin) => {
      if (Array.isArray(plugin)) {
        return main.use(plugin[0], plugin[1])
      }
      return main.use(plugin)
    }, new Markdown(opts))

  return mark.render(markdown)
}
