/**
 * @file   Root
 * @author yucong02
 */

import {
  computed,
  observable,
  action,
  isObservable,
  extendObservable,
  toJS
} from 'mobx';
import _ from 'lodash'

export default class Root {
  toJSON() {
    return toJS(this)
  }

  @action
  setValue(key, value) {
    let ref = this;
    if (Array.isArray(key)) {
      ref = key.slice(0, key.length - 1)
               .reduce((model, k) => {
                 return model[k];
               }, this);
      key = key[key.length - 1];
    }
    ref[key] = value;
  }

  constructor(init = {}) {
    this.assignShallow(init)
  }

  @action assignShallow(data) {
    data = toJS(data)
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = typeof data[key] === 'undefined' ? this[key] : data[key]
      }
    }
  }

  clone() {
    return new this.constructor(this)
  }

  isEqual(other) {
    return this === other
           || _.isEqual(this.toJSON(), other instanceof Root ? other.toJSON() : other)
  }

  assign(data) {
    return this.assignShallow(data)
  }

  assignDeep(data) {
    data = _.cloneDeep(toJS(data, false))
    return this.assignShallow(data)
  }

  isEmpty() {
    return _.every(this, (value) => {
      if (value instanceof Root) {
        return value.isEmpty()
      }
      return _.isEmpty(value)
    })
  }
}

