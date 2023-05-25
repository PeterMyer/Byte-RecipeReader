import React, { useState } from 'react';
import { IngredientSelect } from './IngredientSelect';
import { UnitSelect } from './UnitSelect';
import { useForm } from 'react-hook-form';
import { handleQuantityInts } from '../utils';

export const IngredientNutrition = ({
  ingredients,
  recipeNutrition,
  setRecipeNutrition,
  setForm,
}) => {
  const handleCreateIngredient = (ingredientName) => {
    setForm([true, ingredientName]);
  };

  const handleQuantityChange = (event, ingredient) => {
    console.log(event);
    // const recipeNutritionCopy = { ...recipeNutrition };
    // recipeNutritionCopy.ingredients[ingredient].quantity = 1;
  };

  const { register } = useForm();

  return (
    <>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => {
        const editIngredient = useState;
        const quantity = handleQuantityInts(
          ingredient.measurementQuantity?.qtyAmount
        );

        return (
          <>
            <div className="ingredient-container-refactor">
              <div>
                <div className="input-line">
                  <div>
                    "{ingredient.measurementQuantity?.qtyAmount}{' '}
                    {ingredient.measurementUnit.unitDescription}{' '}
                    {ingredient.component.name}"
                  </div>
                </div>
              </div>
              <div>
                <div className="input-line">
                  <label>
                    <input
                      defaultValue={quantity}
                      type="number"
                      {...register(`quantity${index}`)}
                    />
                  </label>
                  <></>
                  <UnitSelect
                    measures={
                      recipeNutrition.ingredients[ingredient.normText]
                        .measurementOptions
                    }
                    recipeNutrition={recipeNutrition}
                    ingredientName={ingredient.recipeIngredient.text}
                    setRecipeNutrition={setRecipeNutrition}
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
                  <button
                    onClick={() =>
                      handleCreateIngredient(ingredient.recipeIngredient.text)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
