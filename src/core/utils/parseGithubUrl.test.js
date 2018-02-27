/**
 * @file smartGithubUrl
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
import parseGithubUrl from './parseGithubUrl'

describe('parseGithubUrl', function () {
  test('parse normal', () => {
    expect(
      parseGithubUrl('https://github.com/imcuttle/picidae/blob/master/test/demo/template.html')
    ).toMatchObject({
      hostname: 'github.com',
      filepath: 'test/demo/template.html',
      owner: 'imcuttle',
      name: 'picidae',
      repo: 'imcuttle/picidae',
      branch: 'master'
    })
  })

  test('parse short', () => {
    expect(
      parseGithubUrl('imcuttle/picidae')
    ).toMatchObject({
      hostname: null,
      filepath: null,
      owner: 'imcuttle',
      name: 'picidae',
      repo: 'imcuttle/picidae',
      branch: 'master'
    })
  })

  test('parse raw url', () => {
    expect(
      parseGithubUrl('https://raw.githubusercontent.com/imcuttle/markdown-it-github-headings/dev/test/index.js')
    ).toMatchObject({
      hostname: 'raw.githubusercontent.com',
      filepath: 'test/index.js',
      owner: 'imcuttle',
      name: 'markdown-it-github-headings',
      repo: 'imcuttle/markdown-it-github-headings',
      branch: 'dev'
    })
  })

  test('hash', () => {
    expect(
      parseGithubUrl('https://github.com/picidaejs/picidaejs/blob/b52330e3326279de7e4458b3c62b5bf862bc5d21/src/index.js')
    ).toMatchObject({
      filepath: 'src/index.js',
      owner: 'picidaejs',
      name: 'picidaejs',
      repo: 'picidaejs/picidaejs',
      branch: 'b52330e3326279de7e4458b3c62b5bf862bc5d21'
    })
    expect(
      parseGithubUrl('https://raw.githubusercontent.com/picidaejs/picidaejs/b52330e3326279de7e4458b3c62b5bf862bc5d21/src/index.js')
    ).toMatchObject({
      filepath: 'src/index.js',
      owner: 'picidaejs',
      name: 'picidaejs',
      repo: 'picidaejs/picidaejs',
      branch: 'b52330e3326279de7e4458b3c62b5bf862bc5d21'
    })
  })
})
