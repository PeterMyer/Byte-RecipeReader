import React from 'react';
import { NewIngredientForm } from './NewIngredientForm';

// export function NewIngredientPanel(props) {
export function NewIngredientPanel({
  onClose,
  showPanel,
  form,
  recipeNutrition,
  setForm,
  setRecipeNutrition,
}) {
  const handleClick = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
    onClose();
  };

  return (
    <>
      <section
        className={`Panel ${showPanel ? 'Show' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <strong>Create New Ingredient</strong>
          <button onClick={handleClick}>X</button>
        </header>
        <div className="panel-body">
          <NewIngredientForm
            form={form}
            setForm={setForm}
            recipeNutrition={recipeNutrition}
            onClose={onClose}
            setRecipeNutrition={setRecipeNutrition}
          />
        </div>
      </section>
      <div
        className={`Overlay ${showPanel ? 'Show' : ''}`}
        onClick={() => onClose()}
      />
    </>
  );
}
