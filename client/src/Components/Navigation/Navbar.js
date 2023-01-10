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
            <div>
              <Link to = "/">
                <img 
                  src = { RRIcon } 
                  alt = "Byte Icon" 
                  id = "navbar-icon"/>
              </Link>
            </div>
            <div id = "navbar-options">
              <Link 
                to = "/recipes">
                Recipes
              </Link> 
              <button 
                onClick = {() => setShow( true )}>
                New Recipe
              </button>
            </div>
            <div id = "navbar-auth">
              <AuthenticationButton/>
            </div>
            <NavModal
              onClose = {() => setShow( false )} 
              show = { show }/>
          </div>
        </nav>
      </>
      )
}