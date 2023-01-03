import { Link } from "react-router-dom"
import {AuthenticationButton} from "../Features/Auth"
import { useAuth0 } from "@auth0/auth0-react";
import {useState} from 'react'
import NavModal from './NavModal'


export default function NavBar(){
  const [show, setShow] = useState(false)
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
            <button onClick={()=> setShow(true)}>New Recipe</button>
          </div>
          <div id="navbar-auth">
            <AuthenticationButton />
          </div>
          <NavModal
            onClose={() => setShow(false)} 
            show={show}
          />
        </nav>
      </>
      )
}