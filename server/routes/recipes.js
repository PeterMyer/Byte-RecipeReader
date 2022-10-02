const router = require('express').Router();
const {
    models: { Recipe },
  } = require('../db/index');

router.get('/', async(req,res,next)=>{
    try{
        const recipe = await Recipe.findAll()
        res.json(recipe)

    }
    catch(error){
        next(error)
    }
})

router.post('/', async(req,res,next)=>{
    try {
        const recipe = await Recipe.create({
            name: req.body.name,
            servings: req.body.servings,
            instructions: req.body.instructions
        })
        res.json(recipe)
    }catch(error){
        next(error)
    }
 })

 module.exports = router;
