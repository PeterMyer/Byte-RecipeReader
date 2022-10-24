import { Link } from "react-router-dom"

export default function NavBar(){
    return(
      <>
        <nav id = "NavBar">
          <div>
            <Link to ="/">
              <img 
                id = "navbar-icon"
                alt = "defeaultImg"
                src = {process.env.PUBLIC_URL + "/RRIcon.png"}/>
            </Link>
          </div>
          <div id = "navbar-options">
            <Link to="/recipes">Recipes</Link> 
            <Link to="/files">Images</Link> 
            <Link to="/newRecipeImages">Create Recipe</Link> 
          </div>
        </nav>
      </>)

}