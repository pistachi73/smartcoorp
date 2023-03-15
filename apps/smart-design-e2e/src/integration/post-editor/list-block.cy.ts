describe('List Block', () => {
  const DEBOUNCE_TIME = 301;
  const ListBlockIndex = 4;
  const cursorPosition = 27;
  const typeString = ' Consider this platform.';

  beforeEach(() => {
    cy.visit('/iframe.html?id=editor-posteditor--post-editor-cypress');
    cy.fixture('post-editor').then((blocksDB) => {
      this.blocksDB = blocksDB;
      this.listBlockId = blocksDB.chains.main[ListBlockIndex];
      this.listBlock = blocksDB.blocks[this.listBlockId];
      this.fieldSelector = `#${this.listBlockId}_0`;
    });
  });

  describe('on Type', () => {
    beforeEach(() => {
      cy.setCaretPosition(this.fieldSelector, cursorPosition).type(typeString);
    });

    it('should update content', () => {
      cy.get(this.fieldSelector).should('contain.text', typeString);
    });

    it('should undo the content update', () => {
      cy.wait(DEBOUNCE_TIME);
      cy.undo();
      cy.get(this.fieldSelector).should('not.contain.text', typeString);
      cy.getCaretPosition().should('eq', cursorPosition);
    });

    it('should redo the content update', () => {
      cy.wait(DEBOUNCE_TIME);
      cy.undo();
      cy.redo();
      cy.get(this.fieldSelector).should('contain.text', typeString);
      cy.getCaretPosition().should('eq', cursorPosition + typeString.length);
    });
  });

  describe('on Enter', () => {
    it('should split list item', () => {
      cy.setCaretPosition(this.fieldSelector, cursorPosition).type(`{enter}`);
      const listItemText = this.listBlock.data.items[0];

      cy.get(`${this.fieldSelector} li`)
        .first()
        .should('have.eqText', listItemText.substring(0, cursorPosition))
        .next()
        .should('have.eqText', listItemText.substring(cursorPosition));
    });

    it.only('should remove last list item if empty', () => {
      cy.get(this.fieldSelector)
        .then((el) => cy.getElementTextContent(el[0]))
        .then((text) => cy.setCaretPosition(this.fieldSelector, text.length))
        .type('Hola');
      //   cy.setCaretPosition(this.fieldSelector, 999).type(`{enter}`);
    });
    it('should undo remove last list item if empty', () => {});
    it('should redo remove last list item if empty', () => {});
  });
});
