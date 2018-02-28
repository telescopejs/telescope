/**
 * @file headless
 * @author Cuttle Cong
 * @date 2018/2/27
 * @description
 */
const puppeteer = require('puppeteer')
const md5 = require('md5')
const u = require('url')
const p = require('pify')
const fs = require('fs')
const nps = require('path')
const mkdirp = require('mkdirp')

const RUNTIME_PATH = nps.join(__dirname, '../../runtime')
mkdirp.sync(RUNTIME_PATH)

async function getOrSet(key, getter) {
  const files = await p(fs.readdir)(RUNTIME_PATH)
  if (files.includes(key)) {
    const stat = await p(fs.stat)(nps.join(RUNTIME_PATH, key))
    if (Date.now() - stat.mtime.getTime() >= 1000 * 60 * 60 * 24) {
      return await getter()
    }
    return nps.join(RUNTIME_PATH, key)
  }
  return await getter()
}

async function savePdf(url, key, options = {}) {
  const browser = await puppeteer.launch({ timeout: 100000 })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 100000 })
  // await page.waitFor('img')
  const buffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '9.5mm',
      left: '10mm',
      right: '9.5mm'
    },
    ...options,
    path: nps.join(RUNTIME_PATH, key)
  })
  await browser.close()
  return nps.join(RUNTIME_PATH, key)
}

async function saveImg(url, key, options = {}) {
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
    path: nps.join(RUNTIME_PATH, key),
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
  return nps.join(RUNTIME_PATH, key)
}

export async function pdf(url, options = {}) {
  const { force, ...opt } = options
  const k = md5(u.parse(url).query + JSON.stringify(opt)) + '.pdf'
  if (force) {
    await savePdf(url, k, opt)
  }
  return await getOrSet(k, async () => await savePdf(url, k, opt))
}

export async function img(url, options = {}) {
  const { force, ...opt } = options
  if (opt.quality) {
    opt.quality = +opt.quality
  }
  const k = md5(u.parse(url).query + JSON.stringify(opt)) + '.png'
  if (force) {
    return await saveImg(url, k, opt)
  }
  return await getOrSet(k, async () => await saveImg(url, k, opt))
}
