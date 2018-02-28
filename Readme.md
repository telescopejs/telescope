# telescope 🔭

[![build status](https://img.shields.io/travis/telescopejs/telescope/master.svg?style=flat-square)](https://travis-ci.org/telescopejs/telescope)
[![Test coverage](https://img.shields.io/codecov/c/github/telescopejs/telescope.svg?style=flat-square)](https://codecov.io/github/telescopejs/telescope?branch=master)

## What is telescope
Telescope is the service ( from client or server ) works for render view ( md / code / image... ) via fetching URL.  
It's awesome that we can see any file on the internet. And telescope provides three ways (html/image/pdf) to display the view.  
So you can write the markup as follows.

```html
<!--https://telescopejs.github.io/ is the client side's service without any dynamic server-->
<iframe src="https://telescopejs.github.io/?q=picidaejs/picidaejs" frameborder="0"></iframe>
```

## Features
- ✈ Supports client and server side.
- 🍻 Supports dynamic style.
- 😊 The service server side supports output the view via image or pdf.
- 🍫 The code supports specified line range.
- 👍 More features is waiting for you to discover...

## Why needs telescope
[Hackernoon](https://hackernoon.com) and [Medium](https://medium.com/) has the similar [view](https://hackernoon.com/media/e406a21255c325600273fa5c8c805a89?postId=55995262a254)
via rendering gist snippet.
We can use telescope service to preview or generate the image / pdf easily!  


## Installation
```bash
git clone https://github.com/telescopejs/telescope.git
cd telescope
# If you are in china, should set PUPPETEER_DOWNLOAD_HOST to speed the installation of puppeteer. 
PUPPETEER_DOWNLOAD_HOST=https://npm.taobao.org/mirrors npm install
# server side, default port 8002
npm start
# or client side, default port 9999
npm run client
# build the assert of client side on `public/`
npm run client:build
```
**Meanwhile, telescope requires chrome libraries.**    
You should ensure the dependencies of chrome that you had installed, 
because I use the headless Chrome browser [puppeteer](https://github.com/GoogleChrome/puppeteer) to generate snapshot and pdf.  
- [More information Here](https://askubuntu.com/questions/510056/how-to-install-google-chrome)

### Client Side
Open `http://localhost:9999` after setup the service on port 9999.

- The accepted query string table (server side accepted too)  
| name | type | description |  
| ---- | ---- | --------- |
| `q`  | string | the fetching url, e.g. `picidaejs/picidaejs/master/src/index.js` `picidaejs/picidaejs` |
| `style` | string | the view style, please see `https://telescopejs.github.io/?debug=true` |
| `hlStyle` | string | the code's highlight style, please see `https://telescopejs.github.io/?debug=true` |
| `range` | number\|\[start, end\] | the code's range, e.g. `?range=10` `?range=[10]` `?range=[10, 20]` `?range=[-20, -15]` |

And specially, `debug=true` is accepted on client side for debug.

### Server Side
Temporary outside service [`http://23.106.151.229:8002/`](http://23.106.151.229:8002)
- Please try the path name below
```text
/telescopejs/telescope
/img/telescopejs/telescope
/img/telescopejs/telescope/master/package.json?hlStyle=school-book
/pdf/telescopejs/telescope
/pdf/telescopejs/telescope/master/package.json
```
