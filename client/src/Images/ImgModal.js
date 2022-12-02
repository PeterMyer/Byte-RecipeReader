import React, {useState, useEffect} from 'react'
import ImgCropper from './ImgCropper'
import ImgUpload from './ImgUpload'
import { fabric } from 'fabric'

export default function ImgModal(props){
    let modalUse = "default"
    let imgSrc = props.imgSrc
    let upload = props.upload
    const setUpload = props.setUpload
    let setShow = props.setShow
    const images = props.images
    const [canvas, setCanvas] = useState(null)
    const setImages = props.setImages
    const [edit, setEdit] = useState(false)
    const [section, setSection] = useState(null)
    const [name, setName] = useState(false)
    const [instructions, setInstructions] = useState([])
    const [ingredients, setIngredients] = useState([])


    useEffect(()=>{
        const imgElement = document.getElementById('recipe-img')
        const imgInstance = new fabric.Image(imgElement)
        let height
        let width

        if(imgInstance.height>=imgInstance.width){
            height = (window.innerHeight * .75)
            imgInstance.scaleToHeight(height)
            width = imgInstance.getScaledWidth()
        } else {
            width = (window.innerWidth * .90)
            imgInstance.scaleToWidth(width)
            height = imgInstance.getScaledHeight()
        }

        let canvas = new fabric.Canvas('canvas', 
        {
            width:width,
            height: height
        }
        )
        canvas.setBackgroundImage(imgInstance, canvas.renderAll.bind(canvas),{
        })
    })

    if(!props.show){
        return null
    }

    // window.onresize = function(){
    //     console.log('resize')
    //     const outerCanvasContainer = document.getElementById('fabric-canvas-wrapper');
    //     console.log(outerCanvasContainer)
    //     const ratio          = canvas.getWidth() / canvas.getHeight();
    //     const containerWidth = outerCanvasContainer.clientWidth;
    //     const scale          = containerWidth / canvas.getWidth();
    //     const zoom           = canvas.getZoom() * scale;
    
    //     canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
    //     canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0])};

    const handleClose=()=>{
        props.onClose()
        setEdit(false)
        setUpload(false)
    }

    const handleOpenEditor = async (selectedSection)=>{
        setSection(selectedSection)
        setEdit(true)
    }

    const renderSwitch = (modalUse,edit,upload, section) => {
        if(edit){
            modalUse = "edit"
        }
        else if(upload){
            modalUse=  "upload"
        }
        switch(modalUse){
            case 'edit':
                return(
                    < ImgCropper 
                        className = "modal-img-container" 
                        imgData={imgSrc}
                        setShow = {setShow}
                        images = {images}
                        setImages = {setImages}
                        section = {section}
                        instructions = {instructions}
                        setInstructions = {setInstructions}
                        ingredients = {ingredients}
                        setIngredients = {setIngredients}
                    />
                )
            case 'upload':
                return(
                    <ImgUpload 
                        setShow = {setShow}
                        images = {images}
                        setImages = {setImages}
                    />
                )
            default:
                return(
                    <>
                    </>
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
                    {renderSwitch(modalUse,edit, upload, section)}
                    <div className = "modal-img-container" >
                        {/* https://stackoverflow.com/questions/21931271/how-to-enable-responsive-design-for-fabric-js */}
                        <div id = "fabric-canvas-wrapper">
                            <canvas id='canvas'></canvas>
                        </div>
                        <img id="recipe-img" src = {imgSrc.imgBlob} alt = "uploadedImage" hidden/>
                    </div>
                </div>
                <footer className = "modal-footer">
                    <button onClick={()=>handleOpenEditor("instructions")} >Instructions</button>
                    <button>Ingredients</button>
                </footer>
            </div>
        </div>
    )
}