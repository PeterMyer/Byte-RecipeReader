
export const DisplayIngredients=({ingredients})=>{
    return(
        <ul id="recipie-display-ingredient-list">
            {ingredients.map(
                (ingredient)=>{
                    return(<li>{ingredient.recipeIngredient.text}</li>)})}
        </ul>
    )
}