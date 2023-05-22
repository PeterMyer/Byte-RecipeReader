import { useForm, useFieldArray } from 'react-hook-form';
import { createNutritionItem } from '../api';
import { useAuth0 } from '@auth0/auth0-react';
import { calculateIngredientNutrition } from '../utils/calculateIngredientNutrition';
import { sumIngredientNutrition } from '../utils/sumIngredientNutrition';
import { filterNutrientValues } from '../utils';

export function NewIngredientForm({
  form,
  setForm,
  recipeNutrition,
  setRecipeNutrition,
}) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      measurements: [{ name: 'slice', value: 10 }],
    },
  });
  const { user } = useAuth0();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'measurements', // unique name for your Field Array
  });

  const onSubmit = async (data) => {
    const itemNutrition = {
      calories: { amount: data.calories, unit: null },
      totalFat: { amount: data.totalFat, unit: 'g' },
      saturatedFat: { amount: data.saturatedFat, unit: 'g' },
      transFat: { amount: data.transFat, unit: 'g' },
      cholesteral: { amount: data.cholesteral, unit: 'mg' },
      sodium: { amount: data.sodium, unit: 'mg' },
      totalCarbs: { amount: data.totalCarbs, unit: 'g' },
      dietaryFibers: { amount: data.dietaryFibers, unit: 'g' },
      sugars: { amount: data.sugars, unit: 'g' },
      protien: { amount: data.protien, unit: 'mg' },
      vitaminD: { amount: data.vitaminD, unit: 'mcg' },
      calcium: { amount: data.calcium, unit: 'mg' },
      iron: { amount: data.iron, unit: 'mg' },
      pottassium: { amount: data.pottassium, unit: 'g' },
    };
    const itemPayload = {
      sourceId: user.sub,
      source: 'User',
      name: data.name,
      nutrition: JSON.stringify(itemNutrition),
    };

    let response = await createNutritionItem(itemPayload);
    let ingredient = form[1];
    let originalOptions =
      recipeNutrition.ingredients[ingredient].allUsdaOptions;
    let recipeNutritionCopy = { ...recipeNutrition };
    recipeNutritionCopy.ingredients[ingredient].matchedIndex = 0;
    recipeNutritionCopy.ingredients[ingredient].allUsdaOptions = [
      response.data,
      ...originalOptions,
    ];
    recipeNutritionCopy.ingredients[ingredient].matchedIndexItem =
      recipeNutritionCopy.ingredients[ingredient].allUsdaOptions[0];

    let currentFood =
      recipeNutritionCopy.ingredients[ingredient].matchedIndexItem;

    let nutritionValues = currentFood.fdcId
      ? filterNutrientValues(currentFood.nutrition)
      : JSON.parse(currentFood.nutrition);

    recipeNutritionCopy.ingredients[ingredient].nurtritionPer100G = {
      ...nutritionValues,
    };
    recipeNutritionCopy.ingredients[ingredient].ingredientNutrition =
      calculateIngredientNutrition(
        recipeNutritionCopy.ingredients[ingredient].recipeData,
        recipeNutritionCopy.ingredients[ingredient].nurtritionPer100G,
        recipeNutritionCopy.ingredients[ingredient].matchedIndexItem,
        recipeNutritionCopy.servings
      );

    recipeNutritionCopy.totalNutrition =
      sumIngredientNutrition(recipeNutrition);
    setRecipeNutrition(recipeNutritionCopy);
    setForm(null);
  };

  return (
    <section>
      <h3>Add New Ingredient</h3>
      <form className="new-ingredient-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" value="Save Ingredient"></input>
        <label>
          Ingredient Name:
          <input {...register('name')}></input>
        </label>
        <div className="input-line">
          <label>
            Calories:
            <input {...register('calories')}></input>
          </label>
          <label>
            Total Fat:
            <input {...register('totalFat')}></input>
          </label>
        </div>
        <div className="input-line">
          <label>
            Saturated Fat:
            <input {...register('saturatedFat')}></input>
          </label>
          <label>
            Trans Fat:
            <input {...register('trasFat')}></input>
          </label>
        </div>
        <div className="input-line">
          <label>
            Cholesterol:
            <input {...register('cholesterol')}></input>
          </label>
          <label>
            Sodium:
            <input {...register('sodium')}></input>
          </label>
        </div>
        <div className="input-line">
          <label>
            Total Carbohydrate:
            <input {...register('totalCarbs')}></input>
          </label>
          <label>
            Dietary Fiber:
            <input {...register('dietaryFibers')}></input>
          </label>
        </div>
        <div className="input-line">
          <label>
            Sugars:
            <input {...register('sugars')}></input>
          </label>
          <label>
            Protien:
            <input {...register('protien')}></input>
          </label>
        </div>
        <div className="input-line">
          <label>
            Vitamen D:
            <input {...register('vitamenD')}></input>
          </label>
          <label>
            Calcium:
            <input {...register('calcium')}></input>
          </label>
        </div>
        <div className="input-line">
          <label>
            Iron:
            <input {...register('iron')}></input>
          </label>
          <label>
            Potassium:
            <input {...register('potassium')}></input>
          </label>
        </div>
        <div className="measurement-input-section">
          <strong>Unique Measurement Units</strong>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="new-ingredient-measurement-input">
                <label>
                  Unit Name
                  <input
                    key={field.id}
                    {...register(`measurements.${index}.name`)}
                    type="text"
                  />
                </label>
                <label>
                  Gram Wieght
                  <input
                    key={field.id}
                    {...register(`measurements.${index}.value`)}
                    type="integer"
                  />
                </label>
              </div>
            );
          })}
          <button
            type="button"
            id="addButton"
            onClick={() =>
              append({
                name: '',
                value: 0,
                id: null,
              })
            }
          >
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </div>
      </form>
    </section>
  );
}
