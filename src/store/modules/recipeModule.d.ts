import Unit from '@/models/Unit';

export interface NumberWithUnits {
  value: number;
  units: Unit;
}

export interface Ingredient {
  componentName: string;
  'initConcentrationOrMolecularWeight': NumberWithUnits;
  desiredConcentration: NumberWithUnits;
  amountToPut: NumberWithUnits;
  id: string;
  calculateAmountToPutForLiquidIngredient: Function;
  calculateAmountToPutForSolidIngredient: Function;
  calculateAmountToPut: Function;
  isIngredientLiquid: boolean;
}

export interface RecipeInterface {
  recipeName: string;
  ingredients: Ingredient[];
  desiredVolume: NumberWithUnits;
  solventName: string;
  solventAmount: NumberWithUnits;
  addIngredient: Function;
  removeIngredient: Function;
  setSolventValueAndUnit: Function;
  numberOfIngredients: Function;
  ingredientsString: Function;
}
