// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parents = (node: any) => {
  const nodes = [node];
  for (; node; node = node.parentNode) {
    nodes.unshift(node);
  }
  return nodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commonParent = (node1: any, node2: any) => {
  const parents1 = parents(node1);
  const parents2 = parents(node2);

  if (parents1[0] != parents2[0]) return null;

  for (let i = 0; i < parents1.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (parents1[i] != parents2[i]) return parents1[i - 1];
  }
};

const getParentNode = (node: Node): Node | null => {
  const validParentNodesTags = ['P', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  if (!node.parentNode) return null;

  while (
    !validParentNodesTags.includes((node.parentElement as HTMLElement).tagName)
  ) {
    if (!node.parentNode) break;
    node = node.parentNode;
  }

  return node.parentNode;
};

const getSplitedRanges = (ranges: Range[]): Range[] | null => {
  let auxParentNode = getParentNode(ranges[0].commonAncestorContainer);
  if (!auxParentNode) return null;

  const finalRanges = [ranges[0]];
  let rangeIndex = 0;
  for (let i = 1; i < ranges.length; i++) {
    const iterationRange: Range = ranges[i];

    if (
      commonParent(iterationRange.commonAncestorContainer, auxParentNode) ===
      auxParentNode
    ) {
      const newRange = document.createRange();
      newRange.setStart(
        finalRanges[rangeIndex].startContainer,
        finalRanges[rangeIndex].startOffset
      );
      newRange.setEnd(iterationRange.endContainer, iterationRange.endOffset);
      finalRanges[rangeIndex] = newRange;
    } else {
      rangeIndex += 1;
      finalRanges[rangeIndex] = iterationRange;
      auxParentNode = getParentNode(iterationRange.commonAncestorContainer);
    }
  }

  return finalRanges;
};

export const getEditRanges = (): Range[] | null => {
  const sel = document.getSelection();

  if (!sel) return null;

  const range = sel.getRangeAt(0).cloneRange();

  let startNode = range.startContainer;
  const endNode = range.endContainer;
  const ranges = [];

  while (startNode !== endNode) {
    const startText = startNode.nodeValue as string;
    const currentRange = range.cloneRange();
    currentRange.setEnd(startNode, startText.length);
    ranges.push(currentRange);

    let sibling = startNode;
    do {
      if (sibling.hasChildNodes()) {
        sibling = sibling.firstChild as ChildNode;
      } else if (sibling.nextSibling) {
        sibling = sibling.nextSibling;
      } else {
        while (!sibling.nextSibling && sibling.parentNode) {
          sibling = sibling.parentNode as ParentNode;
        }
        if (sibling) {
          sibling = sibling.nextSibling as ChildNode;
        }
      }
    } while (sibling !== null && sibling.nodeValue === null);
    if (!sibling) {
      break;
    }
    range.setStart(sibling, 0);
    startNode = range.startContainer;
  }

  ranges.push(range);
  return getSplitedRanges(ranges);
};
