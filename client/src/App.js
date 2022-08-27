
import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Recipe Reader!</h1>
      <Link to="/upload">Upload New Recipes</Link> |{" "}
      <Link to="/files">Your Files</Link>
    </div>

  );
}

export default App;
