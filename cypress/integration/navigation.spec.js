describe("Navigation", () => {
    it("should visit root", () => {
      cy.visit("/");
    });
    it('should navigate to Tuesday', () => {
      cy.contains('Tuesday')
      .click()
      cy.get(".day-list__item--selected")
      .should('contain', 'Tuesday')
    });
  });