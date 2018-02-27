/**
 * @file highlight
 * @author Cuttle Cong
 * @date 2018/2/27
 * @description
 */
import hljs from 'highlight.js'
import utils from 'markdown-it/lib/common/utils'
import c from 'classname'
export default function highlight(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return '<pre class="hljs language-' + lang + '"><code class="language-' + lang + '">' +
             hljs.highlight(lang, str).value +
             '</code></pre>'
    } catch (__) {
    }
  }
  return '<pre class="' + c(lang && 'language-' + lang, 'hljs') + '"><code>' + utils.escapeHtml(str) + '</code></pre>'
}
