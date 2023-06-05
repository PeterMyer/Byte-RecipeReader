import { Link } from 'react-router-dom';
import { AuthenticationButton } from '../../Features/Auth';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export default function NavBar() {
  const { isAuthenticated } = useAuth0();

  const showDropdown = () => {
    document.getElementById('createDropdown').classList.toggle('show-dropdown');
  };

  window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
      var myDropdown = document.getElementById('createDropdown');
      if (myDropdown.classList.contains('show-dropdown')) {
        myDropdown.classList.remove('show-dropdown');
      }
    }
  };

  return (
    <>
      <nav id="navbar">
        <div className="navbar-content">
          <div id="navbar-home-link-container">
            <Link to="/" id="navbar-home-link">
              BYTE
            </Link>
          </div>
          <div className="navbar-options-container">
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
          </div>
        </div>
      </nav>
    </>
  );
}
