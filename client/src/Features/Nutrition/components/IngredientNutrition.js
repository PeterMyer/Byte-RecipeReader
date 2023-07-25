import React, { useState } from 'react';
import { SingleIngredient } from './SingleIngredient';
import { EditIngredient } from './EditIngredient';
import { NewIngredientForm } from './NewIngredientForm';

export const IngredientNutrition = ({
  ingredients,
  recipeNutrition,
  setRecipeNutrition,
  setForm,
  recipeIngredients,
  setShowModal,
}) => {
  const [editIngredient, setEditIngredient] = useState({
    editStatus: false,
    index: null,
  });

  const handleClick = (index) => {
    setEditIngredient({ status: true, index: index });
  };

  const handleCancel = () => {
    setEditIngredient({ status: false, index: null });
  };

  return (
    <section className="calculator-ingredients-list">
      {ingredients.map((ingredient, index) => {
        return (
          <section className="calculator-ingredients-single">
            <div className="calculator-single-ingredient-container">
              <SingleIngredient
                ingredient={ingredient}
                setForm={setForm}
                recipeNutrition={recipeNutrition}
                setShowModal={setShowModal}
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
                  setShowModal={setShowModal}
                />
              ) : (
                <div className="calculator-single-ingredient-editbox">
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
                </div>
              )}
            </div>
            <div className="calculator-single-ingredient-button-container">
              {editIngredient.status && editIngredient.index === index ? (
                <button onClick={handleCancel}>X</button>
              ) : (
                <button onClick={() => handleClick(index)}>
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              )}
            </div>
          </section>
        );
      })}
    </section>
  );
};
