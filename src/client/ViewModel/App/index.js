/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import { Root, observable, bindView, autorun } from 'react-mobx-vm'
import Telescope from '../../../core/'
import highlight from '../../../core/utils/highlight'
import View from './View'
import Preview from '../Preview/index'

@bindView(View)
export default class Store extends Root {
  @observable input = 'https://github.com/telescopejs/telescope/blob/master/Readme.md'
  preview = Preview.create()
  @observable inputVisible = false
  @observable styleSelectVisible = false
  @observable style = ''
  @observable hlStyle = ''

  useableStyle = null
  useableHlStyle = null

  constructor(p) {
    super(p)
  }

  get activeStyleGetter() {
    const style = this.telescope.options.style
    const styleGetter = Telescope.styleGetter
    return styleGetter[style]
  }

  loadStyle() {
    const getter = this.activeStyleGetter
    if (this.useableStyle) {
      this.useableStyle.unuse()
      this.useableStyle = null
    }
    if (getter && getter.use) {
      this.useableStyle = getter
      getter.use()
    }
    else if (typeof getter === 'function') {
      this.useableStyle = getter()
      this.useableStyle.use && this.useableStyle.use()
    }
  }

  get activeHlStyleGetter() {
    const hl = this.telescope.options.hlStyle
    const styleGetter = Telescope.hlStyleGetter
    return styleGetter[hl]
  }

  loadHlStyle() {
    const getter = this.activeHlStyleGetter
    if (this.useableHlStyle) {
      this.useableHlStyle.unuse()
      this.useableHlStyle = null
    }
    if (getter && getter.use) {
      this.useableHlStyle = getter
      getter.use()
    }
  }

  setStyle(style = 'github') {
    this.style = this.telescope.options.style = style
    this.loadStyle()
  }

  setHlStyle(style = 'github') {
    this.hlStyle = this.telescope.options.hlStyle = style
    this.loadHlStyle()
  }

  init() {
    this.telescope = Telescope.fromUrl(location.search)
    this.style = this.telescope.options.style
    this.hlStyle = this.telescope.options.hlStyle
    this.loadStyle()
    this.loadHlStyle()
    this.explore()
  }

  async explore() {
    if (!this.input || !this.input.trim()) {
      return
    }
    const input = this.input.trim()
    try {
      const { value, contentType, url } = await this.telescope.see(input)
      this.preview.assign({ html: value, contentType, url })
    } catch (err) {
      this.preview.assign({ html: highlight(err.stack), contentType: 'code' })
    }
  }
}
