/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { RecipeInterface } from '@/store/modules/recipeModule';

const validateVolumes = (recipe: RecipeInterface): boolean => {
  if (recipe.desiredVolume) {
    const { value } = recipe.desiredVolume;
    if (value) {
      if (!Number.isNaN(value) && value > 0) {
        return false;
      }
    }
  }
  return true;
};
export default validateVolumes;
