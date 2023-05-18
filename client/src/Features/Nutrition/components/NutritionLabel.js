export function NutritionLabel({ recipeNutrition }) {
  console.log('recipeNutrition:', recipeNutrition);
  let placeholder = ' X ';
  return (
    <>
      <section className="nutrition-label">
        <header className="nutrition-label-header">
          <h1 className="nutrition-label-title">Nutrition Facts</h1>
          <div>Servings {placeholder}</div>
          <div>
            <b>Serving Size{placeholder}</b>
          </div>
        </header>
        <table className="nutrition-label-table">
          <thead>
            {/* <tr>
              <th colspan="3" clasNames="small-info">
                <b>Amount Per Serving</b>
              </th>
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <th colspan="2">
                <div id="nutrition-label-calories-header">
                  <b>Amount Per Serving</b>
                  <div id="nutrition-label-calories-text">Calories</div>
                </div>
              </th>
              <td id="calorie-int-box">{placeholder}</td>
            </tr>
            <tr className="thick-row">
              <td colspan="3">
                <b>% Daily Value*</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Total Fat</b>
                {placeholder}
              </th>
              <td>
                <b>{placeholder}%</b>
              </td>
            </tr>
            <tr>
              <td className="blank-cell"></td>
              <th>
                Saturated Fat
                {placeholder}
              </th>
              <td>
                <b>{placeholder}%</b>
              </td>
            </tr>
            <tr>
              <td class="blank-cell"></td>
              <th>
                Trans Fat
                {placeholder}
              </th>
              <td></td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Cholesterol</b>
                {placeholder}
              </th>
              <td>
                <b>{placeholder}%</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Sodium</b>
                {placeholder}
              </th>
              <td>
                <b>{placeholder}%</b>
              </td>
            </tr>
            <tr>
              <th colSpan="2">
                <b>Total Carbohydrate</b>
                {placeholder}
              </th>
              <td>
                <b>{placeholder}%</b>
              </td>
            </tr>
            <tr>
              <td className="blank-cell"></td>
              <th>
                Saturated Fat
                {placeholder}
              </th>
              <td>
                <b>{placeholder}%</b>
              </td>
            </tr>
            <tr>
              <td class="blank-cell"></td>
              <th>
                Trans Fat
                {placeholder}
              </th>
            </tr>
            <tr class="thick-end">
              <th colspan="2">
                <b>Protein</b>
                {placeholder}
              </th>
              <td></td>
            </tr>
            <tr>
              <th colSpan="2">Vitamin D{placeholder}</th>
              <td>{placeholder}%</td>
            </tr>
            <tr>
              <th colSpan="2">
                Calcium
                {placeholder}
              </th>
              <td>{placeholder}%</td>
            </tr>
            <tr>
              <th colSpan="2">
                Iron
                {placeholder}
              </th>
              <td>{placeholder}%</td>
            </tr>
            <tr className="row-end">
              <th colSpan="2">
                Potassium
                {placeholder}
              </th>
              <td>{placeholder}%</td>
            </tr>
          </tbody>
        </table>
        <p className="small-info">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </p>
      </section>
    </>
  );
}
