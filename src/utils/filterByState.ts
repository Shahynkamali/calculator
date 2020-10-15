import flattenTree from '@/utils/flattenTree';
import { NodeWithChildren } from '@/models/Unit';

const filterByState = (schema: NodeWithChildren, state: string) => flattenTree([], schema)
  .filter((node: NodeWithChildren) => node.state === state);

export default filterByState;
