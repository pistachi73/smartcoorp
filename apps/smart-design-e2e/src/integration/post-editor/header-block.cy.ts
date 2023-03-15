describe('Header Block', () => {
  const DEBOUNCE_TIME = 301;
  const headerBlockIndex = 0;
  const cursorPosition = 13;
  const typeString = ' test typeing ';

  beforeEach(() => {
    cy.visit('/iframe.html?id=editor-posteditor--post-editor-cypress');
    cy.fixture('post-editor').then((blocksDB) => {
      this.blocksDB = blocksDB;
      this.headerId = blocksDB.chains.main[headerBlockIndex];
      this.headerBlock = blocksDB.blocks[this.headerId];
      this.fieldSelector = `#${this.headerId}_0`;
    });
  });

  describe.only('on Type', () => {
    beforeEach(() => {
      cy.setCaretPosition(this.fieldSelector, cursorPosition).type(typeString);
    });

    it('should update content', () => {
      cy.get(this.fieldSelector).should('contain.text', typeString);
    });

    it('should undo', () => {
      cy.wait(DEBOUNCE_TIME);
      cy.undo();
      cy.get(this.fieldSelector).should('not.contain.text', typeString);
      cy.getCaretPosition().should('eq', cursorPosition);
    });

    it('should redo', () => {
      cy.wait(DEBOUNCE_TIME);
      cy.undo();
      cy.redo();
      cy.get(this.fieldSelector).should('contain.text', typeString);
      cy.getCaretPosition().should('eq', cursorPosition + typeString.length);
    });
  });

  describe('on Enter', () => {
    let expectedText: string;
    beforeEach(() => {
      cy.setCaretPosition(this.fieldSelector, cursorPosition).type(`{enter}`);
      expectedText = this.headerBlock.data.text.substring(0, cursorPosition);
    });

    it('should split the block', () => {
      cy.get(this.fieldSelector)
        .invoke('text')
        .then((text) => {
          expect(text.length).to.eq(expectedText.length);
          expect(text).to.contain(expectedText.trim());
        });

      cy.getCaretPosition().should('eq', 0);
    });

    it('should undo the split', () => {
      cy.undo();
      cy.get(this.fieldSelector)
        .invoke('text')
        .then((text) => {
          expect(text.length).to.eq(this.headerBlock.data.text.length);
          expect(text).to.contain(this.headerBlock.data.text.trim());
        });
      cy.getCaretPosition().should('eq', cursorPosition);
    });

    it('should redo the split', () => {
      cy.undo();
      cy.redo();
      cy.get(this.fieldSelector)
        .invoke('text')
        .then((text) => {
          expect(text.length).to.eq(expectedText.length);
          expect(text).to.contain(expectedText.trim());
        });
      cy.getCaretPosition().should('eq', 0);
    });
  });

  describe('on Backspace', () => {
    const auxHeaderBlockIndex = 3;
    let auxHeaderBlockId: string,
      prevBlockText: string,
      currentBlockText: string;
    beforeEach(() => {
      auxHeaderBlockId = this.blocksDB.chains.main[auxHeaderBlockIndex];

      cy.get(`#${auxHeaderBlockId}_0`).as('currentBlock');
      cy.get(`#${this.blocksDB.chains.main[auxHeaderBlockIndex - 1]}_0`).as(
        'prevBlock'
      );
      cy.get('@prevBlock')
        .invoke('text')
        .then((text) => {
          prevBlockText = text;
        });
      cy.get('@currentBlock')
        .invoke('text')
        .then((text) => {
          currentBlockText = text;
        });

      cy.get('@currentBlock').type('{selectall}{backspace}{backspace}');
    });
    it("should remove the block and focus previous if it's empty ", () => {
      cy.get('@currentBlock').should('not.exist');
      cy.get('@prevBlock').should('have.focus');
      cy.log(this.prevBlockText);
      cy.getCaretPosition().should('eq', prevBlockText.length);
    });

    it("should undo the removal if it's not empty", () => {
      cy.undo();
      cy.get(`@currentBlock`).should('have.focus');
      cy.getCaretPosition().should('eq', currentBlockText.length);
    });

    it("should redo the removal if it's not empty", () => {
      cy.undo();
      cy.redo();
      cy.get(`@currentBlock`).should('not.exist');
      cy.get(`@prevBlock`).should('have.focus');

      cy.getCaretPosition().should('eq', prevBlockText.length);
    });
  });
});
