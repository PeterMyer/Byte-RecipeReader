import React from "react";

//Intakes new recipe upload
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
    //create new file reader
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
    //builds canvas and inserts image
    let canvas = document.getElementById("recipecanvas");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    let img = document.getElementById("recipeImg");
    // let hRatio = ctx.width / img.width    ;
    // let vRatio = ctx.height / img.height
    // let ratio  = Math.min ( hRatio, vRatio )
    img.onload = function () {
      // ctx.drawImage(img, 0, 0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio)
      ctx.drawImage(img, 0, 0, 800, 800);
    };
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
        <img src={this.state.result} height="800" id="recipeImg" hidden></img>
        <canvas
          id="recipecanvas"
          width="800"
          height="800"
        ></canvas>
      </div>
    );
  }
}

export default NewRecipe;
