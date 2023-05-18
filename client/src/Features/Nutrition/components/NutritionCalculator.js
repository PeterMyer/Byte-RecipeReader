import { useState, useEffect } from 'react';
import { calculateNutrition } from '../utils/calculateNutrition';
import { DisplayNutritionData } from './DisplayNutritionData';
import { lookupNutrition, getNutrition, saveNutrition } from '../api';
import { useLocation } from 'react-router-dom';
import { IngredientNutrition } from './IngredientNutrition';
import { updateNutrition } from '../api/updateNutrition';
import { useAuth0 } from '@auth0/auth0-react';

export function NutritionCalculator() {
  const { state } = useLocation();
  const { user } = useAuth0();

  const recipeId = state.recipeId;
  const servings = state.servings;
  const ingredients = state.ingredients;
  const [recipeNutrition, setRecipeNutrition] = useState(null);
  const [existingNutrition, setExistingNutrition] = useState(null);
  const [nutritionCalulated, toggleNutritionCalulated] = useState(false);
  const [USDANutrition, setUSDANutrition] = useState(null);

  const handleLookupNutrition = async (id) => {
    let nutrition = await lookupNutrition(id);
    console.log('usda Response', nutrition);
    setUSDANutrition(nutrition.data.usdaResults);
  };

  const handleCalculateNutrition = async () => {
    let recipeNutrition = calculateNutrition(
      ingredients,
      USDANutrition,
      servings
    );
    toggleNutritionCalulated(true);
    setRecipeNutrition(recipeNutrition);
  };

  const handleGetNurition = async (id) => {
    let response = await getNutrition(id);
    setExistingNutrition(JSON.parse(response.data.nutritionData));
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

    console.log('payload', nutritionPayload);

    if (existingNutrition) {
      response = await updateNutrition(id, nutritionPayload);
    } else {
      response = await saveNutrition(id, nutritionPayload);
    }
    console.log('save response', response);

    setExistingNutrition(JSON.parse(response.data.nutritionData));
  };

  useEffect(() => {
    handleGetNurition(recipeId);
  }, []);

  return (
    <>
      {/* {existingNutrition ? (
        <DisplayNutritionData recipeNutrition={existingNutrition} />
      ) : ( */}
      <div>
        {nutritionCalulated ? (
          <>
            <button
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
            <button onClick={() => handleCalculateNutrition()}>
              calculateNutrition
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleLookupNutrition(recipeId)}>
              Get Nutrition
            </button>
            <button onClick={() => handleCalculateNutrition()}>
              calculateNutrition
            </button>
          </>
        )}
        {recipeNutrition ? (
          <div className="nutrition-calculator-refactor">
            <div>
              <IngredientNutrition
                ingredients={ingredients}
                recipeNutrition={recipeNutrition}
                setRecipeNutrition={setRecipeNutrition}
              />
            </div>
            <DisplayNutritionData
              recipeNutrition={recipeNutrition.totalNutrition}
            />
          </div>
        ) : // <DisplayNutritionData nutrition={newNutrition} />
        null}
      </div>
      {/* )} */}
    </>
  );
}
