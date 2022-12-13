import React, {useState, useEffect, useRef} from 'react'
import ImgCropper from './ImgCropper'
import ImgUpload from './ImgUpload'
import { fabric } from 'fabric'

export default function ImgModal(props){
    const [modalUse,setModalUse] = useState('default')
    let imgSrc = props.imgSrc
    let upload = props.upload
    const setUpload = props.setUpload
    let setShow = props.setShow
    const images = props.images
    const setImages = props.setImages
    const [edit, setEdit] = useState(false)
    const [section, setSection] = useState(null)
    const [name, setName] = useState(false)
    const [instructions, setInstructions] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [croppedCoordinates, setCroppedCoordinates] = useState([])

    useEffect(()=>{
        const imgElement = document.getElementById('recipe-img')
        const imgInstance = new fabric.Image(imgElement)
        let height
        let width

        if(imgInstance.height>=imgInstance.width){
            height = 600
            imgInstance.scaleToHeight(height)
            width = imgInstance.getScaledWidth()
        } else {
            width = (480)
            imgInstance.scaleToWidth(width)
            height = imgInstance.getScaledHeight()
        }

        let canvas = new fabric.Canvas('canvas', 
        {
            width: width,
            height: height
        } 
        )
        canvas.setBackgroundImage(imgInstance, canvas.renderAll.bind(canvas),{
        })

        if(instructions.length > 0){
            instructions.forEach((ingredient)=>{
                const croppedCoordinates = ingredient.coordinates
                const rectX = croppedCoordinates.top
                const rectY = croppedCoordinates.left
                const rectWidth = croppedCoordinates.width
                const rectHeight = croppedCoordinates.height

                let rect = new fabric.Rect({
                    top: rectX,
                    left: rectY,
                    width: rectWidth,
                    height: rectHeight,
                    stroke : 'black',
                    strokeWidth : 3,
                    fill: 'rgba(0,0,0,0)'

                  })
                  canvas.add(rect)
            })
        }
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
        setModalUse('edit')
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
                        modalUse = {modalUse}
                        setModalUse = {setModalUse}
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
                    <div className = "modal-img-container" >
                        {/* https://stackoverflow.com/questions/21931271/how-to-enable-responsive-design-for-fabric-js */}
                        <div id = "fabric-canvas-wrapper">
                            <canvas id='canvas'></canvas>
                        </div>
                        <img id="recipe-img" src = {imgSrc.imgBlob} alt = "uploadedImage" hidden/>
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
                    {renderSwitch(modalUse,edit, upload, section)}
                </div>
                <footer className = "modal-footer">
                    <button onClick={()=>handleOpenEditor("instructions")} >Instructions</button>
                    <button>Ingredients</button>
                </footer>
            </div>
        </div>
    )
}