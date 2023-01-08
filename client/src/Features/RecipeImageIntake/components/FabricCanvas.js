import React, {useEffect,useContext} from 'react'
import { fabric } from 'fabric'
import {Context} from './ImageProcessingContext'
import { useNavigate } from "react-router-dom";
import { createFabricCanvas } from '../utils/createFabricCanvas';
import { createCanvasObjects } from '../utils/createCanvasObjects';

export default function FabricCanvas(){
    const context = useContext(Context)
    const navigate = useNavigate();
    const result = context.result
    const setSection = context.setSection
    const setShowCropper = context.setShowCropper
    const width = context.width
    const height = context.height
    const setHeight = context.setHeight
    const setFabricCanvas = context.setFabricCanvas
    const cropObjects = context.cropObjects
    const setCropObjects = context.setCropObjects
    const recipeImg = context.recipeImg

    //Custom Delete Control to Fabric Prototype Chain - REF: http://fabricjs.com/custom-control-render //
    const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    let img = document.createElement('img');
    img.src = deleteIcon;

    function deleteSelection(eventData, transform) {
        let target = transform.target;
        let canvas = target.canvas;
        let selectionArray = canvas.getObjects().filter(obj=>obj.id===target.id)
        selectionArray.forEach(obj=>canvas.remove(obj))
        delete cropObjects[target.id]
        setCropObjects(cropObjects)
        canvas.requestRenderAll();
        const fabricCanvasCopy = canvas.toDataURL({
            format: 'png',
            multiplier: 2
        })
        canvas.sendToBack(canvas.backgroundImage)
        setFabricCanvas(fabricCanvasCopy)
    }  

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.drawImage(img, -size/2, -size/2, size, size);
        ctx.restore();
    }

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: .45,
        y: -.47,
        offsetY: 7,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteSelection,
        render: renderIcon,
        cornerSize: 18
    });
    //End Custom Delete Control 

    const handleSubmit = async()=>{
        let recipeOutput = {
            recipeSelections:[]
        }
        if(Object.keys(cropObjects).length>0){
            Object.values(cropObjects).forEach(selection=>{
                let obj = {
                    imgObjURL: selection.imgObjURL,
                    location: selection.location,
                    id: selection.id
                }
                recipeOutput.recipeSelections.push(obj)
            })
        }
        navigate('/parseImage',{state: {
            'recipeOutput':recipeOutput,
            'recipeImg':recipeImg
    }})
}

    const handleShowCropper = async (selectedSection)=>{
        setSection(selectedSection)
        setShowCropper(true) 
    }

    useEffect(()=>{
        const imgElement = document.getElementById('recipe-img')
        const fabricCanvas = createFabricCanvas(imgElement,setHeight, width)
        createCanvasObjects(fabricCanvas, cropObjects)
        createCanvasObjects(fabricCanvas, recipeImg)

        const fabricCanvasCopy = fabricCanvas.toDataURL({
                format: 'png',
                multiplier: 2
              }) 

        setFabricCanvas(fabricCanvasCopy)
        fabricCanvas.sendToBack(fabricCanvas.backgroundImage)
    })

    return(
    <>
        <div id = "recipe-canvas-container"className = "recipe-section-selection-container">
            <div className="section-selection-buttons-container">
                <button 
                    onClick={()=>handleShowCropper("instructions")}>
                    Instructions
                </button>
                <button 
                    onClick={()=>handleShowCropper("ingredients")}>
                    Ingredients
                </button>
                <button 
                    onClick={()=>handleShowCropper("image")}>
                    Image
                </button>
                <button 
                    id="section-submit-button" 
                    onClick={()=>handleSubmit()}>
                    Submit
                </button>
            </div>
            <div id="fabric-canvas" className="fabric-container" style = {{width: width, height:height}}>
                <div id = "fabric-canvas-wrapper">
                    <canvas id='canvas'/>
                </div>
                <img 
                    id="recipe-img" 
                    src = {result} 
                    alt = "uploadedImage" 
                    hidden 
                />
            </div>
        </div>
    </>  
    )
}