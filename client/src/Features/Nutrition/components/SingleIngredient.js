import React from 'react';

export const SingleIngredient = ({ ingredient }) => {
  return (
    <>
      <div className="ingredient-container-refactor">
        <div>
          <div className="input-line">
            <div>
              "{ingredient.measurementQuantity?.qtyAmount}{' '}
              {ingredient.measurementUnit.unitDescription}{' '}
              {ingredient.component.name}"
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
