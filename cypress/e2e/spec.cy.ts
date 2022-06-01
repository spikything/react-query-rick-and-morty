describe('Tests basic behaviour of the app', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Shows the title', () => {
		cy.get('h1').should('contain.text', 'Reack and Morquery');
	});

	it('Shows the user we are on page 1', () => {
		cy.get('p').should('contain.text', 'Page 1 of');
	});

	it('Loads up a card with Rick Sanchez', () => {
		cy.get('.card').should('contain.text', 'Rick Sanchez');
	});

	it('Should not let the user go below first page', () => {
    cy.contains('Previous').should('be.disabled');
	});

	it('Allows user to navigate to next page', () => {
    cy.contains('Next').click();
    cy.get('p').should('contain.text', 'Page 2 of');
    cy.get('.card').should('contain.text', 'Poopybutthole');
    cy.contains('Previous').should('not.be.disabled');
	});

	it('Allows user to filter by gender', () => {
    cy.contains('Female').click();
    cy.get('.card').should('not.contain.text', 'Male');
	});

	it('Should avoid stranding the user on a non-existent page when adding a filter by returning them to page 1', () => {
    for (var i=0; i<5; i++)
    {
      cy.contains('Next').click();
      cy.wait(500);
    }
    cy.contains('Alive only').click();
    cy.contains('Human only').click();
    cy.contains('Female').click();
    cy.get('p').should('contain.text', 'Page 1 of');
	});

});