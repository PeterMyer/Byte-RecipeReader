import FavRecipeIcon from "../../Assets/FavRecipeIcon.png"
import ImgCaptureIcon from "../../Assets/ImgCaptureIcon.png"
import MagnifyIcon from "../../Assets/MagnifyIcon.png"
import RecipeIcon from "../../Assets/RecipePageIcon.png"

 export default function Landing() {
	return(
		<article className = "landingPage-content">
			<section>
				<div className = "landingPage-icon-row">
					<div className = "landingPage-icon-container">
						<div>Choose Your Favorite Recipes</div>
						<img 
							width = "300px" 
							src = { FavRecipeIcon } 
							alt = "favRecipe"/>
					</div>
					<div className="landingPage-icon-container">
						<div>Upload Images of <br/> Ingredients and Instructions</div>
						<img 
							width = "250px" 
							src = { ImgCaptureIcon } 
							alt = "imgCaptureIcon"/>
					</div>
				</div>
				<div className="landingPage-icon-row">
					<div className="landingPage-icon-container">
						<div>Parse Text From Images</div>
						<img 
							width = "250px" 
							src={MagnifyIcon} 
							alt ="magnifyIcon"/>
					</div>
					<div className="landingPage-icon-container">
						<div>Generate <br/> Recipe and Nutrition Info</div>
						<img 
							width = "250px" 
							src={RecipeIcon} 
							alt = "recipeIcon"/>
					</div>
				</div>
			</section>
		</article>
	)
}