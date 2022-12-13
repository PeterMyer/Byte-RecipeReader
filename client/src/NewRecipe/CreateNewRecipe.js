import React, {useState, useContext, createContext} from "react";
import ImageUpload from './ImageUpload'
import RecipeSectionSelection from "./RecipeSectionSelection";

export const Context = React.createContext()

export default function CreateNewRecipe(){
    const [result, setResult] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [name, setName] = useState("")
    const [instructions, setInstructions] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [showCropper, setShowCropper] = useState(false)
    const [section, setSection] = useState(null)

    return(
        <div>
            <Context.Provider value={{
                result, setResult,
                loaded, setLoaded,
                name, setName,
                instructions, setInstructions,
                ingredients, setIngredients,
                showCropper, setShowCropper,
                section, setSection
                }} 
                >
                    {loaded? 
                        <RecipeSectionSelection/>
                        :
                        <ImageUpload/>
                    }
            </Context.Provider>
        </div>
    )
}
