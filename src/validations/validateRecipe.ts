/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// import extractNumbers from '@/utils/extractNumbers';
// import extractString from '@/utils/extractString';
// import validateNumbers from '@/validations/validateNumbers';
// import validateVolumes from '@/validations/validateVolumes';
// import validateComponentNames from '@/validations/validateComponentNames';
// import validateRecipeAndSolvientNames from '@/validations/validateRecipeAndSolvientNames';
// // import { RecipeInterface } from '@/store/modules/recipeModule';

// const validateRecipe = (recipe: any): Array<string> => {
//   const errors: Array<string> = [];
//   const extractedNumbers: Array<number> = extractNumbers(recipe.ingredients);
//   const hasBadNumber: boolean = validateNumbers(extractedNumbers);
//   const hasMissingDesiredVolume: boolean = validateVolumes(recipe);
//   const hasRecipeAndSolventName: boolean = validateRecipeAndSolvientNames(recipe);
//   const hasComponents: boolean = validateComponentNames(
//     extractString(recipe.ingredients), recipe.ingredients,
//   );
//   if (!hasComponents) {
//     errors.unshift('Please check all component names!');
//   }
//   if (!hasRecipeAndSolventName) {
//     errors.unshift('Please check for empty values');
//   }
//   if (hasComponents && hasRecipeAndSolventName) {
//     if (hasBadNumber || hasMissingDesiredVolume) {
//       errors.unshift('Please check for missing numbers');
//     }
//   }


//   return errors;
// };

// export default validateRecipe;
