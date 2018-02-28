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
    'github': require('./styles/github-markdown.css'),
    'bootstrap3': require('./styles/bootstrap3.css')
  }

  static hlStyleGetter = {
    'school-book': require('highlight.js/styles/agate.css'),
    'androidstudio': require('highlight.js/styles/androidstudio.css'),
    'arduino-light': require('highlight.js/styles/arduino-light.css'),
    'arta': require('highlight.js/styles/arta.css'),
    'ascetic': require('highlight.js/styles/ascetic.css'),
    'atelier-cave-dark': require('highlight.js/styles/atelier-cave-dark.css'),
    'atelier-cave-light': require('highlight.js/styles/atelier-cave-light.css'),
    'atelier-dune-dark': require('highlight.js/styles/atelier-dune-dark.css'),
    'atelier-dune-light': require('highlight.js/styles/atelier-dune-light.css'),
    'atelier-estuary-dark': require('highlight.js/styles/atelier-estuary-dark.css'),
    'atelier-estuary-light': require('highlight.js/styles/atelier-estuary-light.css'),
    'atelier-forest-dark': require('highlight.js/styles/atelier-forest-dark.css'),
    'atelier-forest-light': require('highlight.js/styles/atelier-forest-light.css'),
    'atelier-heath-dark': require('highlight.js/styles/atelier-heath-dark.css'),
    'atelier-heath-light': require('highlight.js/styles/atelier-heath-light.css'),
    'atelier-lakeside-dark': require('highlight.js/styles/atelier-lakeside-dark.css'),
    'atelier-lakeside-light': require('highlight.js/styles/atelier-lakeside-light.css'),
    'atelier-plateau-dark': require('highlight.js/styles/atelier-plateau-dark.css'),
    'atelier-plateau-light': require('highlight.js/styles/atelier-plateau-light.css'),
    'atelier-savanna-dark': require('highlight.js/styles/atelier-savanna-dark.css'),
    'atelier-savanna-light': require('highlight.js/styles/atelier-savanna-light.css'),
    'atelier-seaside-dark': require('highlight.js/styles/atelier-seaside-dark.css'),
    'atelier-seaside-light': require('highlight.js/styles/atelier-seaside-light.css'),
    'atelier-sulphurpool-dark': require('highlight.js/styles/atelier-sulphurpool-dark.css'),
    'atelier-sulphurpool-light': require('highlight.js/styles/atelier-sulphurpool-light.css'),
    'atom-one-dark': require('highlight.js/styles/atom-one-dark.css'),
    'atom-one-light': require('highlight.js/styles/atom-one-light.css'),
    'brown-paper': require('highlight.js/styles/brown-paper.css'),
    'codepen-embed': require('highlight.js/styles/codepen-embed.css'),
    'color-brewer': require('highlight.js/styles/color-brewer.css'),
    'darcula': require('highlight.js/styles/darcula.css'),
    'dark': require('highlight.js/styles/dark.css'),
    'darkula': require('highlight.js/styles/darkula.css'),
    'default': require('highlight.js/styles/default.css'),
    'docco': require('highlight.js/styles/docco.css'),
    'far': require('highlight.js/styles/far.css'),
    'foundation': require('highlight.js/styles/foundation.css'),
    'github': require('highlight.js/styles/github.css'),
    'github-gist': require('highlight.js/styles/github-gist.css'),
    'googlecode': require('highlight.js/styles/googlecode.css'),
    'grayscale': require('highlight.js/styles/grayscale.css'),
    'gruvbox-dark': require('highlight.js/styles/gruvbox-dark.css'),
    'gruvbox-light': require('highlight.js/styles/gruvbox-light.css'),
    'hopscotch': require('highlight.js/styles/hopscotch.css'),
    'hybrid': require('highlight.js/styles/hybrid.css'),
    'idea': require('highlight.js/styles/idea.css'),
    'ir-black': require('highlight.js/styles/ir-black.css'),
    'kimbie.dark': require('highlight.js/styles/kimbie.dark.css'),
    'kimbie.light': require('highlight.js/styles/kimbie.light.css'),
    'magula': require('highlight.js/styles/magula.css'),
    'mono-blue': require('highlight.js/styles/mono-blue.css'),
    'monokai': require('highlight.js/styles/monokai.css'),
    'monokai-sublime': require('highlight.js/styles/monokai-sublime.css'),
    'obsidian': require('highlight.js/styles/obsidian.css'),
    'ocean': require('highlight.js/styles/ocean.css'),
    'paraiso-dark': require('highlight.js/styles/paraiso-dark.css'),
    'paraiso-light': require('highlight.js/styles/paraiso-light.css'),
    'pojoaque': require('highlight.js/styles/pojoaque.css'),
    'purebasic': require('highlight.js/styles/purebasic.css'),
    'qtcreator_dark': require('highlight.js/styles/qtcreator_dark.css'),
    'qtcreator_light': require('highlight.js/styles/qtcreator_light.css'),
    'railscasts': require('highlight.js/styles/railscasts.css'),
    'rainbow': require('highlight.js/styles/rainbow.css'),
    'routeros': require('highlight.js/styles/routeros.css'),
    'school-book': require('highlight.js/styles/school-book.css'),
    'solarized-dark': require('highlight.js/styles/solarized-dark.css'),
    'solarized-light': require('highlight.js/styles/solarized-light.css'),
    'sunburst': require('highlight.js/styles/sunburst.css'),
    'tomorrow': require('highlight.js/styles/tomorrow.css'),
    'tomorrow-night': require('highlight.js/styles/tomorrow-night.css'),
    'tomorrow-night-blue': require('highlight.js/styles/tomorrow-night-blue.css'),
    'tomorrow-night-bright': require('highlight.js/styles/tomorrow-night-bright.css'),
    'tomorrow-night-eighties': require('highlight.js/styles/tomorrow-night-eighties.css'),
    'vs': require('highlight.js/styles/vs.css'),
    'vs2015': require('highlight.js/styles/vs2015.css'),
    'xcode': require('highlight.js/styles/xcode.css'),
    'xt256': require('highlight.js/styles/xt256.css'),
    'zenburn': require('highlight.js/styles/zenburn.css'),
  }

  options = {
    type: 'md',
    style: 'github',
    hlStyle: 'github',
    cache: true,
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
            end = lines.length - 1 + +end
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
