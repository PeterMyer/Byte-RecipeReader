import React from 'react';
import { NewIngredientForm } from './NewIngredientForm';

export function NewIngredientPanel(props) {
  const handleClick = () => {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
    props.onClose();
  };

  return (
    <>
      <section
        className={`Panel ${props.showPanel ? 'Show' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <strong>Create New Ingredient</strong>
          <button onClick={handleClick}>X</button>
        </header>
        <div className="panel-body">
          <NewIngredientForm onClose={props.onClose} />
        </div>
      </section>
      <div
        className={`Overlay ${props.showPanel ? 'Show' : ''}`}
        onClick={() => props.onClose()}
      />
    </>
  );
}
