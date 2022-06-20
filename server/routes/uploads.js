var express = require("express");
var router = express.Router();
const path = require('path')
const {
  models: { Image },
} = require('../db/index');

var multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: async (req, file, cb, )=> {
    const ext = path.extname(file.originalname)
    const filepath = `/${file.originalname}${ext}`

      try {
        const savedImage = await Image.create({
          filepath: filepath
        });
        cb(null, filepath);
        console.log('saved Image:', savedImage)
      } catch (err){
        console.log('Save Image Error:', err)
      }
    }
  }
)
var upload = multer({ storage });



router.post('/', upload.single('uploaded_file'), (req, res)=> {

    console.log(req.body) // form fields
    console.log(req.file) // form files
    res.status(204).end()
});

router.get('/', async (req,res)=>{
  try {
    const allImages = await Image.findAll();
    res.json(allImages);
} catch (err) {
    console.log(err);
}
});



module.exports = router;
