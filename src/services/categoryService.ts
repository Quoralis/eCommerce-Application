import { getCategoriesId } from '../clients/categoriesClient.js';

export async function getActiveCategoryId(): Promise<
  { categoryId: string; keyActiveCategory: string } | undefined
> {
  const activeCategory = document.querySelector(
    '.active__category'
  ) as HTMLElement | null;
  if (!activeCategory) {
    console.warn('Active category not found.');
    return;
  }
  const keyActiveCategory = activeCategory.dataset.categoryKey;
  if (!keyActiveCategory) {
    console.warn('No data-category-key on active category');
    return;
  }
  const categoryId = await getCategoriesId(keyActiveCategory);
  if (!categoryId) {
    console.warn('Category ID not found for key:', keyActiveCategory);
    return;
  }
  return { categoryId, keyActiveCategory };
}
