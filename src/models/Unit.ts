export interface NodeWithChildren extends Unit {
  label?: string;
  children: Unit[]
  state?: string;
}

class Unit {
  static allLiquidUnits = ['nM', 'µM', 'mM', 'M', 'μg/μL', 'mg/mL', 'g/L', 'μg/mL', 'X', '%', 'μL', 'L', 'nL', 'mL', 'U/mL'];

  static allSolidUnits = ['g', '%/(s)', 'g/mol'];

  constructor(public label?: string) {
    this.label = label;
  }

  set labelValue(val: string) {
    this.label = val;
  }


  get stateOfMatter(): string | undefined {
    if (this.label) {
      if (Unit.allLiquidUnits.includes(this.label)) {
        return 'liquid';
      }
      if (Unit.allSolidUnits.includes(this.label)) {
        return 'solid';
      }
    }
    return undefined;
  }

  public get category(): string | undefined {
    if (this.label) {
      const molarUnits = ['nM', 'µM', 'mM', 'M'];
      const weightPerVolumeUnits = ['μg/μL', 'mg/mL', 'g/L', 'μg/mL'];
      const percentageUnit = ['%'];
      const X = ['X'];
      const unitPerMl = ['U/mL'];
      const solidUnits = ['%/(s)'];
      const volumeUnits = ['mL', 'L', 'cL', 'µL'];
      const gramPerMolarUnits = ['g/mol'];


      if (molarUnits.includes(this.label)) {
        return 'MOLAR';
      }
      if (weightPerVolumeUnits.includes(this.label)) {
        return 'WEIGHTPERVOLUME';
      }
      if (percentageUnit.includes(this.label)) {
        return 'PERCENTAGE';
      }
      if (X.includes(this.label)) {
        return 'X';
      }
      if (unitPerMl.includes(this.label)) {
        return 'UNITSPERML';
      }
      if (solidUnits.includes(this.label)) {
        return 'PERCENTAGETOSOLID';
      }
      if (volumeUnits.includes(this.label)) {
        return 'LIQUIDVOLUME';
      }
      if (gramPerMolarUnits.includes(this.label)) {
        return 'GRAMPERMOLAR';
      }
    }
    return undefined;
  }

  get categoryConversionUnit(): string | undefined {
    if (this.category === 'MOLAR') {
      return 'M';
    }

    if (this.category === 'WEIGHTPERVOLUME') {
      return 'mg/mL';
    }

    if (this.category === 'PERCENTAGETOSOLID') {
      return '%/(s)';
    }

    if (this.category === 'PERCENTAGE' || this.category === 'X' || this.category === 'UNITSPERML') {
      return '%';
    }

    if (this.category === 'LIQUIDVOLUME') {
      return 'L';
    }
    return undefined;
  }

  static buildUnit(label: string) {
    return new Unit(label);
  }
}

export default Unit;
