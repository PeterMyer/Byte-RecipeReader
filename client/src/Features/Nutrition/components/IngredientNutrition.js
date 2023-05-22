import React from 'react';
import { IngredientSelect } from './IngredientSelect';
import { UnitSelect } from './UnitSelect';

export const IngredientNutrition = ({
  ingredients,
  recipeNutrition,
  setRecipeNutrition,
  setForm,
}) => {
  const handleCreateIngredient = (ingredientName) => {
    setForm([true, ingredientName]);
  };

  return (
    <>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient) => {
        console.log('ingredient', ingredient);
        console.log('recipeNutrition', recipeNutrition);
        return (
          <>
            <div className="fingredient-container-refactor">
              <div>
                <div className="input-line">
                  <div>
                    {ingredient.measurementQuantity.qtyAmount}{' '}
                    {ingredient.measurementUnit.unitDescription}{' '}
                    {ingredient.component.name}
                  </div>
                </div>
                <div>{ingredient.recipeComment.commentText}</div>
              </div>
              <div>
                <div>
                  <UnitSelect
                    measures={
                      recipeNutrition.ingredients[ingredient.normText]
                        .matchedIndexItem.foodMeasures
                    }
                  />
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
                <button
                  onClick={() =>
                    handleCreateIngredient(ingredient.recipeIngredient.text)
                  }
                >
                  +
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
