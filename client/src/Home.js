
 export default function Home(){
    return(
        <article className="landingPage-content" >
            <div>
                <h1 className = "landingPage-title">BYTE</h1>
                <h2>The Recipe Reader</h2>
            </div>
            <div>
                <div className="landingPage-icon-row">
                    <div className="landingPage-icon-container">
                        <h3>Choose Your Favorite Recipes</h3>
                        <img width = "300px" src="favRecipeIcon.png"/>
                    </div>
                    <div className="landingPage-icon-container">
                        <h3>Upload Images of <br/> Ingredients and Instructions</h3>
                        <img width = "250px" src="ImgCaptureIcon.png"/>
                    </div>
                </div>
                <div className="landingPage-icon-row">
                    <div className="landingPage-icon-container">
                        <h3>Parse Text From Images</h3>
                        <img width = "250px" src="magnifyIcon.png"/>
                    </div>
                    <div className="landingPage-icon-container">
                        <h3>Generate <br/> Recipe and Nutrition Info</h3>
                        <img width = "250px" src="recipePageIcon.png"/>
                    </div>
                </div>
            </div>
        </article>
    )
}