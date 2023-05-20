import { axiosClient } from '../../../Lib/axios';

export const createNutritionItem = async (payload) => {
  try {
    console.log('payload', payload);
    let response = await axiosClient.post(`/api/nutrition/newItem`, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
