import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit } = useForm();
  const { user } = useAuth0();

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
        <label>
          Calories:
          <input {...register('calories')}></input>
        </label>
        <label>
          Total Fat:
          <input {...register('totalFat')}></input>
        </label>
        <label>
          Saturated Fat:
          <input {...register('saturatedFat')}></input>
        </label>
        <label>
          Trans Fat:
          <input {...register('trasFat')}></input>
        </label>
        <label>
          Cholesterol:
          <input {...register('cholesterol')}></input>
        </label>
        <label>
          Sodium:
          <input {...register('sodium')}></input>
        </label>
        <label>
          Total Carbohydrate:
          <input {...register('totalCarbs')}></input>
        </label>
        <label>
          Dietary Fiber:
          <input {...register('dietaryFibers')}></input>
        </label>
        <label>
          Sugars:
          <input {...register('sugars')}></input>
        </label>
        <label>
          Protien:
          <input {...register('protien')}></input>
        </label>
        <label>
          Vitamen D:
          <input {...register('vitamenD')}></input>
        </label>
        <label>
          Calcium:
          <input {...register('calcium')}></input>
        </label>
        <label>
          Iron:
          <input {...register('iron')}></input>
        </label>
        <label>
          Potassium:
          <input {...register('potassium')}></input>
        </label>
      </form>
    </section>
  );
}
