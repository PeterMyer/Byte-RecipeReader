import React from "react"

export const DisplayNutritionData = ({ nutrition }) => {
	return(
		<>
			<h3>Per Serving</h3>
			<div id="nutrient-display-container">
			{
				Object.entries( nutrition ).map(([ nutrient, value ])=> {
					return(
						<div className = "nutrient-display">  
								{ nutrient === "Energy" ?
									<>
										<strong className = "nutrient-name" id = "calories-display">
											Calories:
										</strong>
										<div className = "nutrient-value" id = "calories-display-value"> 
												{ Math.round( value.amount * 100 ) / 100 } { value.unit }
										</div>
									</>
								:
								<>
									<div className = "nutrient-name">
										{ nutrient }:
									</div>
								
									<div className = "nutrient-value"> 
											{ Math.round( value.amount * 100 ) / 100 } { value.unit }
									</div>
								</>
							}
						</div>
					)
				})
			}
			</div>
		</>
	)
}