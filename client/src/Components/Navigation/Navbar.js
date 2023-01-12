import { Link } from "react-router-dom"
import { AuthenticationButton } from "../../Features/Auth"
import { useState } from "react"
import NavModal from "./NavModal"
import RRIcon from "../../Assets/RRIcon.png"

export default function NavBar() {
  const [ show, setShow ] = useState( false )
    return(
      <>
        <nav id = "navbar">
          <div className ="navbar-content">
            <div id = "navbar-home-link-container">
              <Link to = "/" id = "navbar-home-link">
                {/* <img 
                  src = { RRIcon } 
                  alt = "Byte Icon" 
                  id = "navbar-icon"/> */}
                  BYTE
              </Link>
            </div>
            <div className="navbar-options-container">
            <div id = "navbar-options">
              <Link 
                to = "/recipes">
                RECIPES
              </Link> 
              <button 
                onClick = {() => setShow( true )}>
                NEW RECIPE
              </button>
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