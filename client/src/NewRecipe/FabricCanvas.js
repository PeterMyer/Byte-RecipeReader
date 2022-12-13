import React, {useEffect} from 'react'
import { fabric } from 'fabric'

export default function FabricCanvas(props){
    const result = props.result

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
    })


    return(    
    <>
        {/* https://stackoverflow.com/questions/21931271/how-to-enable-responsive-design-for-fabric-js */}   
        <div className = "modal-img-container" >
            <div id = "fabric-canvas-wrapper">
                <canvas id='canvas'></canvas>
            </div>
            <img id="recipe-img" src = {result} alt = "uploadedImage" hidden />
        </div>
    </>)
}