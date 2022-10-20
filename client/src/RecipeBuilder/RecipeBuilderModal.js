import React from 'react'

export default function Modal(props){
    let imgSrc = props.imgSrc
    let setShow = props.setShow

    if(!props.show){
        return null
    }

    const handleClose=()=>{
        props.onClose()

    }

    return(
        <div className = "modal" onClick={handleClose}>
            <div className = "modal-content" onClick={e => e.stopPropagation()}>
                <header className = "modal-header">
                    <button onClick={handleClose} className = "modal-button"><i class="fa-solid fa-x"></i></button>
                </header>
                <div className = "modal-body">
                <div className = "modal-img-container">
                        <img id="img" src = {imgSrc} alt = "uploadedImage"/>
                    </div>
                </div>
                <footer className = "modal-footer">
                </footer>
            </div>
        </div>
    )
}