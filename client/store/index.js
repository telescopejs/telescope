/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import { observable } from 'mobx'
import Root from './Root'
import fetch from '../../lib/fetch'

export default class Store extends Root {
  @observable input = 'https://raw.githubusercontent.com/picidaejs/picidae-theme-haier/master/test/api/globals.md'

  async explore() {
    if (!this.input) {
      return
    }
    const text = await fetch(this.input)
    console.error(text)
  }
}
