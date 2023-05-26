import { useForm } from 'react-hook-form';
import { UnitSelect } from './UnitSelect';
import { IngredientSelect } from './IngredientSelect';
import { useState } from 'react';
import { sumIngredientNutrition, calculateIngredientNutrition } from '../utils';

export function EditIngredient({
  recipeNutrition,
  recipeIngredient,
  index,
  setRecipeNutrition,
  ingredient,
  setForm,
  setEditIngredient,
}) {
  const { register, handleSubmit } = useForm();
  const quantity = recipeIngredient.quantity;
  const [IngredientEdit, setIngredientEdit] = useState(recipeIngredient);

  const handleCreateIngredient = (ingredientName) => {
    setForm([true, ingredientName]);
  };

  const onSubmit = (data) => {
    console.log(recipeNutrition);
    let IngredientEditCopy = { ...IngredientEdit };
    IngredientEditCopy.quantity = data[`quantity${index}`];
    IngredientEditCopy.ingredientNutrition = calculateIngredientNutrition(
      //nutrtionValues
      IngredientEditCopy.nurtritionPer100G,
      //gramWeight
      IngredientEditCopy.gramWeight,
      //quantity
      IngredientEditCopy.quantity,
      //servings
      recipeNutrition.servings
    );

    let recipeNutritionCopy = { ...recipeNutrition };

    recipeNutritionCopy.ingredients[ingredient.normText] = IngredientEditCopy;
    recipeNutritionCopy.totalNutrition =
      sumIngredientNutrition(recipeNutritionCopy);

    setEditIngredient({
      editStatus: false,
      index: null,
    });
    setRecipeNutrition(recipeNutritionCopy);
  };

  return (
    <div>
      <div className="ingredient-container-refactor">
        <div>
          <div className="input-line">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="submit" value="Save"></input>
              <label>
                <input
                  defaultValue={quantity}
                  type="number"
                  {...register(`quantity${index}`)}
                />
              </label>
            </form>
            <></>
            <UnitSelect
              measures={IngredientEdit.measurementOptions}
              recipeNutrition={recipeNutrition}
              // ingredientName={ingredient.normText}
              // setRecipeNutrition={setRecipeNutrition}
              IngredientEdit={IngredientEdit}
              setIngredientEdit={setIngredientEdit}
            />
            <IngredientSelect
              allUsdaOptions={
                recipeNutrition.ingredients[ingredient.normText].allUsdaOptions
              }
              recipeNutrition={recipeNutrition}
              ingredientName={ingredient.recipeIngredient.text}
              setRecipeNutrition={setRecipeNutrition}
              IngredientEdit={IngredientEdit}
              setIngredientEdit={setIngredientEdit}
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
    </div>
  );
}
