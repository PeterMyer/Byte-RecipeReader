import { useState, useEffect } from 'react';
import { calculateNutrition } from '../utils/index';
import { lookupNutrition, saveNutrition, updateNutrition } from '../api';
import { useLocation } from 'react-router-dom';
import { IngredientNutrition } from './IngredientNutrition';
import { useAuth0 } from '@auth0/auth0-react';
import { NutritionLabel } from './NutritionLabel';
import { NewIngredientForm } from './NewIngredientForm';
import { NewIngredientPanel } from './NewIngredientPanel';

export function NutritionCalculator() {
  const { state } = useLocation();
  const { user } = useAuth0();
  const recipeId = state.recipeId;
  const servings = state.servings;
  const ingredients = state.ingredients;
  const [recipeNutrition, setRecipeNutrition] = useState(null);
  const [existingNutrition, setExistingNutrition] = useState(state.nutrition);
  const [form, setForm] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  const handleNutritionSetUp = async (id) => {
    let nutritionData = await lookupNutrition(id);

    let recipeNutrition = calculateNutrition(
      ingredients,
      nutritionData.data.usdaResults,
      servings
    );
    setRecipeNutrition(recipeNutrition);
  };

  const handleSaveNutrition = async (id, totalNutrition, ingredients) => {
    let response = null;

    let nutritionPayload = {
      nutrition: JSON.stringify(totalNutrition),
      ingredients: Object.values(ingredients).map((ingredient) => {
        return {
          user: user.sub,
          foodItemName: ingredient.recipeData.component.name,
          foodItemId: ingredient.recipeData.component.id,
          recipeId: recipeId,
          ingredientId: ingredient.recipeData.recipeIngredient.ingredientId,
          calculatedNutrition: JSON.stringify(ingredient.ingredientNutrition),
          matchedFoodItem: {
            name: ingredient.matchedIndexItem.name,
            source: 'USDA',
            sourceId: ingredient.matchedIndexItem.fdcId,
            nutrition: JSON.stringify(ingredient.nurtritionPer100G),
          },
        };
      }),
    };

    if (existingNutrition) {
      response = await updateNutrition(id, nutritionPayload);
    } else {
      response = await saveNutrition(id, nutritionPayload);
    }
    setExistingNutrition(JSON.parse(response.data.nutritionData));
  };

  useEffect(() => {
    handleNutritionSetUp(recipeId);
  }, []);

  return (
    <>
      <button
        className="calculator-edit-form-submit-button"
        onClick={() =>
          handleSaveNutrition(
            recipeId,
            recipeNutrition.totalNutrition,
            recipeNutrition.ingredients
          )
        }
      >
        Save Nutrition
      </button>
      <div>
        {recipeNutrition ? (
          <>
            <div className="nutrition-calculator-refactor">
              <IngredientNutrition
                ingredients={ingredients}
                recipeNutrition={recipeNutrition}
                recipeIngredients={recipeNutrition.ingredients}
                setRecipeNutrition={setRecipeNutrition}
                setForm={setForm}
                setShowModal={setShowPanel}
                form={form}
              />
              <NutritionLabel recipeNutrition={recipeNutrition} />
            </div>
            <NewIngredientPanel
              onClose={() => setShowPanel(false)}
              showPanel={showPanel}
              form={form}
              recipeNutrition={recipeNutrition}
              setForm={setForm}
              setRecipeNutrition={setRecipeNutrition}
            />
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </>
  );
}
