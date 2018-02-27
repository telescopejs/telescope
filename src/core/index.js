/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
import defaultPlugin from './plugins/default'
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
    return {
      value: await matchedPlugin.render(response),
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
