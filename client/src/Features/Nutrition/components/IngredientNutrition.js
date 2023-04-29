import React from 'react';

export const IngredientNutrition = ({ ingredients }) => {
  return (
    <>
      {ingredients.map((ingredient) => {
        return <div>{ingredient.recipeIngredient.text}</div>;
      })}
    </>
  );
};
