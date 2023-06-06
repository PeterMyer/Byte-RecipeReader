import { partitionIngredients } from './partitionIngredients';
import { saveImage } from '../api';
import { convertToRaw } from 'draft-js';

export async function createEditRecipePayload(
  data,
  user,
  originalIngredients,
  deleted,
  recipeImg = null
) {
  const editFormIngredients = data.Ingredients.map((ingredient) => ({
    value: ingredient.value,
    id: ingredient.id,
  }));
  const { newIngredient, formatChanges, toDelete } = partitionIngredients(
    originalIngredients,
    editFormIngredients
  );
  let imgResponse = null;
  let recipeImgId = recipeImg ? recipeImg.id : null;

  if (data.ImgFile !== recipeImg) {
    const fileData = new FormData();
    fileData.append('uploaded_file', data.ImgFile[0]);
    let userId = user.sub;
    imgResponse = await saveImage(fileData, userId);
  }

  const recipePayload = {
    name: data.recipeName,
    servings: data.servings,
    source: data.source,
    prepTime: data.prepTime,
    cookTime: data.cookTime,
    ingredients: JSON.stringify([...newIngredient]),
    instructions: JSON.stringify(
      convertToRaw(data.DraftJs.getCurrentContent())
    ),
    nutrition: data.nutrition,
    deletedIngredients: [...toDelete, ...deleted],
    changedFormat: formatChanges,
    imgId: imgResponse ? imgResponse.data.result[0].id : recipeImgId,
  };
  return recipePayload;
}
