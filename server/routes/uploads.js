var express = require('express');
var router = express.Router();

router.post('/',(req,res)=>{
  res.send.json({status: 'OK'})
})

module.exports = router
