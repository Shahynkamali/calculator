import flattenTree from '@/utils/flattenTree';
import Children from './Children';
import Unit, { NodeWithChildren } from './Unit';
// eslint-disable-next-line
const convert = require('convert-units');


class Dropdown {
  private _childrenForInitConcentration: Children[] = []

  private _childrenForDesiredConcentration: Children[] = []

  constructor(public children: Children[], private _state?: string | undefined, private _selectedChild?: Unit) {
    this.children = children;

    this.state = _state;

    this.selectedChild = _selectedChild;
  }

  get childrenForInitConcentration(): Children[] {
    return this._childrenForInitConcentration;
  }

  set childrenForInitConcentration(dropdown: Children[]) {
    this._childrenForInitConcentration = dropdown;
  }

  get childrenForDesiredConcentration(): Children[] {
    return this._childrenForDesiredConcentration;
  }

  set childrenForDesiredConcentration(dropdown: Children[]) {
    this._childrenForDesiredConcentration = dropdown;
  }

  get state(): string | undefined {
    return this._state;
  }

  set state(newState: string | undefined) {
    this._state = newState;
    if (newState) {
      this.childrenForInitConcentration = this.filterByState(newState);
      if (this.selectedChild && this.selectedChild.category) {
        this.childrenForDesiredConcentration = this.filterByCategory(this.selectedChild.category);
      } else if (this.firstInitConcentrationChild && this.firstInitConcentrationChild.category) {
        this.childrenForDesiredConcentration = this.filterByCategory(this.firstInitConcentrationChild.category);
      }
    }
  }

  get selectedChild(): Unit | undefined {
    return this._selectedChild;
  }

  set selectedChild(unit: Unit | undefined) {
    if (unit && unit.label) {
      this._selectedChild = unit;
    }
  }

  private filterByState(state: string): Children[] {
    const filteredByState: Children[] = flattenTree([], this.children).filter((node: NodeWithChildren) => node.state === state);
    if (filteredByState.length && filteredByState.length <= 1) {
      return flattenTree([], filteredByState[0].children);
    }
    return filteredByState;
  }

  private filterByCategory(category: string): Children[] {
    const filteredChildrenByCategory: Children[] = flattenTree([], this.children).filter((node: Unit) => node.category && node.category === category);
    if (this.selectedChild && this.selectedChild.category === 'GRAMPERMOLAR') {
      return this.filterForGramPerMolar();
    }
    if (this.children.length > 1) {
      return this.filterByMeasurment(filteredChildrenByCategory);
    }
    return filteredChildrenByCategory;
  }

  private filterByMeasurment(children: Children[]) {
    if (this.selectedChild && this.selectedChild.label) {
      const measurmentToCompareTo = convert(1).from(this.selectedChild.label).to(this.selectedChild.categoryConversionUnit);
      return children.filter((child: Unit) => (convert(1).from(child.label).to(child.categoryConversionUnit)) <= measurmentToCompareTo);
    }
    return children;
  }

  private get firstInitConcentrationChild(): Unit {
    return this.getFirstChild(this.childrenForInitConcentration);
  }

  public getFirstChild(children: Children[]): Unit {
    return flattenTree([], children).find((unit: NodeWithChildren) => !unit.children);
  }

  private filterForGramPerMolar() {
    return flattenTree([], this.children).filter((node: Unit) => node.category && node.category === 'MOLAR');
  }
}

export default Dropdown;
