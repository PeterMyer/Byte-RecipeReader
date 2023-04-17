# Byte
A web app used to digitize recipe ingredients, instructions, and generate nutrition info from an image utilizing Google's Tesseract OCR (optical character recognition). Users can then generate nutritional info based on parsed ingredients by calling USDA FoodDataCentral API. 

You can access a live version of BYTE at: https://byte-recipe-reader.herokuapp.com/

## Technologies
- Javascript, React, and Node.js
- Fabric.js and Cropper.js to create recipe selection interface
- Auth0 handles user authentication and sign-in
- AWS S3 service to store user images
- Tesseract.js OCR extracts text from user images
- Draft.js and react-hook-form to allow user edits to recipe information
- Python-shell to parse ingredient text into various components.

## How to use Byte
### Create Recipe From Image

After logging in select NEW RECIPE and CREATE FROM IMAGE

Find you favorite cook book recipe and upload pictures of the ingredients and instructions. For best results images should be flat and evenly lit.

Use the select options to highlight desired parts of your recipe including: Image, Instructions, and Ingredients. Multiple selections are available for Instructions and Ingredients.

On submission, BYTE will use Tesseract to extra the selected recipe from your image and output the interpreted text.

### Review and Edit Recipe Text

Review the output instructions and ingredients to ensure correctness of the OCR data. You can make any changes needed before confirming the final results.

When you are satisfied with the text and submit Byte will output a recipe page where you can add final details such number of servings and any additional ingredients not included in the original recipe.

### Generate Nutrition Info
From the completed recipe page you can also generate the estimated nutrition data for your ingredients. Byte will reach out to the USDA Food Database API to find the best match for your listed ingredient and then calculate the nutrition data from the given measurements. Once created the nutrition data is saved to your Byte recipe for future reference. 
