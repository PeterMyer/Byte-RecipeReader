const axios = require('axios');
const router = require('express').Router();
const Sequelize = require('sequelize');

const { Op } = Sequelize;
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
    FoodItemMeasureOptions,
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
      measureOptions: req.body.measureOptions,
    });

    // const [itemMeasureOptions, itemMeasureOptionsCreated] =
    //   await FoodItemMeasureOptions.findOrCreate({
    //     where: {
    //       foodItemNutritionId: foodItemNutrition.id,
    //     },
    //   });

    // await itemMeasureOptions.update({
    //   options: req.body.measurementOptions,
    // });

    const response = {
      itemNutrition: foodItemNutrition,
      // measureOptions: itemMeasureOptions,
    };

    res.send(response);
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

    // User Foods
    const userFoods = await Promise.all(
      recipe.ingredients.map(async (ingredient) => {
        const results = await FoodItemNutrition.findAll({
          where: {
            name: { [Op.iLike]: `%${ingredient.component.name}%` },
          },
          include: [
            {
              model: FoodItemMeasureOptions,
              attributes: ['id', 'foodItemNutritionId', 'options'],
            },
          ],
        });
        return results;
      })
    );

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
        const results = response.data.foods.map((food) => ({
          name: food.description,
          nutrition: food.foodNutrients,
          source: 'USDA',
          fdcId: food.fdcId,
          foodMeasures: food.foodMeasures.map((measure) => {
            return {
              name: measure.disseminationText,
              gramWeight: measure.gramWeight,
            };
          }),
          servingSize: food.servingSize,
        }));

        return results;
      })
    );
    res.json({ recipe, usdaResults, userFoods });
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
