/**
 * @file default
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
import parseGithub from '../utils/parseGithubUrl'
import join from 'url-join'
import * as u from 'url'

export const noCacheHeaders = {
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache'
}

export function appendTimestampOnQuery(url) {
  const o = u.parse(url, true)
  delete o.search
  let k = '_'
  while (k in o.query) {
    k = k + '_'
  }
  o.query[k] = Date.now()
  return u.format(o)
}

module.exports = function github(telescope) {
  // telescope
  const defaultPlugin = telescope.defaultPlugin
  return {
    condition(url) {
      return ['github.com', 'raw.githubusercontent.com', null].includes(parseGithub(url).hostname)
    },
    urlTransform(url) {
      const obj = { ...parseGithub(url) }
      obj.protocol = 'https:'
      obj.hostname = obj.host = 'raw.githubusercontent.com'
      obj.pathname = join(obj.repo, obj.branch, obj.filepath || '')
      return u.format(obj)
    },
    async fetch(url) {
      // NOTE: parse-github-url use cache
      const obj = { ...parseGithub(url) }
      let response
      // console.error(obj)
      // https://api.github.com/repos/picidaejs/picidaejs/git/trees/master
      if (!obj.filepath) {
        const data = await fetch(`https://api.github.com/repos/${obj.repo}/git/trees/${obj.branch}`)
        const json = await data.json()
        let key
        if (!json || !json.tree) {
          console.error('oops! api error happened: \n' + JSON.stringify(json, null, 2))
          key = 'Readme.md'
        }
        else {
          key = json.tree.find(({ path }) => path.toLowerCase() === 'readme.md')
          key = key.path
        }
        if (!key) {
          throw new Error('oops! readme is not found in repo: ' + obj.repo)
        }
        const readme = u.format({ ...obj, pathname: join(obj.pathname, key) })
        response = telescope.options.cache
          ? defaultPlugin.fetch(readme)
          : defaultPlugin.fetch(appendTimestampOnQuery(readme), { headers: noCacheHeaders })
        obj.filepath = key
      }
      else {
        response = telescope.options.cache
          ? defaultPlugin.fetch(url, { headers: noCacheHeaders })
          : defaultPlugin.fetch(appendTimestampOnQuery(url), { headers: noCacheHeaders })
      }
      return response.then(res => {
        obj.hostname = obj.host = 'github.com'
        res.fromUrl = u.resolve('https://github.com', join(obj.repo, 'blob', obj.branch, obj.filepath))
        res.imgFromUrl = u.resolve('https://github.com', join(obj.repo, 'raw', obj.branch, obj.filepath))
        return res
      })
    },
    markdownTransformers: []
  }
}
