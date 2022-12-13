import React, {useState} from "react";
import ImageUpload from './ImageUpload'
import FabricCanvas from "./FabricCanvas";

export default function CreateNewRecipe(){
    const [result, setResult] = useState("")
    const [loaded, setLoaded] = useState(false)

    return(
        <div>
            {loaded? 
                <FabricCanvas
                    result = {result}
                />
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
