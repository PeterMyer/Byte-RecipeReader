var express = require("express");
const { v4: uuidv4 } = require("uuid")
var router = express.Router();
const fs = require('fs')
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
    const filepath = `/${uuidv4()}${ext}`
      try {
        const savedImage = await Image.create({
          filepath: filepath
        });
        req.imgData = savedImage
        cb(null, filepath);
      } catch (err){
        console.log('Save Image Error:', err)
      }
    }
  }
)
var upload = multer({ storage });

router.post('/', upload.single('uploaded_file'), (req, res)=> {
    res.json({
      result:[req.imgData],
    }).status(204).end()
});


router.get('/', async (req,res)=>{
  try {
    const allImages = await Image.findAll();
    res.json(allImages);
} catch (err) {
    console.log(err);
}
});

router.delete('/:id', async (req,res, next)=>{
  try { 
    let image = await Image.destroy({
      where: {
        id: req.params.id
      }
    })
    console.log('req body', req.body)
    let filePath = "./images"+req.body.filePath
    console.log(filePath)
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted')})
    res.json(image)
} catch (err) {
    console.log(err);
}
});

module.exports = router;
