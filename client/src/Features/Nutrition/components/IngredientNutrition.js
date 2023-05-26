import React, { useState } from 'react';
import { SingleIngredient } from './SingleIngredient';
import { EditIngredient } from './EditIngredient';

export const IngredientNutrition = ({
  ingredients,
  recipeNutrition,
  setRecipeNutrition,
  setForm,
  recipeIngredients,
}) => {
  const [editIngredient, setEditIngredient] = useState({
    editStatus: false,
    index: null,
  });

  const handleClick = (index) => {
    setEditIngredient({ status: true, index: index });
  };

  return (
    <>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => {
        return (
          <>
            <SingleIngredient
              ingredient={ingredient}
              setForm={setForm}
              recipeNutrition={recipeNutrition}
            />
            {editIngredient.status && editIngredient.index === index ? (
              <EditIngredient
                ingredient={ingredient}
                setForm={setForm}
                recipeNutrition={recipeNutrition}
                recipeIngredient={recipeIngredients[ingredient.normText]}
                index={index}
                setRecipeNutrition={setRecipeNutrition}
                setEditIngredient={setEditIngredient}
              />
            ) : (
              <>
                <div className="input-matched-text">
                  {recipeNutrition.ingredients[ingredient.normText].quantity}{' '}
                  {'[ '}
                  {recipeNutrition.ingredients[ingredient.normText]
                    .currentMeasurement.disseminationText
                    ? recipeNutrition.ingredients[ingredient.normText]
                        .currentMeasurement.disseminationText
                    : recipeNutrition.ingredients[ingredient.normText]
                        .currentMeasurement.name}{' '}
                  {'] '}
                  {
                    recipeNutrition.ingredients[ingredient.normText]
                      .matchedIndexItem.name
                  }
                </div>
                <button onClick={() => handleClick(index)}>Edit</button>
              </>
            )}
          </>
        );
      })}
    </>
  );
};
