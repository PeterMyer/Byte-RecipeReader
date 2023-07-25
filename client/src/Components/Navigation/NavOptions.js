import { Link } from 'react-router-dom';
import { AuthenticationButton } from '../../Features/Auth';

export default function NavOptions({ isAuthenticated }) {
  const showDropdown = () => {
    document.getElementById('createDropdown').classList.toggle('show-dropdown');
  };

  window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
      let myDropdown = document.getElementById('createDropdown');
      if (myDropdown.classList.contains('show-dropdown')) {
        myDropdown.classList.remove('show-dropdown');
      }
    }
  };

  return (
    <>
      <div id="navbar-options">
        {isAuthenticated ? (
          <>
            <Link to="/recipes">Recipes</Link>
            <div className="dropdown">
              <button class="dropbtn" onClick={showDropdown}>
                Create Recipe <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-content" id="createDropdown">
                <Link to="/recipeForm/new">Create Manually</Link>
                <Link to="/recipeImageIntake">Create From Image</Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div id="navbar-auth">
        <AuthenticationButton />
      </div>
    </>
  );
}
