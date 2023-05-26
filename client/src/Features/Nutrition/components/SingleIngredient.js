import React, { useState } from 'react';
import { IngredientSelect } from './IngredientSelect';
import { UnitSelect } from './UnitSelect';
import { useForm } from 'react-hook-form';
import { handleQuantityInts } from '../utils';

export const SingleIngredient = ({ ingredient, setForm, recipeNutrition }) => {
  const [editIngredient, setEditIngredient] = useState(false);

  const handleClick = () => {
    setEditIngredient(true);
  };

  const handleCreateIngredient = (ingredientName) => {
    setForm([true, ingredientName]);
  };

  const handleQuantityChange = (event, ingredient) => {
    console.log(event);
    // const recipeNutritionCopy = { ...recipeNutrition };
    // recipeNutritionCopy.ingredients[ingredient].quantity = 1;
  };

  // const { register } = useForm();

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
      </div>
    </>
  );
};
