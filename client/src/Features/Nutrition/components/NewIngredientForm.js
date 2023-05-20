import { useForm } from 'react-hook-form';

export function NewIngredientForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <section>
      <h3>Add New Ingredient</h3>
      <form className="new-ingredient-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" value="Save Ingredient"></input>
        <label>
          Ingredient Name:
          <input {...register('name')}></input>
        </label>
        <label>
          Calories:
          <input {...register('calories')}></input>
        </label>
        <label>
          Total Fat:
          <input {...register('totalFat')}></input>
        </label>
        <label>
          Saturated Fat:
          <input {...register('saturatedFat')}></input>
        </label>
        <label>
          Trans Fat:
          <input {...register('trasFat')}></input>
        </label>
        <label>
          Cholesterol:
          <input {...register('cholesterol')}></input>
        </label>
        <label>
          Sodium:
          <input {...register('sodium')}></input>
        </label>
        <label>
          Total Carbohydrate:
          <input {...register('carbohydrate')}></input>
        </label>
        <label>
          Dietary Fiber:
          <input {...register('fiber')}></input>
        </label>
        <label>
          Sugars:
          <input {...register('sugar')}></input>
        </label>
        <label>
          Protien:
          <input {...register('protien')}></input>
        </label>
        <label>
          Vitamen D:
          <input {...register('vitamenD')}></input>
        </label>
        <label>
          Calcium:
          <input {...register('calcium')}></input>
        </label>
        <label>
          Iron:
          <input {...register('iron')}></input>
        </label>
        <label>
          Potassium:
          <input {...register('potassium')}></input>
        </label>
      </form>
    </section>
  );
}
