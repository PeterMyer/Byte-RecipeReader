import React, {useState,useEffect,useContext} from 'react'
import { fabric } from 'fabric'
import {Context} from './CreateNewRecipe'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";


export default function FabricCanvas(){
    const context = useContext(Context)
    const navigate = useNavigate();
    const { user } = useAuth0();
    const result = context.result
    const setSection = context.setSection
    const showCropper = context.showCropper
    const setShowCropper = context.setShowCropper
    const instructions = context.instructions
    const ingredients = context.ingredients
    const width = context.width
    const height = context.height
    const setHeight = context.setHeight
    const setFabricCanvas = context.setFabricCanvas
    const form = context.form
    const cropObjects = context.cropObjects
    const setCropObjects = context.setCropObjects
    const recipeImg = context.recipeImg

    //Create Custom Delete Icon - REF: http://fabricjs.com/custom-control-render
    const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    let img = document.createElement('img');
    img.src = deleteIcon;

    const handleSubmit = async()=>{
        let recipeOutput = {
            recipeSelections:[]
        }
        if(Object.keys(cropObjects).length>0){
            Object.values(cropObjects).forEach(cropObject=>{
                let obj = {
                    imgObjURL: cropObject.imgObjURL,
                    location: cropObject.location,
                    id: cropObject.id
                }
                recipeOutput.recipeSelections.push(obj)
            })
        }
        navigate('/readMany',{state: {
            'recipeOutput':recipeOutput,
            'recipeImg':recipeImg}})
    }

    const handleOpenEditor = async (selectedSection)=>{
        setSection(selectedSection)
        setShowCropper(true) 
    }

  function deleteObject(eventData, transform) {
    let target = transform.target;
    let canvas = target.canvas;
    let objectsArray = canvas.getObjects().filter(obj=>obj.id===target.id)
    objectsArray.forEach(obj=>canvas.remove(obj))
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

   const HideControls = {
        'tl':false,
        'tr':false,
        'bl':false,
        'br':false,
        'ml':false,
        'mt':false,
        'mr':false,
        'mb':false,
        'mtr':false
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
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 18
      });

    useEffect(()=>{
        const imgElement = document.getElementById('recipe-img')
        const imgInstance = new fabric.Image(imgElement)
        imgInstance.scaleToWidth(width)
        let canvasHeight = imgInstance.getScaledHeight()
        let canvas = new fabric.Canvas('canvas', 
            {
                width: width,
                height: canvasHeight,
                preserveObjectStacking:true,
                selectable:false
            })
        canvas.setBackgroundImage(imgInstance, canvas.renderAll.bind(canvas),{
            selectable:false
        })
        setHeight(canvasHeight)
        if(Object.keys(cropObjects).length > 0){
            Object.values(cropObjects).forEach((cropObject)=>{
                const croppedCoordinates = cropObject.coordinates
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
                    lockScalingY: true,
                    lockRotation: true,
                    id:cropObject.id
                  })

                  let text = new fabric.Text(` ${cropObject.location} `,{
                    left: croppedCoordinates.left,
                    top: croppedCoordinates.top,
                    textAlign: 'left',
                    fontSize:14,
                    width: 100,
                    textBackgroundColor :"white",
                    opacity: .7,
                    selectable:false,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockRotation: true,
                    id:cropObject.id
                  })
                  rect.setControlsVisibility(HideControls)
                  canvas.add(rect)
                  canvas.add(text)
            })
        }
        if(Object.keys(recipeImg).length > 0){
            Object.values(recipeImg).forEach((cropObject)=>{
                console.log('cropObject',cropObject)
                const croppedCoordinates = cropObject.coordinates
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
                    lockScalingY: true,
                    lockRotation: true,
                    id:cropObject.id
                  })

                  let text = new fabric.Text(` ${cropObject.location} `,{
                    left: croppedCoordinates.left,
                    top: croppedCoordinates.top,
                    textAlign: 'left',
                    fontSize:14,
                    width: 100,
                    textBackgroundColor :"white",
                    opacity: .7,
                    selectable:false,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockRotation: true,
                    id:cropObject.id
                  })
                  rect.setControlsVisibility(HideControls)
                  canvas.add(rect)
                  canvas.add(text)
            })
        }

        const fabricCanvasCopy = canvas.toDataURL({
                format: 'png',
                multiplier: 2
              })
        
              
        setFabricCanvas(fabricCanvasCopy)
        canvas.sendToBack(canvas.backgroundImage)

    })

    return(
    <>
        <div id = "recipe-canvas-container"className = "recipe-section-selection-container">
            <div className="section-selection-buttons-container">
                <button onClick={()=>handleOpenEditor("instructions")}>Instructions</button>
                <button onClick={()=>handleOpenEditor("ingredients")}>Ingredients</button>
                <button onClick={()=>handleOpenEditor("image")}>Image</button>
                <button id="section-submit-button" onClick={()=>handleSubmit()}>Submit</button>

            </div>
            <div id="fabric-canvas" className="fabric-container" style = {{width: width, height:height}}>
                <div id = "fabric-canvas-wrapper">
                    <canvas id='canvas'></canvas>
                </div>
                <img id="recipe-img" src = {result} alt = "uploadedImage" hidden />
            </div>
        </div>
    </>  )
}