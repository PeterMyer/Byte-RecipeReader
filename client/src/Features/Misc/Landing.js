import FavRecipeIcon from "../../Assets/FavRecipeIcon.png"
import ImgCaptureIcon from "../../Assets/ImgCaptureIcon.png"
import MagnifyIcon from "../../Assets/MagnifyIcon.png"
import RecipeIcon from "../../Assets/RecipePageIcon.png"
import HeroImage from "../../Assets/HeroImage.jpg"

 export default function Landing() {
	return(
		<article className = "landing-content">
			<section className = "landing-content-inner" > 
				<h1>Digitize Your Cookbooks</h1>
				{/* <div>Choose Your Favorite Recipes</div>
				<div>Upload Images of Ingredients and Instructions</div>
				<div>Scan Text From Images</div>
				<div>Generate Recipe and Nutrition Info</div> */}
			<button>Get Started</button>
			</section>
		</article>
	)
}