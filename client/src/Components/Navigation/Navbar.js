import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationButton } from '../../Features/Auth';
import { useAuth0 } from '@auth0/auth0-react';
import NavOptions from './NavOptions';
import NavOptionsMobile from './NavOptionsMobile';

export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 700;

  useEffect(() => {
    const windowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', windowResize);
    return () => window.removeEventListener('resize', windowResize);
  }, []);

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
            {width < breakPoint ? (
              <NavOptionsMobile isAuthenticated={isAuthenticated} />
            ) : (
              <NavOptions isAuthenticated={isAuthenticated} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
