import React from "react";
import apiService from "./apiService";

class NewRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      result: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      this.setState({ result: e.target.result, loaded: true });
      this.forceUpdate();
    }.bind(this);

    reader.onerror = function () {
      console.log("error:", reader.error);
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(event) {
    event.preventDefault()
    apiService.uploads.saveImage(this.state.result)
  }


    render() {
      const loaded = this.state.loaded
      const recipe = this.state.result
      return (
        <div>
          <div className="image-container">
             {loaded ? <img src={recipe} id="recipeImg"></img>:  "Waiting on recipe"}

          <form encType="multipart/form-data">
            <label for="recipe">Upload a new recipe </label>
            <input
              type="file"
              id="recipe"
              name="recipe"
              accept="image/png, image/jpeg"
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleSubmit}> Save Image</button>
          </form>
          </div>
        </div>
      );
    }
  }

  export default NewRecipe
