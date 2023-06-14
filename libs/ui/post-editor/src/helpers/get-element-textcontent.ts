export const getElementTextContent = (element: any): string => {
  let textContent = '';
  if (element.childNodes) {
    for (const node of element.childNodes) {
      if (node.nodeType === 3) {
        // we have a text node
        textContent += node.textContent;
      } else {
        textContent += getElementTextContent(node);
      }
    }
    return textContent; // needed because of recursion stuff
  } else {
    return element.textContent;
  }
};

export const getHTMLStringTextContent = (htmlString: string): string => {
  const span = document.createElement('span');
  span.innerHTML = htmlString;
  return span.textContent || span.innerText;
};
