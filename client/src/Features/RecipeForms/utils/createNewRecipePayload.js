import { saveImage } from '../api';
import { convertToRaw } from 'draft-js';

export async function createNewRecipePayload(data, userId) {
  let imgResponse = null;
  if (data.ImgFile) {
    const fileData = new FormData();
    if (data.ImgFile[0]) {
      fileData.append('uploaded_file', data.ImgFile[0]);
    } else {
      fileData.append('uploaded_file', data.ImgFile);
    }
    imgResponse = await saveImage(fileData, userId);
  }

  let recipePayload = {
    name: data.recipeName,
    servings: data.servings,
    source: data.source,
    rating: data.rating.value,
    prepTime: data.prepTime,
    cookTime: data.CookTime,
    ingredients: JSON.stringify(
      data.Ingredients.map((ingredient) => ingredient.value.toLowerCase())
    ),
    instructions: JSON.stringify(
      convertToRaw(data.DraftJs.getCurrentContent())
    ),
    nutrition: data.nutrition,
    userId: userId,
    imgId: imgResponse ? imgResponse.data.result[0].id : null,
  };

  return recipePayload;
}
