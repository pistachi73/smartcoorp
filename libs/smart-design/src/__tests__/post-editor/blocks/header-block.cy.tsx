import {
  BlocksDB,
  buildHeaderBlock,
  buildParagraphBlock,
} from '@smartcoorp/ui/post-editor';

import {
  getExpectedText,
  getRandomCaretPosition,
  renderPostEditor,
} from '../helpers';

const mockHeader = buildHeaderBlock('main', 'First Header');
const mockHeaderSelector = `#${mockHeader.id}_0`;
const mockCaretPosition = getRandomCaretPosition(
  0,
  mockHeader.data.text.length
);

const defaultBlocksDB: BlocksDB = {
  blocks: {
    [mockHeader.id]: mockHeader,
  },
  chains: {
    main: [mockHeader.id],
  },
};

const renderHeaderPostEditor = (
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

describe('<HeaderBlock />', () => {
  beforeEach(() => {
    cy.viewport(770, 770);
  });

  it('renders content', () => {
    renderHeaderPostEditor();

    cy.get('h3').should('have.text', mockHeader.data.text);
  });

  describe('Type functionality', () => {
    const addedText = 'added text';

    beforeEach(() => {
      renderHeaderPostEditor();
      cy.setCaretPosition(mockHeaderSelector, mockCaretPosition).type(
        addedText
      );
    });

    it('should render typed text', () => {
      cy.get('h3').should(
        'have.text',
        getExpectedText(mockHeader.data.text, addedText, mockCaretPosition)
      );
    });

    it('should undo', () => {
      cy.undo();
      cy.get('h3').should('have.text', mockHeader.data.text);
      cy.getCaretPosition().should('eq', mockCaretPosition);
    });

    it('should redo', () => {
      cy.undo();
      cy.redo();
      cy.get('h3').should(
        'have.text',
        getExpectedText(mockHeader.data.text, addedText, mockCaretPosition)
      );
      cy.getCaretPosition().should('eq', mockCaretPosition + addedText.length);
    });
  });

  describe('Delete functionality', () => {
    const mockParagraph = buildParagraphBlock('main', 'Aux paragraphs');
    const endCaretPosition = mockHeader.data.text.length;
    beforeEach(() => {
      renderHeaderPostEditor({
        blocksDB: {
          blocks: {
            ...defaultBlocksDB.blocks,
            [mockParagraph.id]: mockParagraph,
          },
          chains: {
            main: [mockParagraph.id, mockHeader.id],
          },
        },
      });
      cy.setCaretPosition(mockHeaderSelector, endCaretPosition)
        .clear()
        .type('{backspace}');
    });

    it('should delete header', () => {
      // The header is deleted and the paragraph is the only block in the chain
      cy.get('p').its('length').should('eq', 1);
    });

    it('should undo', () => {
      cy.get('p').first().focus();
      cy.undo();
      cy.contains(mockHeader.data.text);
      cy.getCaretPosition().should('eq', endCaretPosition);
    });

    it('should redo', () => {
      cy.get('p').first().focus();
      cy.undo();
      cy.redo();
      cy.contains(mockHeader.data.text).should('not.exist');
      cy.getCaretPosition().should('eq', mockParagraph.data.text.length);
    });
  });

  describe('Split functionality', () => {
    const splitCaretPosition = getRandomCaretPosition(
      0,
      mockHeader.data.text.length - 1
    );
    beforeEach(() => {
      renderHeaderPostEditor();
      cy.setCaretPosition(mockHeaderSelector, splitCaretPosition).type(
        '{enter}'
      );
    });

    it('should split header', () => {
      cy.contains(mockHeader.data.text.slice(splitCaretPosition));
      cy.contains(mockHeader.data.text.slice(0, splitCaretPosition));
    });

    it('should undo', () => {
      cy.undo();
      cy.get('h3').should('have.text', mockHeader.data.text);
      cy.get('p').should('not.exist');
      cy.getCaretPosition().should('eq', splitCaretPosition);
    });

    it('should redo', () => {
      cy.undo();
      cy.redo();
      cy.contains(mockHeader.data.text.slice(splitCaretPosition));
      cy.contains(mockHeader.data.text.slice(0, splitCaretPosition));
      cy.getCaretPosition().should('eq', 0);
    });
  });
});
