import React, { useState, useRef } from "react";


class NewRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      result: "Waiting on recipe",
    };
    this.handleChange = this.handleChange.bind(this);
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

  componentDidUpdate() {
    let img = document.getElementById("recipeImg");
    }
    render() {
      return (
        <div>
          <p>
            <label for="recipe">Upload a new recipe </label>
            <input
              type="file"
              id="recipe"
              name="recipe"
              accept="image/png, image/jpeg"
              onChange={this.handleChange}
            />
          </p>
          <div className="image-container">
            <img src={this.state.result} id="recipeImg"></img>
          </div>
        </div>
      );
    }
  }

  export default NewRecipe
