import { Link } from "react-router-dom"

 export default function Landing() {
	return(
		<article className = "landing-content">
			<section className = "landing-content-inner" > 
				<h1>Digitize Your Cookbooks</h1>
			<Link to = "/recipes">Get Started</Link>
			</section>
		</article>
	)
}