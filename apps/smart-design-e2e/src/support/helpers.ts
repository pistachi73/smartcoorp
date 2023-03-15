export const setCaretPosition = ({
  element,
  position,
}: {
  element: any;
  position: number;
}) => {
  for (const node of element.childNodes) {
    if (node.nodeType === 3) {
      // we have a text node
      if (node.length >= position) {
        // finally add our range
        const range = document.createRange(),
          sel = window.getSelection() as Selection;
        range.setStart(node, position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1; // we are done
      } else {
        position -= node.length;
      }
    } else {
      position = setCaretPosition({ element: node, position });
      if (position === -1) {
        return -1; // no need to finish the for loop
      }
    }
  }
  return position; // needed because of recursion stuff

  // Loop through all child nodes
};

const caretPositiioon = 2;
