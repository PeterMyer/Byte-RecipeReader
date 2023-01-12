import { Link } from "react-router-dom"
import { AuthenticationButton } from "../../Features/Auth"
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react"
import NavModal from "./NavModal"
import ByteIcon from "../../Assets/ByteIcon.png"

export default function NavBar() {
  const [ show, setShow ] = useState( false )
  const { isAuthenticated } = useAuth0();
    return(
      <>
        <nav id = "navbar">
          <div className ="navbar-content">
            <div id = "navbar-home-link-container">
              <Link to = "/" id = "navbar-home-link">
                  BYTE
              </Link>
            </div>
            <div className="navbar-options-container">
            <div id = "navbar-options">
              {isAuthenticated ? 
              <>
                <Link 
                  to = "/recipes">
                  RECIPES
                </Link> 
                <button 
                  onClick = {() => setShow( true )}>
                  NEW RECIPE
                </button>
              </>
              :null}
            </div>
            <div id = "navbar-auth">
              <AuthenticationButton/>
            </div>
            <NavModal
              onClose = {() => setShow( false )} 
              show = { show }/>
            </div>
          </div>
        </nav>
      </>
      )
}