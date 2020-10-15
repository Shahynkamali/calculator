import NumberWithUnit from '@/models/NumberWithUnit';
import { ConvertedUnitAndValue } from '@/types/index';
import roundNumberUp from '@/utils/roundNumberUp';
import { v4 as uuid } from 'uuid';
import Unit from './Unit';
// eslint-disable-next-line
const convert = require('convert-units');

class Ingredient {
  private _amountToPut = new NumberWithUnit();

  private _desiredVolume = new NumberWithUnit();

  public id: string = uuid();

  [key: string]: any;

  errors: string[] = [];

  constructor(
    public _componentName?: string,
    public _state = new Unit(),
    public _initConcentrationOrMolecularWeight = new NumberWithUnit(),
    public _desiredConcentration = new NumberWithUnit(),
  ) {
    this._componentName = _componentName;
    this._initConcentrationOrMolecularWeight = _initConcentrationOrMolecularWeight;
    this._desiredConcentration = _desiredConcentration;
  }

  get initConcentrationOrMolecularWeight() {
    return this._initConcentrationOrMolecularWeight;
  }

  set initConcentrationOrMolecularWeight(newInitConcentration: NumberWithUnit) {
    this._initConcentrationOrMolecularWeight = newInitConcentration;
    if (!this.desiredConcentration.label) {
      this.resetDesiredConcentration(this.desiredConcentration.value);
    }
    if (this.initConcentrationOrMolecularWeight.category !== this.desiredConcentration.category) {
      this.resetDesiredConcentration(this.desiredConcentration.value);
    }
    if (!this.isInitConcentrationValLargerThenDesiredConcentration(this.initConcentrationOrMolecularWeight, this.desiredConcentration)) {
      this.resetDesiredConcentration(this.desiredConcentration.value);
    }
    this.calculateAmountToPut();
  }

  set desiredConcentration(newDesiredConcentration: NumberWithUnit) {
    this._desiredConcentration = newDesiredConcentration;
    this.calculateAmountToPut();
  }

  get desiredConcentration() {
    return this._desiredConcentration;
  }

  get componentName() {
    return this._componentName;
  }

  set componentName(newName: string | undefined) {
    this._componentName = newName;
  }

  set amountToPut(newAmountToPut: NumberWithUnit) {
    this._amountToPut = newAmountToPut;
  }

  get amountToPut() {
    return this._amountToPut;
  }

  get desiredVolume() {
    return this._desiredVolume;
  }

  set desiredVolume(newDesiredVolume: NumberWithUnit) {
    this._desiredVolume = newDesiredVolume;
    this.calculateAmountToPut();
  }

  set state(newState: Unit) {
    this._state = newState;
    this.initConcentrationOrMolecularWeight = new NumberWithUnit(this._initConcentrationOrMolecularWeight.value);
    this.desiredConcentration = new NumberWithUnit(this._desiredConcentration.value);
  }

  get state() {
    return this._state;
  }

  get isIngredientSolid() {
    return !!(this.state.label === 'solid');
  }

  get isIngredientLiquid() {
    return !!(this.state.label === 'liquid');
  }

  get isIngredientOfSameCategory() {
    return !!(this.desiredConcentration?.category === this._initConcentrationOrMolecularWeight?.category);
  }

  private isValidComponent(numberWithUnit: NumberWithUnit): boolean {
    return !!(numberWithUnit.value && numberWithUnit.value > 0 && numberWithUnit.label);
  }

  public get isValidIngredient(): boolean {
    return !!(this.isValidComponent(this.desiredConcentration)
      && this.isValidComponent(this.initConcentrationOrMolecularWeight)
      && this.isValidComponent(this.amountToPut)
      && this._componentName
    );
  }

  private resetDesiredConcentration(value: number | undefined) {
    this.desiredConcentration = new NumberWithUnit(value);
  }


  public calculateAmountToPut(): void {
    if (this.initConcentrationOrMolecularWeight?.label
      && this.desiredConcentration?.label
      && this.desiredConcentration?.value
      && this.desiredVolume
    ) {
      if (this.initConcentrationOrMolecularWeight?.label === 'g/mol') {
        this.calculateGramPerMolar(this.initConcentrationOrMolecularWeight, this.desiredConcentration, this.desiredVolume);
      }
      if (this.isIngredientOfSameCategory) {
        if (this.isIngredientSolid && this.desiredConcentration.category === 'PERCENTAGETOSOLID') {
          this.calculatePercentageToSolid(this.desiredConcentration, this.desiredVolume);
        }
        if (this.isIngredientLiquid) {
          this.validateLiquidIngredient(this.initConcentrationOrMolecularWeight, this.desiredConcentration);
        }
      }
    }
  }

