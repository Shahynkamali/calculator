import getParents from '@/utils/getParents';

const extractParent = (event: Event, node: string) => {
  const { nextElementSibling } = event.target as HTMLBaseElement;
  let nodes: HTMLBaseElement[] = [];
  if (nextElementSibling) {
    const checkedNode = nextElementSibling.querySelector('.node-label--checked') as HTMLBaseElement;
    if (checkedNode) {
      const relatedParentNodes: HTMLBaseElement[] = getParents(checkedNode, node);
      nodes = relatedParentNodes;
    }
  }
  if (nodes.length) {
    nodes.forEach((parentNode: HTMLBaseElement) => {
      parentNode.classList.add('node-children--selected');
    });
  }
  return nodes;
};

export default extractParent;
