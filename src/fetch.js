/**
 * @file: fetch
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import fetch from 'isomorphic-fetch'

function eachIterator(it, action) {
  let next, i = 0
  while (next = it.next(), !next.done) {
    action && action(next.value, i)
    i++
  }
}

export default async function wrappedFetch(url, ...args) {
  const response = await fetch(url, ...args)
  eachIterator(response.headers.values(), console.error)
  return await response.text()
}
