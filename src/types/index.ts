
export interface Schema {
    fieldType: string;
    name: string;
    options?: ConcentrationUnits;
}

export interface SolventUnit {
  label: string;
}

export interface NodeTree {
  children: Array<Node>;
}

export interface Node {
  label?: string;
  category?: string;
  concentration?: string;
  children?: Node | SolventUnit | Array<object>;
}

export interface ConvertedUnitAndValue {
  plural: string;
  singular: string;
  unit: string;
  val: number;
}


export enum ConcentrationUnits {
    mM = 'mM',
    muM = 'µM',
    nM = 'nM',
    pM = 'pM',
    percentage = '%',
}

export enum volumeLiquidUnits {
    mL = 'mL',
    L = 'L',
    cL = 'cL',
    muL = 'µL',
}

export enum MassUnits {
    g = 'g',
    mg = 'mg',
    ng = 'ng',
    mug = 'µg',
}

export enum Labels {
    componentName = 'component name',
    initConcentration = 'inital concentration / molecular weight',
    desiredConcentration = 'desired concentration',
    amountToPut = 'amount to put'
}
