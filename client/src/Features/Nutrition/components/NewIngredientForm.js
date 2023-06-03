import { useForm, useFieldArray } from 'react-hook-form';
import { createNutritionItem } from '../api';
import { useAuth0 } from '@auth0/auth0-react';
import { calculateIngredientNutrition } from '../utils/calculateIngredientNutrition';
import { filterNutrientValues } from '../utils';
import { genericMeasurements } from '../utils/genericMeasurements';

export function NewIngredientForm({
  form,
  setForm,
  recipeNutrition,
  setRecipeNutrition,
  onClose,
}) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      measurements: [{ name: 'slice', gramWeight: 10 }],
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

    const measurementOptions = [...data.measurements, ...genericMeasurements];

    const itemPayload = {
      sourceId: user.sub,
      source: 'User',
      name: data.name,
      nutrition: JSON.stringify(itemNutrition),
      measurementOptions: JSON.stringify(measurementOptions),
    };

    let response = await createNutritionItem(itemPayload);
    let ingredientEdit = form[2];
    let setIngredientEdit = form[3];

    let measureOptions = JSON.parse(response.data.measureOptions.options);

    let newFoodItem = {
      name: response.data.itemNutrition.name,
      nutrition: response.data.itemNutrition.nutrition,
      source: response.data.itemNutrition.source,
      foodMeasures: measureOptions,
    };
    let ingredientEditCopy = { ...ingredientEdit };
    let originalFoodOptions = ingredientEditCopy.allUsdaOptions;
    let updatedFoodOptions = [newFoodItem, ...originalFoodOptions];

    ingredientEditCopy.matchedIndex = 0;
    ingredientEditCopy.measurementOptions = measureOptions;
    ingredientEditCopy.currentMeasurement = measureOptions[0];
    ingredientEditCopy.matchedMeasurementIndex = 0;
    ingredientEditCopy.gramWeight = ingredientEditCopy.currentMeasurement.value;
    ingredientEditCopy.allUsdaOptions = updatedFoodOptions;
    ingredientEditCopy.matchedIndexItem = ingredientEditCopy.allUsdaOptions[0];

    let currentFood = ingredientEditCopy.matchedIndexItem;

    let nutritionValues = currentFood.fdcId
      ? filterNutrientValues(currentFood.nutrition)
      : JSON.parse(currentFood.nutrition);

    ingredientEditCopy.nurtritionPer100G = {
      ...nutritionValues,
    };

    ingredientEditCopy.ingredientNutrition = calculateIngredientNutrition(
      ingredientEditCopy.nurtritionPer100G,
      ingredientEditCopy.gramWeight,
      ingredientEditCopy.quantity,
      recipeNutrition.servings
    );

    setIngredientEdit(ingredientEditCopy);
    setForm(null);
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
    onClose();
  };

  return (
    <article>
      <div></div>
      <form className="new-ingredient-form" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div className="section-title">
            <strong>Required</strong>
          </div>
          <div className="section-inputs">
            <label className="text-input">
              Name
              <input {...register('name')}></input>
            </label>

            <label className="quantity-input">
              Calories
              <input {...register('calories')}></input>
            </label>
          </div>
        </section>
        <section>
          <div className="section-header">
            <strong>Macro Nutrients</strong>
            <div className="sub-title">
              <>Optional</>
            </div>
          </div>
          <div className="section-inputs">
            <label className="quantity-input">
              Total Fat
              <input {...register('totalFat')}></input>
            </label>
            <label className="quantity-input">
              Saturated Fat
              <input {...register('saturatedFat')}></input>
            </label>
            <label className="quantity-input">
              Trans Fat
              <input {...register('trasFat')}></input>
            </label>
            <label className="quantity-input">
              Cholesterol
              <input {...register('cholesterol')}></input>
            </label>
            <label className="quantity-input">
              Sodium
              <input {...register('sodium')}></input>
            </label>
            <label className="quantity-input">
              Total Carbohydrate
              <input {...register('totalCarbs')}></input>
            </label>
            <label className="quantity-input">
              Dietary Fiber
              <input {...register('dietaryFibers')}></input>
            </label>
            <label className="quantity-input">
              Sugars
              <input {...register('sugars')}></input>
            </label>
            <label className="quantity-input">
              Protien
              <input {...register('protien')}></input>
            </label>
          </div>
        </section>
        <section>
          <div className="section-header">
            <strong>Micro Nutrients</strong>
            <div className="sub-title">
              <>Optional</>
            </div>
          </div>
          <div className="section-inputs">
            <label className="quantity-input">
              Vitamen D<input {...register('vitamenD')}></input>
            </label>
            <label className="quantity-input">
              Calcium
              <input {...register('calcium')}></input>
            </label>
            <label className="quantity-input">
              Iron:
              <input {...register('iron')}></input>
            </label>
            <label className="quantity-input">
              Potassium
              <input {...register('potassium')}></input>
            </label>
          </div>
        </section>
        <section className="measurement-input-section">
          <div className="section-header">
            <strong>Custom Measurements</strong>
            <div className="sub-title">
              <>Optional</>
            </div>
          </div>
          <div className="section-inputs">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="new-ingredient-measurement-input"
                >
                  <label className="name-input">
                    Name
                    <input
                      key={field.id}
                      {...register(`measurements.${index}.name`)}
                      type="text"
                    />
                  </label>
                  <label
                    className="quantity-input"
                    style={{ 'padding-left': '10px' }}
                  >
                    Grams
                    <input
                      key={field.id}
                      {...register(`measurements.${index}.gramWeight`)}
                      type="number"
                    />{' '}
                  </label>
                </div>
              );
            })}
          </div>
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
        </section>
        <input id="form-submit" type="submit" value="Save"></input>
      </form>
    </article>
  );
}
