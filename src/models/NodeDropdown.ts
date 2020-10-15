import flattenTree from '@/utils/flattenTree';
import Unit, { NodeWithChildren } from './Unit';

class NodeDropdown extends Unit {
  constructor(public children: NodeWithChildren) {
    super();
    this.children = children;
  }

  filterNodesByState(state: string): NodeDropdown {
    return flattenTree([], this.children).filter((node: NodeWithChildren) => node.stateOfMatter === state);
  }
}

export default NodeDropdown;
