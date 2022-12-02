import React, {useState} from 'react'
import ImgCropper from './ImgCropper'
import ImgUpload from './ImgUpload'


export default function ImgModal(props){
    let modalUse = "default"
    let imgSrc = props.imgSrc
    let upload = props.upload
    const setUpload = props.setUpload
    let setShow = props.setShow
    const images = props.images
    const setImages = props.setImages
    const [edit, setEdit] = useState(false)
    
    if(!props.show){
        return null
    }

    const handleClose=()=>{
        props.onClose()
        setEdit(false)
        setUpload(false)
    }

    const renderSwitch = (modalUse,edit,upload) => {
        if(edit){
            modalUse = "edit"
        }
        else if(upload){
            modalUse=  "upload"
        }
        switch(modalUse){
            case 'edit':
                return(
                    < ImgCropper className = "modal-img-container" 
                    imgData={imgSrc}
                    setShow = {setShow}
                    images = {images}
                    setImages = {setImages}/> 
                )
            case 'upload':
                return(
                    <ImgUpload 
                    setShow = {setShow}
                    images = {images}
                    setImages = {setImages}/>
                )
            default:
                return(
                    <div className = "modal-img-container">
                        <img id="img" src = {imgSrc.imgBlob} alt = "uploadedImage"/>
                    </div>
                )
        }
    }

    return(
        <div className = "modal" onClick={handleClose}>
            <div className = "modal-content" onClick={e => e.stopPropagation()}>
                <header className = "modal-header">
                    {edit===true||upload===true ? null: (<button onClick={()=>setEdit(true)} className = "modal-button"><i class="fa-sharp fa-solid fa-crop-simple"></i></button>)}
                    <button onClick={handleClose} className = "modal-button"><i class="fa-solid fa-x"></i></button>
                </header>
                <div className = "modal-body">
                    {renderSwitch(modalUse,edit, upload)}
                </div>
                <footer className = "modal-footer">
                </footer>
            </div>
        </div>
    )
}