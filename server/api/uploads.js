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
    cb(null, './server/images');
  },
  filename: async (req, file, cb, )=> {
    console.log(req.query)
    let {userId} = req.query;
    const ext = path.extname(file.originalname)
    const filepath = `/${uuidv4()}${ext}`
      try {
        const savedImage = await Image.create({
          filepath: filepath,
          userId: userId
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
   let {userId} = req.query;

    const allImages = await Image.findAll({
      where:{
        userId: userId
      }
    });
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
    let filePath = "./server/images"+req.body.filePath
    if(fs.existsSync(filePath)){
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log('file was deleted')})}
    res.json(image)
} catch (err) {
    console.log(err);
}
});

module.exports = router;
