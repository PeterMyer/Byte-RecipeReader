import React, {useState, useContext, createContext} from "react";
import ImageUpload from './ImageUpload'
import RecipeSectionSelection from "./RecipeSectionSelection";

export const Context = React.createContext()

export function CreateNewRecipe(props){
    const [result, setResult] = useState("")
    const [form, setForm] = useState(null)
    const [loaded, setLoaded] = useState(false)
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
                loaded, setLoaded,
                name, setName,
                showCropper, setShowCropper,
                section, setSection,
                width, setWidth,
                height, setHeight,
                fabricCanvas, setFabricCanvas,
                form, setForm,
                cropObjects, setCropObjects,
                recipeImg, setRecipeImg
                }} 
                >
                    {loaded? 
                        <RecipeSectionSelection />
                        :
                        <ImageUpload/>
                    }
            </Context.Provider>
        </article>
    )
}
