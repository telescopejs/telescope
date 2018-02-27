/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/2/26
 * @description
 */
const express = require('express')
const app = express()
const PORT = require('./port')
const r = require('./route')

function error(err, req, res, next) {
  console.error(err)
  res.status(500).type('html')
     .send(`<html>
<head>
<title>Error: ${err.message}</title>
</head>
<body>
<div>
<h2>${err.toString()}</h2>
<pre>
<code>${err.stack}</code>
</pre>
</div>
</body>
</html>`)
}
app.use('/', r)
app.use(error)
app.listen(PORT, () => {
  console.log('telescope run on http://localhost:' + PORT)
})
