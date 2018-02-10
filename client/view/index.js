/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import { inject, observer } from 'mobx-react'
import React from 'react'

@inject('store')
@observer
export default class View extends React.Component {
  get store() {
    return this.props.store
  }
  handleExplore = evt => {
    this.store.explore()
  }
  render() {
    return (
      <div>
        <input type="text" value={this.store.input} onChange={evt => this.store.setValue('input', evt.target.value)} />
        <button onClick={this.handleExplore}>Explore</button>
      </div>
    )
  }
}
