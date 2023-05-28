import React from 'react';

export const SingleIngredient = ({ ingredient }) => {
  return (
    <div className="ingredient-input-text-container">
      <div className="input-line">
        <strong>
          {ingredient.measurementQuantity?.qtyAmount}{' '}
          {ingredient.measurementUnit.unitDescription}{' '}
          {ingredient.component.name}
        </strong>
        <div className="input-line-comment">
          {ingredient.recipeComment.commentText ? (
            `, ${ingredient.recipeComment.commentText}`
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
