/**
 * @file: entry
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { useStrict } from 'mobx'
import Store from './store'
import View from './view'
import parse from '../lib/parseQuerystring'

useStrict(true)
const store = new Store()
store.assign(parse(location.search))

ReactDOM.render(
  <Provider store={store}>
    <View/>
  </Provider>,
  window.root
)
