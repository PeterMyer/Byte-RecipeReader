import React, { useEffect} from 'react'
import { Link } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom";



export default function NavModal(props){
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick=(location)=>{
        props.onClose()
        navigate(location)
    }

    const handleClose=()=>{
        let fabricCanvas = Document.getElementById("fabric-canvas")
        fabricCanvas.style={"z-index":-1}
    }

    useEffect(()=>{
        props.onClose()
    },[location])

    if(!props.show){
        return null
    }

    return(
        <div id="nav-modal" className = "modal" onClick={()=>props.onClose()}>
            <div className = "modal-content" onClick={e => e.stopPropagation()}>
                <header className = "modal-header">
                    <strong>Create New Recipe</strong>
                    <button onClick={()=>props.onClose()}><i class="fa-solid fa-x"></i></button>
                </header>
                <div id="nav-modal-buttons-container" className = "modal-body">
                    <button onClick={()=>handleClick("/newRecipeForm")}>Create Manually</button>
                    <button onClick={()=>handleClick("/newRecipe")}>Create From Image</button>
            </div>
                <footer className = "modal-footer">
                </footer>
            </div>
        </div>
    )
}