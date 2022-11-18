# Byte
A web app used to digitize recipe ingredients, instructions, and generate nutrition info from an image.

## How to use Byte
### Upload Images

Find you favorite cook book recipe and upload pictures of the ingredients and instructions. You can use one or multiple multiple images to construct a recipe. 

Text should be cropped around the sections you wish the reader to parse in order to get the most accurate information. There is a built in cropper feature to allow adjustment of uploaded images. For best results images should be flat and evenly lit.

### Build Recipe

Once images are prepared you can navigate to the Build Recipe page and use the drag and drop feature to select and organize your images. After clicking 'Build' Byte will read the text from each image and output text editor boxes for each image, where you can adjust the text as needed.

When you are satisfied with the text and submit Byte will output a recipe edit page where you can add final details such number of servings and any additional ingredients not included in the original recipe.

### Generate Nutrition Info
From the completed recipe page you can also generate the estimated nutrition data for your ingredients. Byte will reach out to the USDA Food Database API are find the best match for your listed ingredient and then calculate the nutrition data from the given measurements. Once created the nutrition data is saved to your Byte recipe for future reference. 

## How Byte Works
### Why Byte
Byte was originally inspired from an exploration of [Google's Tesseract OCR technology](https://github.com/tesseract-ocr/tesseract). I love collecting cookbooks, but digitizing them can be a pain. I found there was a lack of cheap and easily accessible options for getting recipe text online, so it was an excellent subject for Tesseract experimentation. 

Tesseract set up was very simple, and will be discussed further down the page. The next question was what to do with all of this recipe text once it was accessible digitally? Other than cooking, the thing I spend the most time on with recipes is calculating nutrition. That requires quite a lot of manual excel sheets and ingredient look ups. The perfect subject for automation, and so Byte was born!

### Recipe Images
#### Image Upload
Users are able to upload and save multiple images with a simple upload form. All user uploaded images are saved to an [Amazon AWS S3 bucket](https://aws.amazon.com/s3/). 

#### Image Cropping and Sectioning
Once saved, users have the option of cropping their images to fit closer to the text and into multiple selections. This feature is provided as an answer to challenges regarding OCR recipe section identification that will be discussed further in the Tesseract section. 

Cropping is implemented with [Cropper.js](https://fengyuanchen.github.io/cropperjs/) with react implementation via [react-cropper.js](https://github.com/react-cropper/react-cropper). Once submitted cropped images are saved to S3 as a new image upload, leaving the original intact in case the user needs multiple selections from the same source.

#### Recipe Construction
A recipe that has been sectioned into several independent images will eventually need to be reconstructed back into something akin to its original form. In order to address this issue Byte uses an organizable drag-and-drop feature for image selection .

From the 'Create Recipe' page users are provided a drag-and-drop selection, implemented with [react-dnd](https://react-dnd.github.io/react-dnd/about) of their saved images to construct their recipe, with drop targets for both Instructions and Ingredients. Images are processed from left to right in their respective drop zones.

The seperate drop targets allow Byte to understand what methods it should use to process each image. The left to right processing ensures the outputs will be in the appropriate order, which is especially important for the instruction steps.

### Retrieving Image Text
#### Tesseract
Images are processed in order via [Tesseract.js](https://tesseract.projectnaptha.com/). Tesseract implementation is straight forward with two workers organized by a scheduler and outputting a status update which displays on the UI to inform user of progress. 

These settings are sufficient for the basic use case of recognizing recipe text. However, the problem of sections parts of a recipe discussed below may have Tesseract solutions which can be explored in the future.

#### Challenge: Understanding Parts of Recipe
Recipe texts come in a non-standardized format with various potential sections including ingredients, instructions, commentary, and additional notes. These sections can be inside and between each other leading to confused output. 

The initial version of Byte explored identification of ingredients and instructions via training a [Brain.js](https://brain.js.org/#/) neural network model. While intital results were promising they did not approach a reliablility that would remove regular user input and confirmation. 

If user input was going to be required I decided to lean into it by having users select the sections and input manually for the recipe before sending it to Tesseract. This was accomplished with the previously outlined crop and drag-and-drop features. Later product research has shown this approach has been used for similar applications, such as [The Cookbook App](https://thecookbookapp.com/) and [Recipe Keeper](https://recipekeeperonline.com/).

#### Verifying with Draft.js
After Tesseract results are provided users are given the option to compare output to original image and make any desired changes. The text editor is implemented with [Draft.js](https://draftjs.org/) and provides a separate editor box for each uploaded image. Editor states are saved to a top level 'Parent State' which is shared with the lower level editors via React UseContext. On Submit this parent state is used to fill in a new recipe form. 

### Formatted Recipe
#### Putting it Together With React Hook Form
Following user confirmation recipe data is sent to a html form created via [React Hook Form](https://react-hook-form.com/). The hook form has a couple basic fields for Recipe Name and Servings, a field array for ingredients, and a embedded Draft.js editor for ingredients. 

React Hook Form was chosen for its ease of use and flexibility when adding new fields. Additionally, the field array feature's separate inputs for each ingredient is useful for easily seperating ingredients when generating nutrition info.

On save, this recipe form is converted to a JSON object and sent to the backend database where it can easily be retrieved by the user.

### Nutrition Data
Recipe recognition via OCR proved to be an interesting problem, but is also a growing novelty offered by several cookbook apps such as the two previously mentioned, in a method similar to my own implementation. For an additional challenge I wanted to do something interesting with the recipes I had saved that was not as common in other cookbook apps. 

For this reason I chose generating an estimate of the recipe nutritional information, which some web services offer, but not infrequently cookbook web apps.

#### Ingredient Parsing
The first challenge to calculating nutritional data is parsing out the individual parts of a recipes ingredients. Each ingredient is made of several parts including the food item they are using, a numeric quantity value, the unit by which they are measured (cups/tablespoons), and additional commentary or notes. In order to calculate the nutritional info Byte needs to separate the food item, quantity, and unit into individual components of the listed ingredient. 

Luckily this turns out to be an alreaady worked problem. In 2015 The New York Times released the implementation of the [CRF tagger model](https://github.com/nytimes/ingredient-phrase-tagger) they use for their own cooking website. The full article is available [here](https://archive.nytimes.com/open.blogs.nytimes.com/2015/04/09/extracting-structured-data-from-recipes-using-conditional-random-fields/). This tagger is capable of splitting an ingredient line into NAME, UNIT, QUANTITY, COMMENT and OTHER, with admirable accuracy. 

A hurdle remained as the original tagger was written in C++. However, in 2017 github user manugarri had release a Python [juypter notebook implementation](https://gist.github.com/manugarri/0fdd4e52f074d61d633ca23eee6da052) of the NYT code along with [a blog article](http://blog.manugarri.com/nyt_tagger/) explaining their approach. Working from there I was able adapt my own updated Python code, which is saved as middleware on the Byte server. 

Whenever a recipe is saved to the Byte DB the listed ingredients are parsed by the Python middleware. The parsed ingredient food name, unit, quantity, and comments are saved to seperate tables and linked by a Ingredient table, which contains a normalized version of the original text. This structure enables easy calculations as well as queries for recipes that contain the same food items, or comments.

#### Calculating Nutrition
When a user clicks the "Get Nutrition" button Byte makes a POST request to the USDA FoodData Central database for each ingredient name related to the current recipe. The API will respond with a list of matching food items ranked by best match. Each returned food item contains a plethora of information, including serving size gram weight and nutrition info.

Currently, Byte takes a naive approach and automatically selects the first "best match" that the USDA returns. The 13 nutritional values, per 100 grams, common on food labels are retrieved for that item and then scaled using the weight in grams of the ingredient serving size. For instance, a tablespoon = 4 grams. Serving size weights are already saved in Byte's unit db for quick lookup and conversions. In case a measure is not found, such as "slice", the USDA default serving's gram weight is used. The scaled nutrition is then multiplied by quantity and summed for each ingredient giving the total nutrition for the full recipe. Finally, the data is saved to a table in the database for future reference in the recipe file.

## Future Iterations
In its current state Byte is largely an MVP and has multiple opportunities for improvement. Below is a list of some future improvements I intend to make on the project.

### OCR Selection UI
The process of Upload Img > Crop Img > Drag and Drop Img > OCR > Verify > Recipe Form > Save is extremely clunkly and requires multiple pages. In future iterations of Byte I intend to streamline this process and ideally reduce to one page.

### Nutritional Info Selection
Byte defaults to the first result from the USDA API. In a future version users should be able to see what food options are available, select the one they think matches each ingredient best, and then Byte should update the nutritional estimate based on their selection.

### CSS Revamp
In its current state Byte has fairly simple design attributes. The whole of the app's CSS should be revamped to by more stylish.



