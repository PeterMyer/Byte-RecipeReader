import React from 'react';
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

  const { register } = useForm();

  return (
    <>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => {
        const quantity = handleQuantityInts(
          ingredient.measurementQuantity?.qtyAmount
        );

        return (
          <>
            <div className="fingredient-container-refactor">
              <div>
                <div className="input-line">
                  <div>
                    {ingredient.measurementQuantity?.qtyAmount}{' '}
                    {ingredient.measurementUnit.unitDescription}{' '}
                    {ingredient.component.name}
                  </div>
                </div>
              </div>
              <div>
                <div className="input-line">
                  <label>
                    <input
                      defaultValue={quantity}
                      {...register(`quantity${index}`)}
                    />
                  </label>
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
