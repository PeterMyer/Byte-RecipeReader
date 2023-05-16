import React from 'react';
import { IngredientSelect } from './IngredientSelect';

export const IngredientNutrition = ({
  ingredients,
  recipeNutrition,
  setRecipeNutrition,
}) => {
  return (
    <>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient) => {
        return (
          <>
            <div className="ingredient-container-refactor">
              <div>
                <div>{ingredient.recipeIngredient.text}</div>
              </div>
              <div>
                <div>
                  <IngredientSelect
                    allUsdaOptions={
                      recipeNutrition.ingredients[ingredient.normText]
                        .allUsdaOptions
                    }
                    recipeNutrition={recipeNutrition}
                    ingredientName={ingredient.recipeIngredient.text}
                    setRecipeNutrition={setRecipeNutrition}
                  />
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
