import React, {useContext} from "react";
import {Context} from './ContextProvider'

export default function CreateNewRecipe(){
    const context = useContext(Context)
    const setImageLoaded = context.setImageLoaded
    const setResult = context.setResult
    const setForm = context.setForm
    
    const handleChange = (e)=>{
        const file = e.target.files[0]
        let reader = new FileReader()
        const data = new FormData()
        data.append("uploaded_file", file)

        reader.onload = function(e){
            setResult(e.target.result)
            setForm(data)
            setImageLoaded(true)
        }

        reader.onerror = function(){
            console.log("error", reader.error)
        }
        reader.readAsDataURL(file)
    }

    return(
        < article className = "image-upload-container">
            <span>
                <h2>Choose A Recipe Image</h2>
            </span>
            <form className='image-upload-form' encType="multipart/form-data">
                <input
                    type="file"
                    id="recipe"
                    name="uploaded_file"
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                    />
            </form>
        </article >
    )
}
