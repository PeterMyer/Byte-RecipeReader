import { axiosClient } from '../../../Lib/axios';

export const getNutrition = async (id) => {
  let response = await axiosClient.get(`/api/nutrition/${id}`);
  return response;
};
