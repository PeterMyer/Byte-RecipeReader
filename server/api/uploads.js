var express = require("express");
const { v4: uuidv4 } = require("uuid")
var router = express.Router();
const fs = require('fs')
const path = require('path')
const {
  models: { Image },
} = require('../db/index');
const AWS = require('aws-sdk')               
const multer = require('multer')

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

const upload = multer({ storage: storage });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,             
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    region: 'us-east-2'
})

router.post('/', upload.single('uploaded_file'), async(req, res) => {
    try{
        const {userId} = req.query
        console.log(req)
        const ext = path.extname(req.file.originalname)
        const newFilepath = `${uuidv4()}${ext}`



        const params = {
            Bucket: process.env.S3_BUCKET_NAME,   
            Key: newFilepath,           
            Body:req.file.buffer,                   
            ACL:"public-read-write",                 
            ContentType:"image/jpeg"        
        };

         const uploadedImage = await s3.upload(params,(error,data)=>{
            console.log('data',data)}).promise()

          const savedImage = await Image.create({
            filepath: uploadedImage.Location,
            fileName: req.file.originalname,
            userId: userId
            });
  
          req.imgData = savedImage
  
          res.json({
              result:[req.imgData],
          }).status(204).end()

    } catch(error){
        console.log('Save Image Error:', error)
        res.status(500).send({"err":error}) 
    }
})

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
