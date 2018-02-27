/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
import defaultPlugin from './plugins/default'
import highlight from './utils/highlight'
import markdown from './utils/markdown'
import parseUrl from './utils/parseQuerystring'
import each from 'lodash/each'

export default class Telescope {
  static fromUrl(url = '') {
    const { plugins, ...data } = parseUrl(url)
    return new this(data)
  }

  static styleGetter = {
    'github|gh': require('github-markdown-css/github-markdown.css'),
    'bootstrap3|bs': require('./styles/bootstrap3.css')
  }

  static hlStyleGetter = {
    'school-book|sb': require('highlight.js/styles/school-book.css'),
    'solarized-dark|sd': require('highlight.js/styles/solarized-dark.css'),
    'github-gist|gg': require('highlight.js/styles/github-gist.css'),
    'github|gh': require('highlight.js/styles/github.css'),
  }

  options = {
    type: 'md',
    style: 'github',
    hlStyle: 'github',
    range: [],
    plugins: [
      require('./plugins/github'),
      defaultPlugin,
    ]
  }

  constructor(options = {}) {
    const plugins = options.plugins || []
    this.options = Object.assign({}, this.options, options, {
      plugins: plugins.concat(this.options.plugins).filter(x => typeof x === 'function')
    })

    this.initializePlugin()
  }

  initializePlugin() {
    const polyfill = defaultPlugin(this)
    this.defaultPlugin = polyfill
    this.plugins = this.options.plugins.map(plugin => {
      return {
        ...polyfill,
        ...plugin(this)
      }
    })

  }

  /**
   *
   * @param url
   * @returns html {string}
   */
  async see(url) {
    const matchedPlugin = this.plugins.find(plugin =>
      plugin.condition(url)
    )

    url = await matchedPlugin.urlTransform(url)
    const response = await matchedPlugin.fetch(url)
    let value, text
    switch (response.contentType) {
      case 'code':
      case 'javascript':
      case 'css':
        let range = this.options.range
        text = await response.text()
        if (!Array.isArray(range)) {
          range = [range]
        }
        let [start, end] = range
        if (parseInt(start) == start && start != 0) {
          const lines = text.split('\n')
          // neg
          if (typeof end !== 'undefined' && -end === Math.abs(end)) {
            end = lines.length - 1 + end
          }
          text = lines.slice(start - 1, end).join('\n')
        }
        value = await matchedPlugin.renderCode(text, response)
        break
      case 'image':
        value = await matchedPlugin.renderImage(response)
        // @todo blob
        break
      case 'md':
      default:
        text = await response.text()
        value = await matchedPlugin.renderMarkdown(text, response)
    }

    return {
      value,
      contentType: response.contentType,
      url: response.url,
    }
  }
}

function overrideGetter(ref, path) {
  const styleGetter = ref[path]
  const getter = {}
  each(styleGetter, (value, name) => {
    const keys = name.split('|')
    keys.forEach(key => {
      key = key.trim()
      if (key) {
        getter[key] = styleGetter[name]
      }
    })
  })
  ref[path] = getter
}

overrideGetter(Telescope, 'styleGetter')
overrideGetter(Telescope, 'hlStyleGetter')
