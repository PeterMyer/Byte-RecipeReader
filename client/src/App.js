
import './App.css';
import { Link } from "react-router-dom";


function App() {
  return (
    <div>
      <div>
        <h1>Recipe Reader!</h1>
        <Link to="/upload">Upload New Images</Link> |{" "}
        <Link to="/recipes">Your Recipes</Link> |{" "}
        <Link to="/files">Your Uploaded Files</Link> | {" "}
        <Link to="/newRecipeImages">Create New Recipe</Link> 
      </div>
        <div>
        </div>
  </div>

  );
}

export default App;
