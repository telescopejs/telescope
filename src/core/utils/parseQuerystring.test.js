/**
 * @file parseQuerystring
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
import parseQuerystring from './parseQuerystring'

describe('parseQuerystring', function () {
  test('parse normal', () => {
    expect(
      parseQuerystring('http://example.com/abc?q=http://a.com/&style=github')
    ).toEqual({
      q: 'http://a.com/',
      style: 'github'
    })
  })

  test('parse search', () => {
    expect(
      parseQuerystring('?q=http://a.com/&style=github')
    ).toEqual({
      q: 'http://a.com/',
      style: 'github'
    })
  })

  test('parse pure string', () => {
    expect(
      parseQuerystring('q=http://a.com/&style=github&lineNumber=true&t=false')
    ).toEqual({
      q: 'http://a.com/',
      style: 'github',
      lineNumber: true,
      t: false
    })
  })

  test('parse nested string', () => {
    expect(
      parseQuerystring('range=1&range=2&o={"a":2,"b":[1,2]}&a=[1,{}]&err={a:2}')
    ).toEqual({
      range: ['1', '2'],
      o: { a: 2, b: [1, 2] },
      a: [1, {}],
      err: '{a:2}'
    })
  })
})
