import { Route, Routes } from 'react-router-dom';
import { NutritionCalculator } from '../components/NutritionCalculator';

export const NutritionRoutes = () => {
  return (
    <Routes>
      <Route path="calculator/:recipeId" element={<NutritionCalculator />} />
    </Routes>
  );
};
