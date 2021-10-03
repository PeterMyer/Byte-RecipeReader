const router = require('express').Router()

//placeholder route
// router.use('/placeholder',require('./placeholder'))



//error handlinbg
router.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404;
  next(err)
})

module.exports = router
