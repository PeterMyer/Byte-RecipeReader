import React, {useEffect,useContext} from 'react'
import { fabric } from 'fabric'
import {Context} from './CreateNewRecipe'
import apiService from "../Utilities/apiService";
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

    const handleSubmit = async()=>{
        //Save original Img
        const userId = user.sub
        const response = await apiService.upload.saveImage(form, userId)
        let recipeOutput = {
            originalImgFilePath: response.data.result[0].filepath,
            recipeSelections:[]
        }
        let id = 0
        if(instructions.length>0){
            instructions.forEach(instruction=>{
                let obj = {
                    imgObjURL: instruction.imgObjURL,
                    location:"Instructions",
                    id: id
                }
                recipeOutput.recipeSelections.push(obj)
                id++
            })
        }

        if(ingredients.length>0){
            ingredients.forEach(ingredient=>{
                let obj = {
                    imgObjURL: ingredient.imgObjURL,
                    location:"Ingredients",
                    id: id
                }
                recipeOutput.recipeSelections.push(obj)
                id++
            })
        }
        navigate('/readMany',{state: {'recipeOutput':recipeOutput}})
    }

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
            instructions.forEach((instruction)=>{
                const croppedCoordinates = instruction.coordinates
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

        if(ingredients.length > 0){
            ingredients.forEach((ingredient)=>{
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

                  let text = new fabric.Text(" Ingredients ",{
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
        <div className="fabric-container" style = {{width: width, height:height}}>
            <div id = "fabric-canvas-wrapper">
                <canvas id='canvas'></canvas>
            </div>
            <img id="recipe-img" src = {result} alt = "uploadedImage" hidden />
        </div>
        <div>
            <button onClick={()=>handleOpenEditor("instructions")}>Instructions</button>
            <button onClick={()=>handleOpenEditor("ingredients")}>Ingredients</button>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    </div>)
}