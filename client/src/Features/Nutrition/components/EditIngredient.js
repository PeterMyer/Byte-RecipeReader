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
  setShowModal,
}) {
  const { register, handleSubmit } = useForm();
  const quantity = recipeIngredient.quantity;
  const [IngredientEdit, setIngredientEdit] = useState(recipeIngredient);

  const handleCreateIngredient = (
    ingredientName,
    IngredientEdit,
    setIngredientEdit,
    event
  ) => {
    event.preventDefault();

    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    setForm([true, ingredientName, IngredientEdit, setIngredientEdit]);
    setShowModal(true);
  };

  const onSubmit = (data) => {
    let IngredientEditCopy = { ...IngredientEdit };
    IngredientEditCopy.quantity = data[`quantity${index}`];
    IngredientEditCopy.ingredientNutrition = calculateIngredientNutrition(
      IngredientEditCopy.nurtritionPer100G,
      IngredientEditCopy.gramWeight,
      IngredientEditCopy.quantity,
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
    <form
      className="calculator-single-ingredient-edit-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="calculator-edit-form-inputs">
        <label>
          <input
            className="calculator-ingredient-quantity-input"
            defaultValue={quantity}
            type="number"
            {...register(`quantity${index}`)}
          />
        </label>
        <UnitSelect
          measures={IngredientEdit.measurementOptions}
          recipeNutrition={recipeNutrition}
          IngredientEdit={IngredientEdit}
          setIngredientEdit={setIngredientEdit}
        />
        <div className="caculator-edit-form-select-container ">
          <IngredientSelect
            recipeNutrition={recipeNutrition}
            ingredientName={ingredient.recipeIngredient.text}
            setRecipeNutrition={setRecipeNutrition}
            IngredientEdit={IngredientEdit}
            setIngredientEdit={setIngredientEdit}
          />
          <button
            onClick={(event) =>
              handleCreateIngredient(
                ingredient.recipeIngredient.text,
                IngredientEdit,
                setIngredientEdit,
                event
              )
            }
          >
            + Custom Ingredient
          </button>
        </div>
      </div>
      <input
        className="calculator-edit-form-submit-button"
        type="submit"
        value="Save"
      ></input>
    </form>
  );
}
