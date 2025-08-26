import axios from 'axios';
import type { IAPIOption } from '~/types/api';

export const useApi = async <T>(endpoint: string, options: IAPIOption) => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;
  const response = await axios<T>(baseUrl + endpoint, options);
  return response.data;
};