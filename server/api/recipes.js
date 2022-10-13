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
        // console.log('parsedIngredients', parsedIngredients);

        await Promise.all(
            parsedIngredients[0].map(async (item)=>{
                console.log('item',item)
                let [component, componentCreated] = await Component.findOrCreate({
                    where:{
                        name: item.name
                    }})

                console.log('component:', component.id)

                return await Ingredient.create({
                    componentId: component.id,
                    recipeId: recipe.id,
                    quantity: item.qty,
                    unit: item.unit,
                    comment: item.comment,
                    // originText: item.input
                })
            })
        )
        const createdRecipe = await Recipe.findByPk(recipe.id,{
            include: [
                {
                    model: Ingredient,
                    attributes: ['id','quantity','unit','comment'],
                    include:[{
                        model: Component,
                        attributes: ['id','name']
                    }]
                }
                
            ]
        })
        console.log('Recipe', createdRecipe)
        res.json(createdRecipe)
    }catch(error){
        next(error)
    }
 })

//  router.post('/', createNewRecipe)

 module.exports = router;
