import React, {useEffect,useContext} from 'react'
import { fabric } from 'fabric'
import {Context} from './CreateNewRecipe'


export default function FabricCanvas(){
    const context = useContext(Context)
    const result = context.result
    const setSection = context.setSection
    const setShowCropper = context.setShowCropper

    const handleOpenEditor = async (selectedSection)=>{
        setSection(selectedSection)
        setShowCropper(true)
    }

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
            //may not be necessary
            width: width,
            height: height
        })
        canvas.setBackgroundImage(imgInstance, canvas.renderAll.bind(canvas),{
        })
    },[result])

    return(    
    <>
        {/* https://stackoverflow.com/questions/21931271/how-to-enable-responsive-design-for-fabric-js */}   
        <div className = "modal-img-container" >
            <div id = "fabric-canvas-wrapper">
                <canvas id='canvas'></canvas>
            </div>
            <img id="recipe-img" src = {result} alt = "uploadedImage" hidden />
        </div>
        <div>
            <button>Name</button>
            <button onClick={()=>handleOpenEditor("instructions")}>Instructions</button>
            <button>Ingredients</button>
        </div>

    </>)
}