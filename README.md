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

These settings are sufficient for the basic use case of recognizing recipe text. However, desiring to do more with the text raised another challenge that was solved through various Byte feature solutions, and may have Tesseract and ML soltuions to be explored in the future.

#### Challenge: Understanding Parts of Recipe
Recipe texts come in a non-standardized format with various potential sections including ingredients, instructions, commentary, and additional notes. These sections can be inside and between eachother causing the OCR to become confused aobut where one section ends and another begins. 

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

Luckily this turns out to be a alreaady worked on problem. In 2015 the New York Times released the implementation of their [CRF tagger model](https://github.com/nytimes/ingredient-phrase-tagger) they use for their own cooking website. The full article is available [here](https://archive.nytimes.com/open.blogs.nytimes.com/2015/04/09/extracting-structured-data-from-recipes-using-conditional-random-fields/). This tagger is capable of splitting an ingredient line into NAME, UNIT, QUANTITY, COMMENT and OTHER, with admirable accuracy. 




