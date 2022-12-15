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

    useEffect(()=>{
        props.onClose()
    },[location])

    if(!props.show){
        return null
    }

    return(
        <div className = "modal" onClick={()=>props.onClose()}>
            <div className = "modal-content" onClick={e => e.stopPropagation()}>
                <header className = "modal-header">
                    <button onClick={()=>props.onClose()} className = "modal-button"><i class="fa-solid fa-x"></i></button>
                </header>
                <div className = "modal-body">
                    <button onClick={()=>handleClick("/newRecipeForm")}>Create Manually</button>
                    <button onClick={()=>handleClick("/newRecipe")}>Create From Image</button>
            </div>
                <footer className = "modal-footer">
                </footer>
            </div>
        </div>
    )
}