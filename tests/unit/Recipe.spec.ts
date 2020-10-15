import Recipe from '@/models/Recipe';
import Ingredient from '@/models/Ingredient';
import NumberWithUnit from '@/models/NumberWithUnit';

describe('Recipe Model', () => {
  it('should be able to add a new ingredient to the recipe', () => {
    const recipe = new Recipe();
    recipe.addIngredient(new Ingredient());
    expect(recipe.ingredients.length).toBe(1);
  });

  it('should be able to remove a ingredient from the recipe', () => {
    const recipe = new Recipe();
    recipe.addIngredient(new Ingredient());
    recipe.addIngredient(new Ingredient());
    recipe.removeIngredient(1);
    expect(recipe.ingredients.length).toBe(1);
  });

  // it('should be able to get the sum of all ingredients amount to put in milliliters', () => {
  //   const recipe = new Recipe();
  //   const ingredient1 = new Ingredient();
  //   recipe.addIngredient(ingredient1);
  //   recipe.updateIngredientDesiredConcentration(0, new NumberWithUnit(10, 'nM'));
  //   recipe.updateIngredientInitConcentration(0, new NumberWithUnit(100, 'nM'));
  //   recipe.desiredVolume = new NumberWithUnit(1, 'L');
  //   expect(recipe.sumOfAllAmountsToPut).toBe(100);
  // });

  it('should automatically calculate the amount to put for ingredients', () => {
    const recipe = new Recipe();
    const ingredient = new Ingredient();
    recipe.addIngredient(ingredient);
    recipe.updateIngredientDesiredConcentration(0, new NumberWithUnit(10, 'nM'));
    recipe.updateIngredientInitConcentration(0, new NumberWithUnit(100, 'nM'));
    recipe.desiredVolume = new NumberWithUnit(1, 'L');
    expect(recipe.ingredients[0].amountToPut?.value).toBe(100);
    expect(recipe.ingredients[0].amountToPut?.label).toBe('mL');
  });

  it('should automatically calculate the solvent value and unit', () => {
    const recipe = new Recipe();
    const ingredient = new Ingredient();
    recipe.addIngredient(ingredient);
    recipe.updateIngredientDesiredConcentration(0, new NumberWithUnit(10, 'nM'));
    recipe.updateIngredientInitConcentration(0, new NumberWithUnit(100, 'nM'));
    recipe.desiredVolume = new NumberWithUnit(1, 'L');
    if (recipe.solventAmount) {
      expect(recipe.solventAmount.value).toBe(900);
      expect(recipe.solventAmount.label).toBe('mL');
    }
  });

  it('should automatically recalculate the solvent when the data changes', () => {
    const recipe = new Recipe();
    const ingredient1 = new Ingredient();
    recipe.addIngredient(ingredient1);
    recipe.updateIngredientDesiredConcentration(0, new NumberWithUnit(10, 'nM'));
    recipe.updateIngredientInitConcentration(0, new NumberWithUnit(100, 'nM'));
    recipe.desiredVolume = new NumberWithUnit(1, 'L');
    const ingredient2 = new Ingredient();
    recipe.addIngredient(ingredient2);
    recipe.updateIngredientDesiredConcentration(1, new NumberWithUnit(20, 'nM'));
    recipe.updateIngredientInitConcentration(1, new NumberWithUnit(300, 'nM'));
    recipe.desiredVolume = new NumberWithUnit(3, 'L');
    if (recipe.solventAmount) {
      expect(recipe.solventAmount.value).toBe(2.5);
      expect(recipe.solventAmount.label).toBe('L');
    }
  });

  it('should automatically recalculate the solvent amount when a item gets removed', () => {
    const recipe = new Recipe();
    const ingredient1 = new Ingredient();
    recipe.addIngredient(ingredient1);
    recipe.updateIngredientDesiredConcentration(0, new NumberWithUnit(10, 'nM'));
    recipe.updateIngredientInitConcentration(0, new NumberWithUnit(100, 'nM'));
    recipe.desiredVolume = new NumberWithUnit(1, 'L');
    const ingredient2 = new Ingredient();
    recipe.addIngredient(ingredient2);
    recipe.updateIngredientDesiredConcentration(1, new NumberWithUnit(20, 'nM'));
    recipe.updateIngredientInitConcentration(1, new NumberWithUnit(300, 'nM'));
    recipe.desiredVolume = new NumberWithUnit(3, 'L');
    recipe.removeIngredient(1);
    if (recipe.solventAmount) {
      expect(recipe.solventAmount.value).toBe(2.7);
      expect(recipe.solventAmount.label).toBe('L');
    }
  });

  it('should recognize solid ingredients and not calculate a solvent value', () => {
    const recipe = new Recipe();
    const ingredient1 = new Ingredient();
    recipe.addIngredient(ingredient1);
    recipe.updateIngredientDesiredConcentration(0, new NumberWithUnit(10, 'nM'));
    recipe.updateIngredientInitConcentration(0, new NumberWithUnit(100, 'nM'));
    recipe.desiredVolume = new NumberWithUnit(1, 'L');
    const ingredient2 = new Ingredient();
    recipe.addIngredient(ingredient2);
    recipe.updateIngredientDesiredConcentration(1, new NumberWithUnit(20, '%/(s)'));
    recipe.updateIngredientInitConcentration(1, new NumberWithUnit(300, '%/(s)'));
    recipe.desiredVolume = new NumberWithUnit(3, 'L');
    expect(recipe.hasSolidIngredients).toBeTruthy();
    if (recipe.solventAmount) {
      expect(recipe.solventAmount.value).toBe(0);
    }
  });
});
