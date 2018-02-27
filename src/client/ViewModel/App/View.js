/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import * as React from 'react'
import { h, binding } from 'react-mobx-vm'
import map from 'lodash/map'
import Telescope from '../../../core'

const StyleSelect = ({ styleGetter, onChange, value }) => (
  <select onChange={onChange} value={value}>
    {map(styleGetter, (val, k) => (
      <option key={k} value={k}>{k}</option>
    ))}
  </select>
)

@binding
export default class View extends React.Component {
  handleExplore = evt => {
    this.local.explore()
  }

  changeStyle = evt => {
    const val = evt.target.selectedOptions[0].value
    this.local.setStyle(val)
  }

  changeHlStyle = evt => {
    const val = evt.target.selectedOptions[0].value
    this.local.setHlStyle(val)
  }

  render() {
    return (
      <div>
        {
          this.local.inputVisible && <div>
            <input type="text" data-bind="input"/>
            <button onClick={this.handleExplore}>Explore</button>
          </div>
        }
        {this.local.styleSelectVisible &&
          <StyleSelect onChange={this.changeStyle} styleGetter={Telescope.styleGetter} value={this.local.style} />}
        {this.local.styleSelectVisible &&
          <StyleSelect onChange={this.changeHlStyle} styleGetter={Telescope.hlStyleGetter} value={this.local.hlStyle} />}
        {h(this.local.preview)}
      </div>
    )
  }
}
