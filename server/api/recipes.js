const router = require('express').Router();
const ParseIngredient = require('../classification_service/ParseIngredient')

const {
    models: { Recipe, Component, Ingredient,MeasurementQuantity,MeasurementUnit,RecipeComment,UserText, RecipeIngredient },
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
                    attributes: ['id', 'normText'],
                    include:[{
                        model: Component,
                        attributes: ['id','name']},
                        {
                        model: MeasurementQuantity,
                        attributes: ['id','qtyAmount']},
                        {
                        model: MeasurementUnit,
                        attributes: ['id','unitDescription']},
                        {
                        model: RecipeComment,
                        attributes: ['id','commentText']},
                    ]
                }
            ]
        })
        console.log('recipe', recipe)
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
        const parsedIngredients = req.parsedIngredients[0].filter(item=>item.length>0)
        
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
                const {
                    name = null,
                    qty=null,
                    unit = null,
                    comment = null,
                    input = null
                    } = item[0]

                let [component, componentCreated] = await Component.findOrCreate({
                    where:{
                        name: name
                    }})

                let [quantity, quantityCreated] = await MeasurementQuantity.findOrCreate({
                    where:{
                        qtyAmount: qty
                    }})

                let [itemUnit, itemUnitCreated] = await MeasurementUnit.findOrCreate({
                    where:{
                        unitDescription: unit
                    }})

                let [itemComment, itemCommentCreated] = await RecipeComment.findOrCreate({
                    where:{
                        commentText: comment
                    }})

                let [ingredient, ingredientCreated] = await Ingredient.findOrCreate({
                    where:{
                        normText: input.toLowerCase(),
                        componentId: component.id,
                        measurementQuantityId: quantity.id,
                        measurementUnitId: itemUnit.id,
                        recipeCommentId: itemComment.id,}
                })

                await RecipeIngredient.create({
                    recipeId: recipe.id,
                    ingredientId: ingredient.id,
                    text: input
                })
            })
        )
        const createdRecipe = await Recipe.findByPk(recipe.id,{
            include: [
                    {
                        model: Ingredient,
                        attributes: ['id'],
                        include:[{
                            model: Component,
                            attributes: ['id','name']},
                            {
                            model: MeasurementQuantity,
                            attributes: ['id','qtyAmount']},
                            {
                            model: MeasurementUnit,
                            attributes: ['id','unitDescription']},
                            {
                            model: RecipeComment,
                            attributes: ['id','commentText']}
                        ]
                    }
                ]
        })
        res.json(createdRecipe)
    }catch(error){
        next(error)
    }
 })

 router.put('/:id',ParseIngredient, async(req, res, next)=>{
    try{

        const parsedIngredients = req.parsedIngredients?
            req.parsedIngredients[0].filter(item=>item.length>0)
            :[]
        const updatedIngredients = req.body.changedFormat? req.body.changedFormat: []
        const deletedIngredients = req.body.deletedIngredients? req.body.deletedIngredients: []


        //Update Recipe
        await Recipe.update({
            name: req.body.name,
            servings: req.body.servings,
            instructions: req.body.instructions,
            source: req.body.source,
        },{where:{id:req.params.id}})


        //Add New Ingredients
        if(parsedIngredients.length>0){
        await Promise.all(
            parsedIngredients.map(async (item)=>{
                const {
                    name = null,
                    qty=null,
                    unit = null,
                    comment = null,
                    input = null
                    } = item[0]

                let [component, componentCreated] = await Component.findOrCreate({
                    where:{
                        name: name
                    }})

                let [quantity, quantityCreated] = await MeasurementQuantity.findOrCreate({
                    where:{
                        qtyAmount: qty
                    }})

                let [itemUnit, itemUnitCreated] = await MeasurementUnit.findOrCreate({
                    where:{
                        unitDescription: unit
                    }})

                let [itemComment, itemCommentCreated] = await RecipeComment.findOrCreate({
                    where:{
                        commentText: comment
                    }})

                let [ingredient, ingredientCreated] = await Ingredient.findOrCreate({
                    where:{
                        normText: input.toLowerCase(),
                        componentId: component.id,
                        measurementQuantityId: quantity.id,
                        measurementUnitId: itemUnit.id,
                        recipeCommentId: itemComment.id,}
                })

                await RecipeIngredient.create({
                    recipeId: req.params.id,
                    ingredientId: ingredient.id,
                    text: input
                })
            })
        )}
        //Update Ingredients with text format changes 
        if(updatedIngredients.length>0){
        await Promise.all(
            updatedIngredients.map(async(ingredient) =>{
                let selectedRecipeIngredient = await RecipeIngredient.findOne(
                    {where:{
                        recipeId: req.params.id,
                        ingredientId: ingredient.id
                    }}
                )
                await selectedRecipeIngredient.update({text: ingredient.value})
             })
        )}

        //Destroy deleted RecipeIngredients
        if(deletedIngredients.length>0){
        await Promise.all(
            deletedIngredients.map(async (ingredient) =>{
                let selectedRecipeIngredient = await RecipeIngredient.findOne(
                    {where:{
                        recipeId: req.params.id,
                        ingredientId: ingredient.id
                    }})
                await selectedRecipeIngredient.destroy()
            })
        )}

        const updatedRecipe = await Recipe.findByPk(req.params.id,{
            include: [
                    {
                        model: Ingredient,
                        attributes: ['id'],
                        include:[{
                            model: Component,
                            attributes: ['id','name']},
                            {
                            model: MeasurementQuantity,
                            attributes: ['id','qtyAmount']},
                            {
                            model: MeasurementUnit,
                            attributes: ['id','unitDescription']},
                            {
                            model: RecipeComment,
                            attributes: ['id','commentText']}
                        ]
                    }
                ]
        })
        res.json(updatedRecipe)
    }catch(error){
        next(error)
    }
 })
//  router.post('/', createNewRecipe)
 module.exports = router;
