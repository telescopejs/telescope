/**
 * @file gojs.jsloader.js
 * @author Cuttle Cong
 * @date 2018/2/24
 * @description
 */
const nps = require('path')

module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [
      nps.join(__dirname, '../..')
    ],
    exclude: [/([\/\\])node_modules\1(core-js|babel-runtime)\1/],
    query: {
      cacheDirectory: true
    },
    happy: { id: 'js' }
  }, {
    test: /\.css$/,
    include: [
      nps.join(__dirname, '../..')
    ],
    loaders: [
      'style-loader/useable.js',
      'css-loader',
      'autoprefixer?browsers=last 2 version&remove=false'
    ],
    happy: { id: 'css' }
  },

// .less, .mod.less, .useable.less
  {
    test: /\.less$/,
    exclude: [/\.mod\.less$/, /\.use(able)?\.less$/],
    loaders: [
      'style-loader',
      'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&remove=false',
      'less-loader'
    ],
    happy: { id: 'less' }
  }, {
    test: /\.use(able)?\.less$/,
    loaders: [
      'style-loader/useable',
      'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&remove=false',
      'less-loader'
    ],
    happy: { id: 'useable-less' }
  }, {
    test: /\.mod\.less$/,
    loaders: [
      'style-loader',
      'css-loader?modules&localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&remove=false',
      'less-loader'
    ],
    happy: { id: 'mod-less' }
  },

// 其他资源
  {
    test: /\.(jpeg|jpg|png|gif)$/,
    loader: 'url-loader?limit=10240',
    include: [
      nps.join(__dirname, '../..')
    ],
  }, {
    test: /\.html$/,
    loader: 'html-loader'
  }, {
    test: /\.json$/,
    include: [
      nps.join(__dirname, '../..')
    ],
    loader: 'json-loader'
  }, {
    test: /\.woff(\?.+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'
  }, {
    test: /\.woff2(\?.+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'
  }, {
    test: /\.ttf(\?.+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'
  }, {
    test: /\.eot(\?.+)?$/, loader: 'file'
  }, {
    test: /\.svg(\?.+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'
  }
]
