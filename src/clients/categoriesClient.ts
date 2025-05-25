import { fetchFromApi } from '../services/fetchFromApi.js';
import { Categories } from '../types/types.js';

export async function fetchAllCategories(): Promise<Categories> {
  return await fetchFromApi('categories');
}
