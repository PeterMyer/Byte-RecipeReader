const router = require('express').Router();
const ParseIngredient = require('../classification_service/ParseIngredient');

const {
  models: {
    Recipe,
    Component,
    Ingredient,
    MeasurementQuantity,
    MeasurementUnit,
    RecipeComment,
    RecipeIngredient,
    RecipeNutrition,
    Image,
    FoodItemNutrition,
    FoodItemNutritionMatch,
  },
} = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    let { userId } = req.query;
    const recipe = await Recipe.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: Image,
      },
    });
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Image,
        },
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
            {
              model: MeasurementQuantity,
              attributes: ['id', 'qtyAmount'],
            },
            {
              model: MeasurementUnit,
              attributes: ['id', 'unitDescription', 'unitGrams'],
            },
            {
              model: RecipeComment,
              attributes: ['id', 'commentText'],
            },
          ],
        },
      ],
    });
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

// POST api/recipes/
router.post('/', ParseIngredient, async (req, res, next) => {
  try {
    const parsedIngredients = req.parsedIngredients[0].filter(
      (item) => item.length > 0
    );

    const recipe = await Recipe.create({
      name: req.body.name,
      servings: req.body.servings,
      instructions: req.body.instructions,
      source: req.body.source,
      userId: req.body.userId,
      profileId: req.body.imgId,
    });
    await Promise.all(
      parsedIngredients.map(async (item) => {
        let {
          name = null,
          qty = null,
          unit = null,
          comment = null,
          input = 'no input',
        } = item[0];

        // if(qty && qty.includes("/")){
        //     let splitFraction = qty.split("/")
        //     qty = parseInt(splitFraction[0],10)/parseInt(splitFraction[1],10)
        // }

        let [component, componentCreated] = await Component.findOrCreate({
          where: {
            name: name,
          },
        });

        let [quantity, quantityCreated] =
          await MeasurementQuantity.findOrCreate({
            where: {
              qtyAmount: qty,
            },
          });

        let [itemUnit, itemUnitCreated] = await MeasurementUnit.findOrCreate({
          where: {
            unitDescription: unit,
          },
        });

        let [itemComment, itemCommentCreated] =
          await RecipeComment.findOrCreate({
            where: {
              commentText: comment,
            },
          });

        let [ingredient, ingredientCreated] = await Ingredient.findOrCreate({
          where: {
            normText: input.toLowerCase(),
            componentId: component.id,
            measurementQuantityId: quantity.id,
            measurementUnitId: itemUnit.id,
            recipeCommentId: itemComment.id,
          },
        });

        await RecipeIngredient.create({
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          text: input,
        });
      })
    );
    const createdRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        {
          model: Ingredient,
          attributes: ['id'],
          include: [
            {
              model: Component,
              attributes: ['id', 'name'],
            },
            {
              model: MeasurementQuantity,
              attributes: ['id', 'qtyAmount'],
            },
            {
              model: MeasurementUnit,
              attributes: ['id', 'unitDescription'],
            },
            {
              model: RecipeComment,
              attributes: ['id', 'commentText'],
            },
          ],
        },
      ],
    });
    res.json(createdRecipe);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', ParseIngredient, async (req, res, next) => {
  try {
    const parsedIngredients = req.parsedIngredients
      ? req.parsedIngredients[0].filter((item) => item.length > 0)
      : [];
    const updatedIngredients = req.body.changedFormat
      ? req.body.changedFormat
      : [];
    const deletedIngredients = req.body.deletedIngredients
      ? req.body.deletedIngredients
      : [];

    //Update Recipe
    await Recipe.update(
      {
        name: req.body.name,
        servings: req.body.servings,
        instructions: req.body.instructions,
        source: req.body.source,
        profileId: req.body.imgId,
      },
      { where: { id: req.params.id } }
    );

    //Add New Ingredients
    if (parsedIngredients.length > 0) {
      await Promise.all(
        parsedIngredients.map(async (item) => {
          let {
            name = null,
            qty = null,
            unit = null,
            comment = null,
            input = 'no input',
          } = item[0];

          let [component, componentCreated] = await Component.findOrCreate({
            where: {
              name: name,
            },
          });

          let [quantity, quantityCreated] =
            await MeasurementQuantity.findOrCreate({
              where: {
                qtyAmount: qty,
              },
            });

          let [itemUnit, itemUnitCreated] = await MeasurementUnit.findOrCreate({
            where: {
              unitDescription: unit,
            },
          });

          let [itemComment, itemCommentCreated] =
            await RecipeComment.findOrCreate({
              where: {
                commentText: comment,
              },
            });

          let [ingredient, ingredientCreated] = await Ingredient.findOrCreate({
            where: {
              normText: input.toLowerCase(),
              componentId: component.id,
              measurementQuantityId: quantity.id,
              measurementUnitId: itemUnit.id,
              recipeCommentId: itemComment.id,
            },
          });

          await RecipeIngredient.create({
            recipeId: req.params.id,
            ingredientId: ingredient.id,
            text: input,
          });
        })
      );
    }
    //Update Ingredients with text format changes
    if (updatedIngredients.length > 0) {
      await Promise.all(
        updatedIngredients.map(async (ingredient) => {
          let selectedRecipeIngredient = await RecipeIngredient.findOne({
            where: {
              recipeId: req.params.id,
              ingredientId: ingredient.id,
            },
          });
          await selectedRecipeIngredient.update({ text: ingredient.value });
        })
      );
    }

    //Destroy deleted RecipeIngredients
    if (deletedIngredients.length > 0) {
      await Promise.all(
        deletedIngredients.map(async (ingredient) => {
          let selectedRecipeIngredient = await RecipeIngredient.findOne({
            where: {
              recipeId: req.params.id,
              ingredientId: ingredient.id,
            },
          });
          await selectedRecipeIngredient.destroy();
        })
      );
    }

    const updatedRecipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Ingredient,
          attributes: ['id'],
          include: [
            {
              model: Component,
              attributes: ['id', 'name'],
            },
            {
              model: MeasurementQuantity,
              attributes: ['id', 'qtyAmount'],
            },
            {
              model: MeasurementUnit,
              attributes: ['id', 'unitDescription'],
            },
            {
              model: RecipeComment,
              attributes: ['id', 'commentText'],
            },
          ],
        },
      ],
    });
    res.json(updatedRecipe);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/nutrition', async (req, res, next) => {
  try {
    const nutrition = await RecipeNutrition.create({
      recipeId: req.params.id,
      nutritionData: req.body.nutrition,
    });

    await Promise.all(
      req.body.ingredients.map(async (ingredient) => {
        const [foodItemNutrition, foodItemNutritionCreated] =
          await FoodItemNutrition.findOrCreate({
            where: {
              name: ingredient.matchedFoodItem.name,
              source: ingredient.matchedFoodItem.source,
            },
          });
        await FoodItemNutrition.update(
          {
            nutrition: ingredient.matchedFoodItem.nutrition,
          },
          {
            where: {
              name: ingredient.matchedFoodItem.name,
              source: ingredient.matchedFoodItem.source,
            },
          }
        );

        await FoodItemNutritionMatch.create({
          userId: ingredient.user,
          recipeId: ingredient.recipeId,
          componentId: ingredient.foodItemId,
          foodItemNutritionId: foodItemNutrition.id,
        });

        const recipeIngredient = await RecipeIngredient.findOne({
          where: { ingredientId: ingredient.ingredientId },
        });
        await recipeIngredient.update({
          foodItemNutritionId: foodItemNutrition.id,
          calculatedNutrition: ingredient.calculatedNutrition,
        });
      })
    );

    res.json(nutrition);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/nutrition', async (req, res, next) => {
  try {
    const recipeNutrition = await RecipeNutrition.findOne({
      where: { recipeId: req.params.id },
    });

    recipeNutrition.update({ nutritionData: req.body.nutrition });

    await Promise.all(
      req.body.ingredients.map(async (ingredient) => {
        const [foodItemNutrition, foodItemNutritionCreated] =
          await FoodItemNutrition.findOrCreate({
            where: {
              name: ingredient.matchedFoodItem.name,
              source: ingredient.matchedFoodItem.source,
            },
          });
        if (foodItemNutritionCreated) {
          await foodItemNutrition.update({
            nutrition: ingredient.matchedFoodItem.nutrition,
          });
        }

        await FoodItemNutritionMatch.update(
          { foodItemNutritionId: foodItemNutrition.id },
          {
            where: {
              componentId: ingredient.foodItemId,
              recipeId: req.params.id,
            },
          }
        );

        await RecipeIngredient.update(
          {
            foodItemNutritionId: foodItemNutrition.id,
            calculatedNutrition: ingredient.calculatedNutrition,
          },
          { where: { ingredientId: ingredient.ingredientId } }
        );
      })
    );

    res.json(recipeNutrition);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });

    await RecipeIngredient.destroy({
      where: {
        recipeId: req.params.id,
      },
    });

    await RecipeNutrition.destroy({
      where: {
        recipeId: req.params.id,
      },
    });
    res.send(recipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//  router.post("/", createNewRecipe)
module.exports = router;
