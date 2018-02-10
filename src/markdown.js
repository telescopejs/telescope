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

// https://www.npmjs.com/package/markdown-it-replace-link
// https://www.npmjs.com/package/markdown-it-task-lists
// https://www.npmjs.com/package/markdown-it-emoji
// https://www.npmjs.com/package/markdown-it-github-preamble

export default async function markdown(markdown, fromUrl) {
  const md = new Markdown().use(taskList).use(emoji).use(preamble).use(replaceLink)
  return md.render(markdown)
}
