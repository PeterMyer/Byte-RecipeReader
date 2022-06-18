import React from "react";
import apiService from "./apiService";
import {Link} from "react-router-dom"

class NewRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      result: "",
      form: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const file = event.target.files[0];
    var reader = new FileReader();

    const data = new FormData()
    data.append("uploaded_file", file)

    reader.onload = function (e) {
      this.setState({ result: e.target.result, loaded: true , form: data});
      this.forceUpdate();
    }.bind(this);

    reader.onerror = function () {
      console.log("error:", reader.error);
    };

    reader.readAsDataURL(file);

  }

  handleSubmit(event) {
    event.preventDefault()

    apiService.upload.saveImage(this.state.form)
  }


    render() {
      const loaded = this.state.loaded
      const recipe = this.state.result
      return (
        <div>
          <div className="image-container">
             {loaded ? <img src={recipe} id="recipeImg"></img>:  "Waiting on recipe"}

          <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <label for="recipe">Upload a new recipe </label>
            <input
              type="file"
              id="recipe"
              name="uploaded_file"
              accept="image/png, image/jpeg"
              onChange={this.handleChange}
            />
            <button type="submit"> Save Image</button>
          </form>
          </div>
          <Link to="/">Home</Link>|{" "}
          <Link to="/files">Your Files </Link>
        </div>
      );
    }
  }

  export default NewRecipe
