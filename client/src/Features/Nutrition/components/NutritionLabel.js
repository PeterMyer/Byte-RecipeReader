import { buildLabelData } from '../utils/buildLabelData';

export function NutritionLabel({ nutritionData, servings }) {
  const labelData = buildLabelData(nutritionData);
  return (
    <>
      <section className="nutrition-label">
        <header className="nutrition-label-header">
          <h1 className="nutrition-label-title">Nutrition Facts</h1>
          <div>Servings {servings}</div>
          <div>{/* <b>Serving Size{placeholder}</b> */}</div>
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
              <td id="calorie-int-box">{labelData.calories.amount}</td>
            </tr>
            <tr className="thick-row">
              <td colspan="3">
                <b>% Daily Value*</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Total Fat</b> {labelData.totalFat.amount}
              </th>
              <td>
                <b>{labelData.totalFat.DV}%</b>
              </td>
            </tr>
            <tr>
              <td className="blank-cell"></td>
              <th>Saturated Fat {labelData.saturatedFat.amount}</th>
              <td>{<b>{labelData.saturatedFat.DV}%</b>}</td>
            </tr>
            <tr>
              <td class="blank-cell"></td>
              <th>Trans Fat {labelData.transFat.amount}</th>
              <td></td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Cholesterol</b> {labelData.cholesteral.amount}
              </th>
              <td>
                <b>{labelData.cholesteral.DV}%</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Sodium</b> {labelData.sodium.amount}
              </th>
              <td>
                <b>{labelData.sodium.DV}%</b>
              </td>
            </tr>
            <tr>
              <th colSpan="2">
                <b>Total Carbohydrate</b> {labelData.totalCarbs.amount}
              </th>
              <td>
                <b>{labelData.totalCarbs.DV}%</b>
              </td>
            </tr>
            <tr>
              <td className="blank-cell"></td>
              <th>Dietary Fiber {labelData.dietaryFibers.amount}</th>
              <td>
                <b>{labelData.dietaryFibers.DV}%</b>
              </td>
            </tr>
            <tr>
              <td class="blank-cell"></td>
              <th>Total Sugars {labelData.sugars.amount}</th>
            </tr>
            <tr class="thick-end">
              <th colspan="2">
                <b>Protein</b> {labelData.sugars.amount}
              </th>
              <td></td>
            </tr>
            <tr>
              <th colSpan="2">Vitamin D {labelData.vitaminD.amount}</th>
              <td>{labelData.vitaminD.DV}%</td>
            </tr>
            <tr>
              <th colSpan="2">Calcium {labelData.calcium.amount}</th>
              <td>{labelData.calcium.DV}%</td>
            </tr>
            <tr>
              <th colSpan="2">Iron {labelData.iron.amount}</th>
              <td>{labelData.iron.DV}%</td>
            </tr>
            <tr className="row-end">
              <th colSpan="2">Potassium {labelData.pottassium.amount}</th>
              <td>{labelData.pottassium.DV}%</td>
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
