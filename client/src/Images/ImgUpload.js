import React, {useState} from "react";
import apiService from "../Utilities/apiService";
import { useAuth0 } from '@auth0/auth0-react';

export default function NewRecipe (props) {
 const [loaded, setLoaded] = useState(false)
 const [result, setResult] = useState("")
 const [form, setForm] = useState(null)
 const { user } = useAuth0();
 const setShow = props.setShow
 const setImages = props.setImages
 const images = props.images

  const handleChange=(e)=> {
    const file = e.target.files[0];
    var reader = new FileReader();
    const data = new FormData()
    data.append("uploaded_file", file)

    reader.onload = function (e) {
      setResult(e.target.result)
      setForm(data)
      setLoaded(true)}

    reader.onerror = function () {
      console.log("error:", reader.error);
    };
    reader.readAsDataURL(file);
  }

  const handleSubmit= async(e) => {
    e.preventDefault()
    let userId = user.sub
    let response = await apiService.upload.saveImage(form, userId)
    let updatedState = [...images,...response.data.result]
    setImages(Object.assign(updatedState))
    setShow(false)
  }
      return (
        <div>
          <div className = "modal-img-container">
             {loaded ? <img src={result} id="img" alt ="recipeImg"></img>:  "Waiting on image"}
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <input
              type="file"
              id="recipe"
              name="uploaded_file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />
            {loaded ?<button type="submit"> Save Image</button>: null}
          </form>
          </div>
        </div>
      );
    }

