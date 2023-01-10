import FavRecipeIcon from "../../Assets/FavRecipeIcon.png"
import ImgCaptureIcon from "../../Assets/ImgCaptureIcon.png"
import MagnifyIcon from "../../Assets/MagnifyIcon.png"
import RecipeIcon from "../../Assets/RecipePageIcon.png"

 export default function Landing() {
	return(
		<article className = "landingPage-content">
			<header className = "landingPage-header">
				<h1 className = "landingPage-title">BYTE</h1>
				<h2>Recipe Reader</h2>
			</header>
			<section>
				<div className = "landingPage-icon-row">
					<div className = "landingPage-icon-container">
						<h3>Choose Your Favorite Recipes</h3>
						<img 
							width = "300px" 
							src = { FavRecipeIcon } 
							alt = "favRecipe"/>
					</div>
					<div className="landingPage-icon-container">
						<h3>Upload Images of <br/> Ingredients and Instructions</h3>
						<img 
							width = "250px" 
							src = { ImgCaptureIcon } 
							alt = "imgCaptureIcon"/>
					</div>
				</div>
				<div className="landingPage-icon-row">
					<div className="landingPage-icon-container">
						<h3>Parse Text From Images</h3>
						<img 
							width = "250px" 
							src={MagnifyIcon} 
							alt ="magnifyIcon"/>
					</div>
					<div className="landingPage-icon-container">
						<h3>Generate <br/> Recipe and Nutrition Info</h3>
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