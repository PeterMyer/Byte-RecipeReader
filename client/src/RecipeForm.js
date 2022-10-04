
export default function RecipeForm(){
    return(
    <div>
        <form>
            <div>
                <input
                    type="text"
                    name = "Name"
                    placeholder = "Recipe Name"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="servings"
                    placeholder="Servings"/>
                <input
                    type="text"
                    name="instructions"
                    placeholder="Instructions"
                />
                <input
                    type="text"
                    name="ingredients"
                    placeholder="Ingredients"
                />
                <input
                type="text"
                name="nutrition"
                placeholder="Nutrition"/>

            </div>
        </form>
    </div>
)}