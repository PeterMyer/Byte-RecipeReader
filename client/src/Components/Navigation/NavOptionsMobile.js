import { Link } from 'react-router-dom';
import { AuthenticationButton } from '../../Features/Auth';

export default function NavOptionsMobile({ isAuthenticated }) {
  window.onclick = null;

  const handleExpand = (id) => {
    let x = document.getElementById(id);
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  };

  const handleClose = () => {
    let x = document.getElementById('mobiledropdown');
    x.style.display = 'none';
    x = document.getElementById('create-recipe');
    x.style.display = 'none';
  };

  return (
    <>
      <div id="mobiledropdown">
        {isAuthenticated ? (
          <div id="mobileNavLinks">
            <Link to="/recipes" onClick={handleClose}>
              Recipes
            </Link>
            <button onClick={() => handleExpand('create-recipe')}>
              Create Recipe
            </button>
            <div id="create-recipe">
              <Link to="/recipeForm/new" onClick={handleClose}>
                Manually
              </Link>
              <Link to="/recipeImageIntake" onClick={handleClose}>
                From Image
              </Link>
            </div>
          </div>
        ) : null}
        <AuthenticationButton />
      </div>
      <button id="icon" onClick={() => handleExpand('mobiledropdown')}>
        <i class="fa-solid fa-bars fa-2xl"></i>
      </button>
    </>
  );
}
