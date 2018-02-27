/**
 * @file: entry
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './ViewModel/App/index'
import parseQuerystring from '../core/utils/parseQuerystring'
import { h } from 'react-mobx-vm'
import '!style-loader!css-loader!./index.css'

const appVM = new App

const { debug, q } = parseQuerystring(location.search)
if (debug) {
  appVM.inputVisible = appVM.styleSelectVisible = true
}
if (q) {
  appVM.input = q
}

ReactDOM.render(
  h(appVM),
  window.root
)
