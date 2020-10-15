import flattenTree from '@/utils/flattenTree';
import Unit, { NodeWithChildren } from '@/models/Unit';

const filterByCategory = (schema: NodeWithChildren, nodeToFilter: Unit) => flattenTree([], schema)
  .filter((node: Unit) => node.category && node.category === nodeToFilter.category);

export default filterByCategory;
