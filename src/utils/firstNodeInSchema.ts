import Unit, { NodeWithChildren } from '@/models/Unit';
import flattenTree from './flattenTree';

const firstNodeInSchema = (schema: NodeWithChildren): Unit => flattenTree([], schema).find((unit: NodeWithChildren) => !unit.children);

export default firstNodeInSchema;