  private calculateAmountToPutLiquidIngredient(initConcentration: NumberWithUnit, desiredConcentration: NumberWithUnit): void {
    if (this.desiredVolume?.value && this.desiredVolume.label && desiredConcentration.value) {
      const convertedInitConcentrationValue: number = convert(initConcentration.value)
        .from(initConcentration.label)
        .to(desiredConcentration.label);

      const ratio = desiredConcentration.value / convertedInitConcentrationValue;

      const amountToPutValue = ratio * this.desiredVolume.value;

      const bestUnitAndValue = this.convertToBestPossibleOutCome(amountToPutValue, this.desiredVolume.label);

      this.amountToPut = new NumberWithUnit(roundNumberUp(bestUnitAndValue.val), bestUnitAndValue.unit);
    }
  }

  private convertToBestPossibleOutCome(value: number, unit: string): ConvertedUnitAndValue {
    return convert(value).from(unit).toBest(
      { exclude: ['mm3', 'cm3', 'cl', 'dl', 'kl', 'krm', 'tsk', 'msk', 'kkp', 'glas', 'kanna', 'm3', 'kg'] },
    );
  }

  private validateLiquidIngredient(initConcentration: NumberWithUnit, desiredConcentration: NumberWithUnit): void {
    if (this.isInitConcentrationValLargerThenDesiredConcentration(initConcentration, desiredConcentration)) {
      this.clearErrors();
      this.calculateAmountToPutLiquidIngredient(initConcentration, desiredConcentration);
    }
    if (!this.isInitConcentrationValLargerThenDesiredConcentration(initConcentration, desiredConcentration)) {
      this.errors.unshift('Initial concentration ratio needs to of higher value the desired concentration');
    }
  }

  private isInitConcentrationValLargerThenDesiredConcentration(initConcentration: NumberWithUnit, desiredConcentration: NumberWithUnit) {
    if (initConcentration.label && desiredConcentration.label) {
      const convertedDesiredConcentration = convert(desiredConcentration.value)
        .from(desiredConcentration.label)
        .to(desiredConcentration.categoryConversionUnit);

      const convertedInitConcentration = convert(initConcentration.value)
        .from(initConcentration.label)
        .to(initConcentration.categoryConversionUnit);

      return !!(convertedInitConcentration >= convertedDesiredConcentration);
    }
    return false;
  }

  public clearErrors(): void {
    while (this.errors.length > 0) {
      this.errors.pop();
    }
  }

  private calculatePercentageToSolid(desiredConcentration: NumberWithUnit, desiredVolume: NumberWithUnit): void {
    const desiredVolumeInGrams = convert(desiredVolume.value).from(desiredVolume.label).to('mL');

    if (desiredConcentration.value) {
      const amountToPutValue = (desiredConcentration.value * desiredVolumeInGrams) / 100;

      const bestUnitAndValue: ConvertedUnitAndValue = this.convertToBestPossibleOutCome(amountToPutValue, 'g');

      this.amountToPut = new NumberWithUnit(roundNumberUp(bestUnitAndValue.val), bestUnitAndValue.unit);
    }
  }

  private calculateGramPerMolar(initConcentration: NumberWithUnit, desiredConcentration: NumberWithUnit, desiredVolume: NumberWithUnit): void {
    const desiredConcentrationInMolar = convert(desiredConcentration.value).from(desiredConcentration.label).to('M');

    const desiredVolumeInLiters = convert(desiredVolume.value).from(desiredVolume.label).to('L');

    if (initConcentration.value) {
      const amountToPutValue = (initConcentration.value * desiredConcentrationInMolar) * desiredVolumeInLiters;

      const bestUnitAndValue: ConvertedUnitAndValue = this.convertToBestPossibleOutCome(amountToPutValue, 'g');

      this.amountToPut = new NumberWithUnit(roundNumberUp(bestUnitAndValue.val), bestUnitAndValue.unit);
    }
  }

  public static buildIngredient(ingredient: Ingredient) {
    const initConcentration = NumberWithUnit.buildNumberWithUnit(ingredient._initConcentrationOrMolecularWeight);
    const desiredConcentration = NumberWithUnit.buildNumberWithUnit(ingredient._desiredConcentration);
    if (ingredient._state.label) {
      const state = Unit.buildUnit(ingredient._state.label);
      return new Ingredient(ingredient._componentName, state, initConcentration, desiredConcentration);
    }
    return new Ingredient();
  }
}

export default Ingredient;
