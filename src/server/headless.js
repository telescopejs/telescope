/**
 * @file headless
 * @author Cuttle Cong
 * @date 2018/2/27
 * @description
 */
const puppeteer = require('puppeteer')
const md5 = require('md5')
const u = require('url')
// const p = require('pify')

const cache = {}

async function savePdf(url, options = {}) {
  const browser = await puppeteer.launch({ timeout: 100000 })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 100000 })
  // await page.waitFor('img')
  const buffer = await page.pdf({ format: 'A4', ...options, path: void 0 })
  await browser.close()
  return buffer
}

async function saveImg(url, options = {}) {
  const browser = await puppeteer.launch({ timeout: 100000 })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 100000 })
  // await page.waitFor('img')

  let {
    rect
  } = await page.evaluate(() => {
    const rect = document.querySelector('.telescope > pre:first-child > code')
                || document.querySelector('.telescope')
    const tele = document.querySelector('.telescope')
    function calRect(dom) {
      return {
        x: dom.offsetLeft,
        y: dom.offsetTop,
        width: dom.offsetWidth,
        height: dom.offsetHeight,
      }
    }
    return {
      rect: calRect(rect),
      telescope: tele ? calRect(tele) : null
    }
      // body: document.body.getBoundingClientRect().toJSON(),
  })

  options = {
    fullPage: false,
    ...options,
    path: void 0,
    clip: rect
  }
  // console.log(telescope, rect)
  if (options.fullPage) {
    delete options.clip
    await page.setViewport({ width: parseInt(rect.width), height: parseInt(rect.height) })
  }
  else {
    await page.setViewport({ width: parseInt(rect.width), height: parseInt(rect.height) })
  }
  const buffer = await page.screenshot(options)
  await browser.close()
  return buffer
}

export async function pdf(url, options = {}) {
  const { force, ...opt } = options
  const k = md5(u.parse(url).query + JSON.stringify(opt)) + '.pdf'
  if (cache[k] && !force) {
    return cache[k]
  }
  cache[k] = await savePdf(url, opt)
  return cache[k]
}

export async function img(url, options = {}) {
  const { force, ...opt } = options
  if (opt.quality) {
    opt.quality = +opt.quality
  }
  const k = md5(u.parse(url).query + JSON.stringify(opt))
  // const path = nps.join(RUNTIME_IMG_PATH, k)
  if (cache[k] && !force) {
    return cache[k]
  }
  cache[k] = await saveImg(url, opt)
  return cache[k]
}
