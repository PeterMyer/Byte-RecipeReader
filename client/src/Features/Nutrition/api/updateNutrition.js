import { axiosClient } from '../../../Lib/axios';

export const updateNutrition = async (id, payload) => {
  try {
    let response = await axiosClient.put(
      `/api/recipes/${id}/nutrition`,
      payload
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
