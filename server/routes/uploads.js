var express = require("express");
var router = express.Router();

var multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb)=> {
    const { originalname } = file;
    cb(null, originalname);
  }
})
var upload = multer({ storage });

router.post('/', upload.single('uploaded_file'), (req, res)=> {

    console.log(req.body) // form fields
    console.log(req.file) // form files
    res.status(204).end()
});


module.exports = router;
