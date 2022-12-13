import React, {useState,useContext} from "react";
import {Context} from './CreateNewRecipe'

export default function CreateNewRecipe(){
    const context = useContext(Context)
    const setLoaded = context.setLoaded
    const setResult = context.setResult
    
    //unsure if this is needed
    const [form, setForm] = useState(null)

    const handleChange = (e)=>{
        const file = e.target.files[0]
        let reader = new FileReader()
        const data = new FormData()
        data.append("uploaded_file", file)

        reader.onload = function(e){
            setResult(e.target.result)
            
            //unsure if this is needed
            setForm(data)
            setLoaded(true)
        }

        reader.onerror = function(){
            console.log("error", reader.error)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit= async(e) => {
        e.preventDefault()
        // let userId = user.sub
        // let response = await apiService.upload.saveImage(form, userId)
        // // let updatedState = [...images,...response.data.result]
        // // setImages(Object.assign(updatedState))
        // setShow(false)
      }

    return(
        <div>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                    type="file"
                    id="recipe"
                    name="uploaded_file"
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                    />
            </form>

        </div>
    )
}
