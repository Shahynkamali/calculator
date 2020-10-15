const flattenTree = (flattenNodesArray: any, nodeTree: any): any => {
  if (nodeTree == null) return flattenNodesArray;
  if (Array.isArray(nodeTree)) return nodeTree.reduce(flattenTree, flattenNodesArray);
  flattenNodesArray.push(nodeTree);
  return flattenTree(flattenNodesArray, nodeTree.children);
};

export default flattenTree;
