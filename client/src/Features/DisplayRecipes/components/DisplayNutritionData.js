import React from "react"

export const DisplayNutritionData = ({nutrition}) => {
    return (
    <div>
        <h3>Per Serving</h3>
        {
            Object.entries(nutrition).map(([nutrient, value])=> {
                return(
                    <div className = 'nutrient-display'>  
                        {nutrient==='Energy'?
                            <strong className= "nutrient-name">Calories:</strong>:
                            <strong className= "nutrient-name">{nutrient}:</strong>}
                        <div className="nutrient-value" > {Math.round(value*100)/100}</div>
                    </div>
                )
        })
        }
    </div>
)
}