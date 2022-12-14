import React, {useEffect,useContext} from 'react'
import { fabric } from 'fabric'
import {Context} from './CreateNewRecipe'


export default function FabricCanvas(){
    const context = useContext(Context)
    const result = context.result
    const setSection = context.setSection
    const showCropper = context.showCropper
    const setShowCropper = context.setShowCropper
    const instructions = context.instructions
    const width = context.width
    const height = context.height
    const setHeight = context.setHeight
    const setFabricCanvas = context.setFabricCanvas


    const handleOpenEditor = async (selectedSection)=>{
        setSection(selectedSection)
        setShowCropper(true)
    }

    useEffect(()=>{
        const imgElement = document.getElementById('recipe-img')
        const imgInstance = new fabric.Image(imgElement)
        imgInstance.scaleToWidth(width)
        let canvasHeight = imgInstance.getScaledHeight()

        let canvas = new fabric.Canvas('canvas', 
        {
            width: width,
            height: canvasHeight,
            preserveObjectStacking:true
        })
        canvas.setBackgroundImage(imgInstance, canvas.renderAll.bind(canvas),{
        })
        setHeight(canvasHeight)

        if(instructions.length > 0){
            instructions.forEach((ingredient)=>{
                const croppedCoordinates = ingredient.coordinates

                let rect = new fabric.Rect({
                    top: croppedCoordinates.top,
                    left: croppedCoordinates.left,
                    width: croppedCoordinates.width,
                    height: croppedCoordinates.height,
                    stroke : 'blue',
                    strokeWidth : 1,
                    fill: 'white',
                    opacity: .3,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true
                  })

                  let text = new fabric.Text(" Instructions ",{
                    left: croppedCoordinates.left,
                    top: croppedCoordinates.top,
                    textAlign: 'left',
                    fontSize:14,
                    width: 100,
                    textBackgroundColor :"white",
                    opacity: .7

                  })
                  canvas.add(rect)
                  canvas.add(text)
            })
        }
        const fabricCanvasCopy = canvas.toDataURL({
                format: 'png',
                multiplier: 2
              })
        canvas.sendToBack(canvas.backgroundImage)
        setFabricCanvas(fabricCanvasCopy)
    })

    return(    
    <div >
        {/* https://stackoverflow.com/questions/21931271/how-to-enable-responsive-design-for-fabric-js */}   
        <div className = "modal-img-container">
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
    </div>)
}