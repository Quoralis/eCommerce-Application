import { fetchFromApi } from '../services/fetchFromApi.js';
import { Categories } from '../types/types.js';

export async function fetchAllCategories(): Promise<Categories> {
  return await fetchFromApi('categories');
}

export async function getCategoriesId(key: string): Promise<string> {
  const categoryId: { id: string } = await fetchFromApi(
    `categories/key=${key}`
  );
  return categoryId.id;
}
