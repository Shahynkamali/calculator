import { ConvertedUnitAndValue } from '@/types/index';
import roundNumberUp from '@/utils/roundNumberUp';
import Ingredient from './Ingredient';
import NumberWithUnit from './NumberWithUnit';
// eslint-disable-next-line
const convert = require('convert-units');

class Recipe {
  private _desiredVolume = new NumberWithUnit();

  private _solventAmount = new NumberWithUnit();

  private _recipeName? = '';

  private _solventName? = '';

  public ingredients: Ingredient[] = [];

  public errors: string [] = [];

  constructor(recipeName?: string, solventName?: string, desiredVolume?: NumberWithUnit) {
    this.recipeName = recipeName;
    this.solventName = solventName;
    this.desiredVolume = desiredVolume;
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredients[this.ingredients.length - 1].desiredVolume = this._desiredVolume;
    if (ingredient.desiredConcentration && ingredient.initConcentrationOrMolecularWeight) {
      this.calculateSolventValueAndUnit();
    }
  }

  set recipeName(newName: string | undefined) {
    this._recipeName = newName;
  }

  get recipeName(): string | undefined {
    return this._recipeName;
  }

  set solventName(newName: string | undefined) {
    this._solventName = newName;
  }

  get solventName(): string | undefined {
    return this._solventName;
  }

  set solventAmount(newSolventAmount: NumberWithUnit) {
    this._solventAmount = newSolventAmount;
  }

  get solventAmount(): NumberWithUnit {
    return this._solventAmount;
  }

  set desiredVolume(newDesiredVolume: NumberWithUnit | undefined) {
    if (newDesiredVolume) {
      this._desiredVolume = newDesiredVolume;
      for (let i = 0; i < this.ingredients.length; i += 1) {
        this.ingredients[i].desiredVolume = newDesiredVolume;
      }
      this.calculateSolventValueAndUnit();
    }
  }

  get desiredVolume(): NumberWithUnit | undefined {
    return this._desiredVolume;
  }

  private get sumOfAllAmountsToPut(): number {
    if (this.ingredients.length) {
      return this.hasSolidIngredients ? 0 : this.ingredients
        .reduce((total: number, ingredient: Ingredient) => (
          ingredient.amountToPut
            ? total + this.convertToMilliLiters(ingredient.amountToPut)
            : 0
        ), 0);
    }
    return 0;
  }

  get numberOfIngredients(): number {
    return this.ingredients.length;
  }

  get ingredientsString(): string | undefined {
    return this.ingredients.length === 1 ? 'ingredient' : 'ingredients';
  }

  get hasSolidIngredients(): boolean {
    return !!(this.ingredients.some((ingredient: Ingredient) => !ingredient.isIngredientLiquid));
  }

  public updateIngredientInitConcentration(index: number, newUnit: NumberWithUnit) {
    this.ingredients[index].initConcentrationOrMolecularWeight = newUnit;
    this.calculateSolventValueAndUnit();
  }

  public updateIngredientDesiredConcentration(index: number, newUnit: NumberWithUnit) {
    this.ingredients[index].desiredConcentration = newUnit;
    this.calculateSolventValueAndUnit();
  }

  public calculateSolventValueAndUnit(): void {
    if (this.desiredVolume && !this.hasSolidIngredients) {
      const convertedBestSolventUnitAndValue: ConvertedUnitAndValue = convert(
        (this.convertToMilliLiters(this._desiredVolume)) - this.sumOfAllAmountsToPut,
      )
        .from('mL')
        .toBest({ exclude: ['mm3', 'cm3', 'cl', 'dl', 'kl', 'krm', 'tsk', 'msk', 'kkp', 'glas', 'kanna', 'm3', 'km3', 'm3'] });

      this.solventAmount = new NumberWithUnit(
        this.validateNumber(convertedBestSolventUnitAndValue.val),
        convertedBestSolventUnitAndValue.unit,
      );

      if (this.solventAmount.value && Math.sign(convertedBestSolventUnitAndValue.val) === -1) {
        this.errors.unshift('Your desired volume ratio is invalid');
      } else {
        this.clearAllErrors();
      }
    }
    if (this.hasSolidIngredients) {
      this.solventAmount = new NumberWithUnit(0, 'L');
    }
  }

  private validateNumber(value: number) {
    if (Math.sign(value) === -1) {
      return 0;
    } return roundNumberUp(value);
  }

  private clearAllErrors() {
    while (this.errors.length > 0) {
      this.errors.pop();
    }
  }

  public get hasInvalidIngredient(): boolean {
    return this.ingredients.some((ingredient: Ingredient) => !ingredient.isValidIngredient);
  }


  public removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.calculateSolventValueAndUnit();
  }

  public validateRecipe(recipe: Recipe) {
    if (this.hasInvalidIngredient) {
      this.errors.unshift('Component is invalid!');
    }
    if (!recipe.recipeName || recipe.recipeName.length < 1) {
      this.errors.unshift('Missing recipe name!');
    }
    if (recipe.desiredVolume && recipe.desiredVolume.value && recipe.desiredVolume.value < 0.001) {
      this.errors.unshift('Desired volume needs to be higher then 0');
    }
    if (!recipe.solventName || recipe.solventName.length < 1) {
      this.errors.unshift('Missing solvent Name!');
    } else if (this.recipeName && this.solventName && !this.hasInvalidIngredient) {
      this.clearAllErrors();
    }
  }

  private convertToMilliLiters(numberWithUnit: NumberWithUnit | undefined): number {
    if (numberWithUnit && numberWithUnit.stateOfMatter === 'liquid') {
      return convert(numberWithUnit.value)
        .from(numberWithUnit.label)
        .to('mL');
    }
    return 0;
  }

  public static serialize(recipe: Recipe): string {
    return JSON.stringify(recipe);
  }

  public static deserialize(jsonRecipe: string): Recipe {
    const parsedRecipe: Recipe = JSON.parse(jsonRecipe);
    const recipe = Recipe.buildRecipe(parsedRecipe);
    parsedRecipe.ingredients.forEach((ingredient: Ingredient) => recipe.addIngredient(Ingredient.buildIngredient(ingredient)));
    return recipe;
  }

  public static buildRecipe(recipeProps?: Recipe): Recipe {
    if (recipeProps) {
      return new Recipe(
        recipeProps._recipeName,
        recipeProps._solventName,
        NumberWithUnit.buildNumberWithUnit(recipeProps._desiredVolume),
      );
    }
    return new Recipe();
  }
}

export default Recipe;
