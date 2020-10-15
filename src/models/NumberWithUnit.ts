import Unit from './Unit';

class NumberWithUnit {
  public _unit: Unit;

  constructor(public _value?: number, label?: string) {
    this._value = _value;
    this._unit = new Unit(label);
  }

  get category() {
    return this._unit?.category;
  }

  get stateOfMatter() {
    return this._unit?.stateOfMatter;
  }

  get label() {
    return this._unit?.label;
  }

  get categoryConversionUnit() {
    return this._unit?.categoryConversionUnit;
  }

  set unit(newUnit: string) {
    this._unit = new Unit(newUnit);
  }

  set value(newNumber: number | undefined) {
    this._value = newNumber;
  }

  get value(): number | undefined {
    return this._value;
  }

  public static buildNumberWithUnit(newNumberAndUnit: NumberWithUnit) {
    return new NumberWithUnit(newNumberAndUnit._value, newNumberAndUnit._unit.label);
  }
}
export default NumberWithUnit;
