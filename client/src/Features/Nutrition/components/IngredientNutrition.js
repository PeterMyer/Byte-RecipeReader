import React from 'react';

export const IngredientNutrition = ({ ingredients }) => {
  return (
    <>
      {console.log(ingredients)}
      {ingredients.map((ingredient) => {
        return <div>{ingredient.recipeIngredient.text}</div>;
      })}
    </>
  );
};
