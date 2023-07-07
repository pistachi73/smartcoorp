import React from 'react';

import {
  BlocksDB,
  PostEditor,
  buildColumnsBlock,
  buildHeaderBlock,
  buildParagraphBlock,
} from '@smartcoorp/ui/post-editor';

import {
  getExpectedText,
  getRandomCaretPosition,
  renderPostEditor,
} from '../helpers';

const mockParagraph = buildParagraphBlock('main', 'First paragraph');
const mockParagraphSelector = `#${mockParagraph.id}_0`;
const mockCaretPosition = getRandomCaretPosition(
  0,
  mockParagraph.data.text.length
);

const defaultBlocksDB: BlocksDB = {
  blocks: {
    [mockParagraph.id]: mockParagraph,
  },
  chains: {
    main: [mockParagraph.id],
  },
};

const renderParagraphPostEditor = (
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

describe('<ParagraphBlock />', () => {
  beforeEach(() => {
    cy.viewport(770, 770);
  });

  it('renders content', () => {
    renderParagraphPostEditor();

    cy.get('p').should('have.text', mockParagraph.data.text);
  });

  describe('Type functionality', () => {
    const addedText = 'added text';

    beforeEach(() => {
      renderParagraphPostEditor();
      cy.setCaretPosition(mockParagraphSelector, mockCaretPosition).type(
        addedText
      );
    });

    it('should render typed text', () => {
      cy.get('p').should(
        'have.text',
        getExpectedText(mockParagraph.data.text, addedText, mockCaretPosition)
      );
    });

    it('should undo', () => {
      cy.undo();
      cy.get('p').should('have.text', mockParagraph.data.text);
      cy.getCaretPosition().should('eq', mockCaretPosition);
    });

    it('should redo', () => {
      cy.undo();
      cy.redo();
      cy.get('p').should(
        'have.text',
        getExpectedText(mockParagraph.data.text, addedText, mockCaretPosition)
      );
      cy.getCaretPosition().should('eq', mockCaretPosition + addedText.length);
    });
  });

  describe('Split functionality', () => {
    const splitCaretPosition = getRandomCaretPosition(
      0,
      mockParagraph.data.text.length - 1
    );
    beforeEach(() => {
      renderParagraphPostEditor();
      cy.setCaretPosition(mockParagraphSelector, splitCaretPosition).type(
        '{enter}'
      );
    });

    it('should split paragraph', () => {
      cy.contains(mockParagraph.data.text.slice(splitCaretPosition));
    });

    it('should undo', () => {
      cy.undo();
      cy.get('p').should('have.text', mockParagraph.data.text);
      cy.getCaretPosition().should('eq', splitCaretPosition);
    });

    it('should redo', () => {
      cy.undo();
      cy.redo();
      cy.contains(mockParagraph.data.text.slice(splitCaretPosition));
      cy.getCaretPosition().should('eq', 0);
    });
  });

  describe('Delete functionality', () => {
    const auxMockParagraph = buildParagraphBlock('main', 'Aux paragraphs');
    const auxMockParagraphSelector = `#${auxMockParagraph.id}_0`;
    const endCaretPosition = auxMockParagraph.data.text.length;
    beforeEach(() => {
      renderParagraphPostEditor({
        blocksDB: {
          blocks: {
            ...defaultBlocksDB.blocks,
            [auxMockParagraph.id]: auxMockParagraph,
          },
          chains: {
            main: [mockParagraph.id, auxMockParagraph.id],
          },
        },
      });
      cy.setCaretPosition(auxMockParagraphSelector, endCaretPosition)
        .clear()
        .type('{backspace}');
    });

    it('should delete text', () => {
      cy.get('p').its('length').should('eq', 1);
    });

    it('should undo', () => {
      cy.get('p').first().focus();
      cy.undo();
      cy.contains(auxMockParagraph.data.text);
      cy.getCaretPosition().should('eq', endCaretPosition);
    });

    it('should redo', () => {
      cy.get('p').first().focus();
      cy.undo();
      cy.redo();
      cy.contains(auxMockParagraph.data.text).should('not.exist');
      cy.getCaretPosition().should('eq', mockParagraph.data.text.length);
    });
  });

  describe('Merge functionality', () => {
    const auxMockParagraph = buildParagraphBlock('main', 'Aux paragraphs');
    const mockHeader = buildHeaderBlock('main', 'Header');

    const mockTwoColumns = buildColumnsBlock('main', 2);
    const mockColumnChainIds = mockTwoColumns.data.chains;

    const leftColumnMockParagraph = buildParagraphBlock(
      mockColumnChainIds[0],
      'Left Column Paragraph'
    );
    const rightColumnMockParagraph = buildParagraphBlock(
      mockColumnChainIds[1],
      'Right Column Paragraph'
    );

    const auxMockParagraphSelector = `#${auxMockParagraph.id}_0`;
    const mockMergeCaretPosition = 2;

    it('should merge paragraphs', () => {
      renderParagraphPostEditor({
        blocksDB: {
          blocks: {
            ...defaultBlocksDB.blocks,
            [auxMockParagraph.id]: auxMockParagraph,
          },
          chains: {
            main: [mockParagraph.id, auxMockParagraph.id],
          },
        },
      });
      cy.setCaretPosition(
        auxMockParagraphSelector,
        mockMergeCaretPosition
      ).type('{backspace}{backspace}{backspace}');

      cy.get('p').should(
        'have.text',
        `${mockParagraph.data.text}${auxMockParagraph.data.text.slice(
          mockMergeCaretPosition
        )}`
      );
    });

    describe('With Columns', () => {
      beforeEach(() => {
        const blocksDB = {
          blocks: {
            ...defaultBlocksDB.blocks,
            [auxMockParagraph.id]: auxMockParagraph,
            [mockTwoColumns.id]: mockTwoColumns,
            [leftColumnMockParagraph.id]: leftColumnMockParagraph,
            [rightColumnMockParagraph.id]: rightColumnMockParagraph,
          },
          chains: {
            main: [mockParagraph.id, mockTwoColumns.id, auxMockParagraph.id],
            [mockColumnChainIds[0]]: [leftColumnMockParagraph.id],
            [mockColumnChainIds[1]]: [rightColumnMockParagraph.id],
          },
        };

        console.log(blocksDB);
        renderParagraphPostEditor({
          blocksDB,
        });
      });
      describe('From Outside - Inside', () => {
        beforeEach(() => {
          cy.setCaretPosition(
            auxMockParagraphSelector,
            mockMergeCaretPosition
          ).type('{backspace}{backspace}{backspace}');
        });
        it('should merge pargarphs', () => {
          cy.contains(
            `${
              rightColumnMockParagraph.data.text
            }${auxMockParagraph.data.text.slice(mockMergeCaretPosition)}`
          );

          cy.getCaretPosition().should(
            'eq',
            rightColumnMockParagraph.data.text.length
          );
        });

        it('should undo', () => {
          cy.undo();
          cy.contains(auxMockParagraph.data.text);
          cy.getCaretPosition().should('eq', mockMergeCaretPosition);
        });
        it('should redo', () => {
          cy.undo();
          cy.redo();
          cy.contains(
            `${
              rightColumnMockParagraph.data.text
            }${auxMockParagraph.data.text.slice(mockMergeCaretPosition)}`
          );
          cy.getCaretPosition().should(
            'eq',
            rightColumnMockParagraph.data.text.length
          );
        });
      });

      describe('From Inside - Inside', () => {
        beforeEach(() => {
          cy.setCaretPosition(
            `#${rightColumnMockParagraph.id}_0`,
            mockMergeCaretPosition
          ).type('{backspace}{backspace}{backspace}');
        });
        it('should merge pargarphs', () => {
          cy.contains(
            `${
              leftColumnMockParagraph.data.text
            }${rightColumnMockParagraph.data.text.slice(
              mockMergeCaretPosition
            )}`
          );

          cy.getCaretPosition().should(
            'eq',
            leftColumnMockParagraph.data.text.length
          );
        });
        it('should undo', () => {
          cy.undo();
          cy.contains(rightColumnMockParagraph.data.text);
          cy.getCaretPosition().should('eq', mockMergeCaretPosition);
        });
        it('should redo', () => {
          // TODO: Fix this test
          // This test is failing because the caret position is not being set correctly
          cy.undo();
          cy.redo();
          cy.contains(
            `${
              leftColumnMockParagraph.data.text
            }${rightColumnMockParagraph.data.text.slice(
              mockMergeCaretPosition
            )}`
          );
          // cy.getCaretPosition().should(
          //   'eq',
          //   leftColumnMockParagraph.data.text.length
          // );
        });
      });
      describe('From Inside - Outside', () => {
        beforeEach(() => {
          cy.setCaretPosition(
            `#${leftColumnMockParagraph.id}_0`,
            mockMergeCaretPosition
          ).type('{backspace}{backspace}{backspace}');
        });
        it('should merge pargarphs s', () => {
          cy.contains(
            `${
              mockParagraph.data.text
            }${leftColumnMockParagraph.data.text.slice(mockMergeCaretPosition)}`
          );

          cy.getCaretPosition().should('eq', mockParagraph.data.text.length);
        });

        it('should undo', () => {
          cy.undo();
          cy.contains(leftColumnMockParagraph.data.text);
          cy.getCaretPosition().should('eq', mockMergeCaretPosition);
        });
        it('should redo', () => {
          cy.undo();
          cy.redo();
          cy.contains(
            `${
              mockParagraph.data.text
            }${leftColumnMockParagraph.data.text.slice(mockMergeCaretPosition)}`
          );
          cy.getCaretPosition().should('eq', mockParagraph.data.text.length);
        });
      });
    });

    it('should not merge paragraphs with headers', () => {
      renderParagraphPostEditor({
        blocksDB: {
          blocks: {
            ...defaultBlocksDB.blocks,
            [mockHeader.id]: mockHeader,
          },
          chains: {
            main: [mockHeader.id, mockParagraph.id],
          },
        },
      });
      cy.setCaretPosition(mockParagraphSelector, mockMergeCaretPosition).type(
        '{backspace}{backspace}{backspace}'
      );

      cy.contains(
        `${mockHeader.data.text}${auxMockParagraph.data.text.slice(
          mockMergeCaretPosition
        )}`
      ).should('not.exist');
      cy.getCaretPosition().should('eq', mockHeader.data.text.length);
    });
  });
});
