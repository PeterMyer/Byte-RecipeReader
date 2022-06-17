var express = require("express");
var router = express.Router();
// const multer  = require('multer')
// const upload = multer()

router.post("/", (req, res) => {
  res.json({ status: "OK" });
});


module.exports = router;
