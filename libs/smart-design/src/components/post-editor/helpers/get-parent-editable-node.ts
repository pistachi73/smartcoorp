export const getClosestEditableElement = (element: HTMLElement): HTMLElement | null => {
  const isValidEditableElement = (element: HTMLElement): boolean =>
    element.getAttribute('contenteditable') ? true : false;

  while (!isValidEditableElement(element)) {
    if (!element.parentElement) break;
    element = element.parentElement;
  }

  return element;
};
