import React from "react"
import { VerifyTextEditor } from "./VerifyTextEditor"

export const ImgTextComparison = ( props ) => {
	const recipeData = props.recipeData
	const location = props.location

	return(
		<section className = "recipeSegment-container">
			{ recipeData.filter(( imgObj ) =>
				imgObj.location === location).map(( imgObj ) => {
					return(
						<div className = "recipeSegment">
							<VerifyTextEditor 
								readImgText = { imgObj.OcrResult.data.text }
								recipeId = { imgObj.id }/>
							<img
								src = { imgObj.imgObjURL }
								alt = "null"
								className = "recipeImg"/>
						</div>
					)
				})
			}
		</section> 
	) 
}