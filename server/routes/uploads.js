var express = require("express");
var router = express.Router();

var multer = require('multer')

var upload = multer({ dest: "./uploads/" });

router.post('/', upload.single('uploaded_file'), (req, res)=> {

    console.log(req.body) // form fields
    console.log(req.file) // form files
    res.status(204).end()
});


module.exports = router;
