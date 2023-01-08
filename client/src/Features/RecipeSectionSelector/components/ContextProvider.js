import React, {useState, createContext} from "react";
import ImageUpload from './ImageUpload'
import RecipeSectionSelection from "./SelectionContainer";

export const Context = React.createContext()

export function CreateNewRecipe(){
    const [result, setResult] = useState("")
    const [form, setForm] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [name, setName] = useState("")
    const [cropObjects, setCropObjects] = useState({})
    const [showCropper, setShowCropper] = useState(false)
    const [section, setSection] = useState(null)
    const [width, setWidth] = useState(400)
    const [height, setHeight] = useState(0)
    const [fabricCanvas, setFabricCanvas] = useState(null)
    const [recipeImg, setRecipeImg] = useState({})

    return(
        <article className="create-new-recipe-container">
            <Context.Provider value={{
                result, setResult,
                imageLoaded, setImageLoaded,
                name, setName,
                showCropper, setShowCropper,
                section, setSection,
                width, setWidth,
                height, setHeight,
                fabricCanvas, setFabricCanvas,
                form, setForm,
                cropObjects, setCropObjects,
                recipeImg, setRecipeImg
                }}>
                    {
                        imageLoaded? 
                            <RecipeSectionSelection />
                            :
                            <ImageUpload/>
                    }
            </Context.Provider>
        </article>
    )
}
