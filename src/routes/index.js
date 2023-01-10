const router = require('express').Router()

router.post('/test', async (req, res, next) => {
  try {
    asdgs
    res.status(200).send({})
  } catch (e) {
    // 异步地将Error传递给下一个中间件处理
    next(e)
  }
})

module.exports = router