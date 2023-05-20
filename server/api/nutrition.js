const axios = require('axios');
const router = require('express').Router();
const {
  models: {
    Recipe,
    Component,
    Ingredient,
    MeasurementQuantity,
    MeasurementUnit,
    RecipeComment,
    FoodItemNutrition,
    RecipeNutrition,
  },
} = require('../db/index');

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

router.post('/newItem', async (req, res, next) => {
  try {
    const [foodItemNutrition, foodItemNutritionCreated] =
      await FoodItemNutrition.findOrCreate({
        where: {
          name: req.body.name,
          sourceId: req.body.sourceId,
          source: req.body.source,
        },
      });

    await foodItemNutrition.update({
      nutrition: req.body.nutrition,
    });

    res.send(foodItemNutrition);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Ingredient,
          attributes: ['id', 'normText'],
          include: [
            {
              model: Component,
              attributes: ['id', 'name'],
              include: [
                {
                  model: FoodItemNutrition,
                  attributes: ['id', 'name', 'source', 'nutrition'],
                },
              ],
            },
          ],
        },
      ],
    });

    // USDA API CALL
    const usdaResults = await Promise.all(
      recipe.ingredients.map(async (ingredient) => {
        const params = {
          query: ingredient.component.name,
          dataType: ['Foundation', 'Survey (FNDDS)'],
          pageSize: 10,
        };
        const response = await apiClient.post(
          `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.foodDataCentralApiKey}`,
          params
        );
        const result = response.data.foods.map((food) => ({
          name: food.description,
          nutrition: food.foodNutrients,
          source: 'USDA',
          fdcId: food.fdcId,
          foodMeasures: food.foodMeasures,
        }));

        return result;
      })
    );
    res.json({ recipe, usdaResults });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const nutrients = await RecipeNutrition.findOne({
      where: { recipeId: req.params.id },
    });
    res.send(nutrients);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
