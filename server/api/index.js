var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users',require('./users'))
router.use('/uploads',require('./uploads'))
router.use('/images',require('./fileSystem'))
router.use('/classifcation', require('./classification'))
router.use('/recipes', require('./recipes'))
// router.use('/ingredients', require('./ingredients'))
// router.use('/components', require('./components'))


module.exports = router;
