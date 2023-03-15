// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    setCaretPosition(id: string, position: number): Chainable<any>;
    getCaretPosition(): Chainable<any>;
    getElementTextContent(selector: string): Chainable<any>;
    shouldHaveText(text: string): Chainable<any>;
    undo: () => Chainable<any>;
    redo: () => Chainable<any>;
  }
}
const noLogOptions = { log: false };
const setCaretPosition = ({
  element,
  position,
}: {
  element: HTMLElement;
  position: number;
}) => {
  const document = element.ownerDocument;

  for (const node of element.childNodes) {
    if (node.nodeType === 3) {
      // we have a text node
      if (node.length >= position) {
        // finally add our range
        const range = document.createRange() as Range;
        const sel = document.getSelection() as Selection;
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

Cypress.Commands.add(
  'setCaretPosition',
  (selector: string, position: number) => {
    Cypress.log({
      displayName: 'Set Caret Position',
      message: position,
    });
    return cy
      .get(selector)
      .then(($el) => {
        const el = $el[0];
        setCaretPosition({ element: el, position });
      })
      .focus(noLogOptions);
  }
);

Cypress.Commands.add('undo', () => {
  Cypress.log({
    displayName: 'Undo',
    message: 'Control + Z',
  });
  return cy.focused(noLogOptions).type('{meta}z', noLogOptions);
});

Cypress.Commands.add('redo', () => {
  Cypress.log({
    displayName: 'Redo',
    message: 'Control + Shift + Z',
  });
  return cy.focused(noLogOptions).type('{ctrl}{shift}z', noLogOptions);
});

Cypress.Commands.add('getCaretPosition', () => {
  return cy.focused().then((el) => {
    let caretOffset = null;
    const element = el[0];
    const doc = element.ownerDocument;
    const win = doc.defaultView;
    let sel;
    if (typeof win.getSelection != 'undefined') {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != 'Control') {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      caretOffset = preCaretTextRange.text.length;
    }

    return caretOffset;
  });
});

// export const getElementTextContent = (element: any): string => {
//   let textContent = '';
//   if (element.childNodes) {
//     for (const node of element.childNodes) {
//       if (node.nodeType === 3) {
//         // we have a text node
//         textContent += node.textContent;
//       } else {
//         textContent += getElementTextContent(node);
//       }
//     }
//     return textContent; // needed because of recursion stuff
//   } else {
//     return element.textContent;
//   }
// };

// export const getHTMLStringTextContent = (htmlString: string): string => {
//   const span = document.createElement('span');
//   span.innerHTML = htmlString;
//   return span.textContent || span.innerText;
// };

const getElementTextContentFunction = (element: any): string => {
  let textContent = '';
  if (element.childNodes) {
    for (const node of element.childNodes) {
      if (node.nodeType === 3) {
        // we have a text node
        textContent += node.textContent;
      } else {
        textContent += getElementTextContentFunction(node);
      }
    }
    return textContent; // needed because of recursion stuff
  } else {
    return element.textContent;
  }
};

Cypress.Commands.add('getElementTextContent', (selector: string) => {
  return cy.get(selector).then((el) => getElementTextContentFunction(el[0]));
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
