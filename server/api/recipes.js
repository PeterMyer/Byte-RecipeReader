const router = require('express').Router();
const ParseIngredient = require('../classification_service/ParseIngredient')


const {
    models: { Recipe, Component, Ingredient },
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

router.get('/:id', async(req, res, next)=>{
    try{
        const recipe = await Recipe.findByPk(req.params.id,{
            include: [
                {
                    model: Ingredient,
                    attributes: ['id','quantity','unit','comment','originalText'],
                    include:[{
                        model: Component,
                        attributes: ['id','name']
                    }]
                }
            ]
        })
        // console.log('recipe', recipe)
        res.json(recipe);
    }
    catch(error){
        next(error)
    }
})

// POST api/recipes/
router.post('/' ,ParseIngredient, async(req,res,next)=>{
    // console.log(req.body);
    try {
        let parsedIngredients = req.parsedIngredients[0].filter(item=>item.length>0)
        const recipe = await Recipe.create({
            name: req.body.name,
            servings: req.body.servings,
            instructions: req.body.instructions,
            source: req.body.source,
        })
        // console.log('recipe', recipe);
        console.log('parsedIngredients', parsedIngredients);
        await Promise.all(
            parsedIngredients.map(async (item)=>{
                console.log('item',item[0])
                let [component, componentCreated] = await Component.findOrCreate({
                    where:{
                        name: item[0].name
                    }})

                await Ingredient.create({
                    componentId: component.id,
                    recipeId: recipe.id,
                    quantity: item[0].qty,
                    unit: item[0].unit,
                    comment: item[0].comment,
                    originalText: item[0].input
                })
            })
        )
        const createdRecipe = await Recipe.findByPk(recipe.id,{
            include: [
                {
                    model: Ingredient,
                    attributes: ['id','quantity','unit','comment','originalText'],
                    include:[{
                        model: Component,
                        attributes: ['id','name']
                    }]
                }
            ]
        })
        res.json(createdRecipe)
    }catch(error){
        next(error)
    }
 })
//  router.post('/', createNewRecipe)
 module.exports = router;
