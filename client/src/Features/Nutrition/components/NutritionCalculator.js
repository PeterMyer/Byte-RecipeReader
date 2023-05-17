import { useState, useEffect } from 'react';
import { calculateNutrition } from '../utils/calculateNutrition';
import { DisplayNutritionData } from './DisplayNutritionData';
import { lookupNutrition, getNutrition, saveNutrition } from '../api';
import { useLocation } from 'react-router-dom';
import { IngredientNutrition } from './IngredientNutrition';
import { updateNutrition } from '../api/updateNutrition';

export function NutritionCalculator() {
  const { state } = useLocation();
  const recipeId = state.recipeId;
  const servings = state.servings;
  const ingredients = state.ingredients;
  const [recipeNutrition, setRecipeNutrition] = useState(null);
  const [existingNutrition, setExistingNutrition] = useState(null);
  const [nutritionCalulated, toggleNutritionCalulated] = useState(false);
  const [USDANutrition, setUSDANutrition] = useState(null);

  const handleLookupNutrition = async (id) => {
    let nutrition = await lookupNutrition(id);
    console.log('API Complete');
    setUSDANutrition(nutrition.data);
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

  const handleSaveNutrition = async (id, totalNutrition) => {
    let response = null;
    let nutritionPayload = {
      nutrition: JSON.stringify(totalNutrition),
    };

    if (existingNutrition) {
      response = await updateNutrition(id, nutritionPayload);
    } else {
      response = await saveNutrition(id, nutritionPayload);
    }

    setExistingNutrition(JSON.parse(response.data.nutritionData));
  };

  useEffect(() => {
    handleGetNurition(recipeId);
  }, []);

  return (
    <>
      {existingNutrition ? (
        <DisplayNutritionData nutrition={existingNutrition} />
      ) : (
        <div>
          {nutritionCalulated ? (
            <>
              <button
                onClick={() =>
                  handleSaveNutrition(recipeId, recipeNutrition.totalNutrition)
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
                recipeNutrition={recipeNutrition}
                nutrition={recipeNutrition.totalNutrition}
              />
            </div>
          ) : // <DisplayNutritionData nutrition={newNutrition} />
          null}
        </div>
      )}
    </>
  );
}
