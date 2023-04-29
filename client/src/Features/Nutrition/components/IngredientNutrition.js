import React from 'react';

export const IngredientNutrition = ({ ingredients, recipeNutrition }) => {
  return (
    <>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient) => {
        return (
          <>
            <div className="ingredient-container-refactor">
              <div>
                <h4>Original </h4>
                <div>{ingredient.recipeIngredient.text}</div>
              </div>
              <div>
                <h4>Matched </h4>
                <div>
                  {
                    recipeNutrition.ingredients[ingredient.normText]
                      .matchedIndexItem.description
                  }
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
