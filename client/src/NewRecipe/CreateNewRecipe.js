import React, {useState} from "react";
import ImageUpload from './ImageUpload'

export default function CreateNewRecipe(){
    const [result, setResult] = useState("")
    const [loaded, setLoaded] = useState(false)

    return(
        <div>
            {loaded? 
                <img src={result} id="img" alt ="recipeImg"></img>
                :
                <ImageUpload
                    loaded = {loaded}
                    setLoaded = {setLoaded}
                    setResult = {setResult}  
                />
            }
        </div>
    )
}
