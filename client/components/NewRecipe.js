import React from "react";
const { createWorker } = require("tesseract.js");

class NewRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "waiting on recipe",
      lines: [],
      recipeuploaded: false,
      recipeDone: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let readerResult = "";
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.addEventListener(
      "load",
      function () {
        readerResult = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);

      const worker = createWorker();
      (async () => {
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        await worker.setParameters({
          preserve_interword_spaces: 1,
        });
        const {
          data: { text, lines },
        } = await worker.recognize(readerResult);
        //console.log(text);
        this.setState({ text: text, lines: lines});
        console.log(this.state)
        await worker.terminate();
      })();
    }
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
        <div>{this.state.lines.map((line)=>(
          <div>
            {line.text}
          </div>

        ))}</div>
      </div>
    );
  }
}

export default NewRecipe;
