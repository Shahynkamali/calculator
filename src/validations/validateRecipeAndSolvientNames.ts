/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { RecipeInterface } from '@/store/modules/recipeModule';

const validateRecipeAndSolvientName = (recipe: RecipeInterface): boolean => (
  !!(recipe.recipeName && recipe.solventName));

export default validateRecipeAndSolvientName;
