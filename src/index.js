const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const EmailGenerator = require("./modules/email-generator")
const app = express()

const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes'))

app.get('*', function routeHandler(req, res, next) {
  // 此中间件抛出一个错误，Express 将直接转到下一个错误处理程序
  try {
    throw new Error('Oops!')
  } catch(e) {
    e.status = 404
    next(e)
  }
})
// 处理全局报错
app.use(function (err, req, res, next) {
  const emailGenerator = new EmailGenerator({
    host: "smtp.exmail.qq.com",
    port: 465,
    secure: true,
    user: 'fanghaoming@rayvision.com',
    pass: 'Sdarmin1',
  })
  const backupContent = emailGenerator.createContent({
    from: 'my-koa <fanghaoming@rayvision.com>',
    subject: `【服务器报错啦！】`,
    text: error.message
  })
  emailGenerator.send(backupContent, ['fanghaoming@rayvision.com'])
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

var PORT = 4000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`listening on ${PORT}.`)
})