/**
 * @file helper
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
import _ from 'lodash'

export function eachIterator(it, action) {
  let next, i = 0
  while (next = it.next(), !next.done) {
    const rlt = action && action(next.value, i)
    if (false === rlt) {
      break
    }
    i++
  }
}

export function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

export function deepEach(obj, action) {
  _.each(obj, function (val) {
    action.apply(this, [...arguments].concat(obj))
    if (!isPrimitive(val)) {
      deepEach(val, action)
    }
  })
}
