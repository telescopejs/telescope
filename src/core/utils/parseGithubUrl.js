/**
 * @file parseGithubUrl
 * @author Cuttle Cong
 * @date 2018/2/27
 * @description
 */
import parse from 'parse-github-url'

export default function wrap(url) {
  // https://raw.githubusercontent.com/picidaejs/picidaejs/b52330e3326279de7e4458b3c62b5bf862bc5d21/src/index.js

  const obj = parse(url)
  // https://github.com/picidaejs/picidaejs/blob/b52330e3326279de7e4458b3c62b5bf862bc5d21/src/index.js#L1
  let matched
  if (obj.branch === 'blob' && (matched = obj.blob.match(/^[a-z0-9]+(?=\/)/i))) {
    obj.branch = matched[0]
    obj.filepath = obj.filepath.replace(new RegExp('^' + matched[0] + '\\/'), '')
  }
  return obj
}
