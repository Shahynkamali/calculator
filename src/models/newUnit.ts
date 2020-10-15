export interface NodeWithChildren extends Unit {
  label?: AllowedUnits;
  children: Unit[]
  state?: string;
}


type AllowedUnits =
'nM' |
'µM' |
'mM' |
'M' |
'μg/μL' |
'mg/mL' |
'g/L' |
'μg/mL' |
'X' |
'%' |
'μL' |
'L' |
'nL' |
'mL' |
'U/mL' |
'g' |
'%/(s)' |
'g/mol';


enum LiquidUnits {
  nM = 'nM',
  µM ='µM',
  mM = 'mM',
  M = 'M',
  μgPerμL ='μg/μL',
  mgPerML ='mg/mL',
  gPerL ='g/L',
  μgPerML = 'μg/mL',
  X ='X',
  percentage ='%',
  μL ='μL',
  L ='L',
  nL ='nL',
  mL ='mL',
  UPerML ='U/mL'
}

enum SolidUnits {
  g = 'g',
  percentagePerSolid = '%/(s)',
  gramPerMolar = 'g/mol',
}

type state = 'liquid' | 'solid';

class Unit {
  public stateOfMatter?: state;

  constructor(public label?: AllowedUnits) {
    this.label = label;
    if (this.label && this.label in LiquidUnits) {
      this.stateOfMatter = 'liquid';
    } else if (this.label && this.label in SolidUnits) {
      this.stateOfMatter = 'solid';
    }
  }
}

export default Unit;
