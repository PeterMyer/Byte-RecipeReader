const axios = require("axios");
const router = require("express").Router();
const {
    models: { Recipe, Component, Ingredient,MeasurementQuantity,MeasurementUnit,RecipeComment, RecipeNutrition  },
  } = require("../db/index");

const apiClient = axios.create({
    baseURL: "http://localhost:3001"
  })

router.post("/:id",async(req,res,next)=>{
    try{
        const recipe = await Recipe.findByPk(req.params.id,{
            include: [
                {
                    model: Ingredient,
                    attributes: ["id", "normText"],
                    include:[{
                        model: Component,
                        attributes: ["id","name"]},
                        {
                        model: MeasurementQuantity,
                        attributes: ["id","qtyAmount"]},
                        {
                        model: MeasurementUnit,
                        attributes: ["id","unitDescription"]},
                        {
                        model: RecipeComment,
                        attributes: ["id","commentText"]},
                    ]
                }
            ]
        })

         //USDA API CALL
        const usdaResults = await Promise.all(
            recipe.ingredients.map(async (ingredient)=>{                   
                    let params = {
                        "query": ingredient.component.name,
                        "dataType": [
                            "Foundation",
                            "Survey (FNDDS)"
                        ],
                        "pageSize": 25,
                        "nutrients":[203]
                          }
                    let response = await apiClient.post(
                    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.foodDataCentralApiKey}`,
                    params
                    )
                return response.data
            })
        )
        res.json(usdaResults)    
    }catch(error){
        next(error)
    }
})

router.get("/:id",async(req,res,next)=>{
    try{
        const nutrients = await RecipeNutrition.findOne({
            where: {recipeId: req.params.id}
        })
        res.send(nutrients)
    } catch(error){
        next(error)
    }
})


module.exports = router;

