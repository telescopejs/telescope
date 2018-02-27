/**
 * @file markdown
 * @author Cuttle Cong
 * @date 2018/2/24
 * @description
 * @jest-environment node
 */
import mark from './markdown'
function j(arr = []) {
  return arr.join('\n')
}

describe('markdown', function () {
  test('should markdown works about normal case', async () => {
    const html = await mark(j([
      '# Heading 1',
      '## Heading 2',
      'normal **bold** text'
    ]))
    expect(
      html
    ).toMatchSnapshot()
  })

  test('should markdown works about gemoji', async () => {
    expect(
      await mark(j([
        ':smile: 👼',
        ':+1: :dash:',
      ]))
    ).toMatchSnapshot()

    expect(
      await mark(j([
        ':smile: 👼  ', // should insert new line
        ':+1: :dash:',
      ]))
    ).toMatchSnapshot()
  })

  test('should works about task lists', async () => {
    expect(
      await mark(j([
        '[x] not ok',
        '- [x] done',
        '- [] NOT matching',
        '- [ ] todo',
      ]))
    ).toMatchSnapshot()
  })

  test('should works about yaml preamble', async () => {
    expect(
      await mark(j([
        'not matching',
        '',
        '---',
        'title: abc',
        'tags: [a, b, c]',
        '---'
      ]))
    ).toMatchSnapshot()

    expect(
      await mark(j([
        '---',
        'title: abc',
        'tags: [a, b, c]',
        '---'
      ]))
    ).toMatchSnapshot()
  })

  test('should works about replace link', async () => {
    expect(
      await mark(j([
        '[abc](./readme.md)\\', // break line
        '<a href="./readme.md">exact link</a>'
      ]), {
        markdownItOptions: {
          replaceLink(link, env) {
            return link + "?c=123"
          }
        }
      })
    ).toMatchSnapshot()
  })

  test('should works about replace link with fromUrl', async () => {
    expect(
      await mark(j([
        '[abc](./readme.md)\\', // break line
      ]), {
        fromUrl: 'http://github.com/telescopejs/telescope/',
        markdownItOptions: {
        }
      })
    ).toMatchSnapshot()
  })
})
