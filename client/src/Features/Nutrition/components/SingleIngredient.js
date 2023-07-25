import React, { useState, useEffect } from 'react';

export const SingleIngredient = ({ ingredient }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 1000;

  useEffect(() => {
    const windowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', windowResize);

    return () => window.removeEventListener('resize', windowResize);
  }, []);

  function truncate(str, n) {
    return str.length > n ? <>{str.slice(0, n - 1)}&hellip;</> : str;
  }

  function IngredientComment() {
    return (
      <>
        {width < breakPoint
          ? ingredient.recipeComment.commentText
          : `, ${ingredient.recipeComment.commentText}`}
      </>
    );
  }

  return (
    <div className="ingredient-input-text-container">
      <div className="input-line">
        <strong>
          {ingredient.measurementQuantity?.qtyAmount}{' '}
          {ingredient.measurementUnit.unitDescription}{' '}
          {ingredient.component.name}
        </strong>
        <div className="input-line-comment">
          {ingredient.recipeComment.commentText ? <IngredientComment /> : <></>}
        </div>
      </div>
    </div>
  );
};
