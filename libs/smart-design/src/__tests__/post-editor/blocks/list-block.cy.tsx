import { BlocksDB, buildListBlock } from '@smartcoorp/ui/post-editor';

import { getExpectedText, renderPostEditor } from '../helpers';

const mockList = buildListBlock('main', [
  'First item',
  'Second item',
  'Third item',
]);
const mockListSelector = `#${mockList.id}_0`;
const endCaretPosition = mockList.data.items.reduce(
  (acc, item) => acc + item.length,
  0
);
const mockCaretPosition = 2;

const defaultBlocksDB: BlocksDB = {
  blocks: {
    [mockList.id]: mockList,
  },
  chains: {
    main: [mockList.id],
  },
};

const renderListPostEditor = (
  {
    blocksDB,
  }: {
    blocksDB: BlocksDB;
  } = {
    blocksDB: defaultBlocksDB,
  }
) =>
  renderPostEditor({
    setBlocksDB: () => {},
    blocksDB,
  });

describe('<ListBlock />', () => {
  beforeEach(() => {
    cy.viewport(770, 770);
  });

  it('renders content', () => {
    renderListPostEditor();

    mockList.data.items.forEach((item, index) => {
      cy.get('li').eq(index).should('have.text', item);
    });
  });

  describe('Type functionality', () => {
    const addedText = 'added text';
    const modifiedCaretPosition =
      mockCaretPosition + mockList.data.items[0].length;

    beforeEach(() => {
      renderListPostEditor();
      cy.setCaretPosition(mockListSelector, modifiedCaretPosition).type(
        addedText
      );
    });

    it('should render typed text in second item', () => {
      mockList.data.items.forEach((item, index) => {
        cy.get('li')
          .eq(index)
          .should(
            'have.text',
            index === 1
              ? getExpectedText(item, addedText, mockCaretPosition)
              : item
          );
      });
    });

    it('should undo', () => {
      cy.undo();
      mockList.data.items.forEach((item, index) => {
        cy.get('li').eq(index).should('have.text', item);
      });
      cy.getCaretPosition().should('eq', modifiedCaretPosition);
    });

    it('should redo', () => {
      cy.undo();
      cy.redo();
      mockList.data.items.forEach((item, index) => {
        cy.get('li')
          .eq(index)
          .should(
            'have.text',
            index === 1
              ? getExpectedText(item, addedText, mockCaretPosition)
              : item
          );
      });
      cy.getCaretPosition().should(
        'eq',
        modifiedCaretPosition + addedText.length
      );
    });
  });

  describe('Remove last list item functionality', () => {
    beforeEach(() => {
      renderListPostEditor();
      cy.setCaretPosition(mockListSelector, endCaretPosition).type(
        '{enter}{enter}'
      );
    });
    it('should remove last list item', () => {
      cy.get('li').its('length').should('eq', mockList.data.items.length);
      cy.get('p').its('length').should('eq', 1);
    });

    it('should undo', () => {
      cy.undo();
      cy.get('li').its('length').should('eq', mockList.data.items.length);
      cy.get('p').should('not.exist');
      cy.getCaretPosition().should('eq', endCaretPosition);
    });

    it('should redo', () => {
      cy.undo();
      cy.redo();
      cy.get('li').its('length').should('eq', mockList.data.items.length);
      cy.get('p').its('length').should('eq', 1);
      cy.getCaretPosition().should('eq', 0);
    });
  });
  describe('Remove first list item functionality', () => {
    beforeEach(() => {
      renderListPostEditor();
      cy.setCaretPosition(mockListSelector, 0).type('{enter}{enter}');
    });
    it('should remove first list item', () => {
      cy.get('li').its('length').should('eq', mockList.data.items.length);
      cy.get('p').its('length').should('eq', 1);
    });

    it('should undo', () => {
      cy.undo();
      cy.get('li').its('length').should('eq', mockList.data.items.length);
      cy.get('p').should('not.exist');
      cy.getCaretPosition().should('eq', 0);
    });

    it('should redo', () => {
      cy.undo();
      cy.redo();
      cy.get('li').its('length').should('eq', mockList.data.items.length);
      cy.get('p').its('length').should('eq', 1);
      cy.getCaretPosition().should('eq', 0);
    });
  });
});
