// import { slowCypressDown } from 'cypress-slow-down';
// slowCypressDown(); // 1000 ms by default (can be configured here or in cypress.config.ts with the "commandDelay" env variable)

// --> optionally uncomment "slowCypressDown()" for better visuals when not in headless mode.

const searchbox = 'input[type=search]';
const submitButton = 'button[type=submit]';
const searchSuggestionItems = '.search-suggestions li';

describe('UI elements properly render and work, including navigation', () => {
    it('displays the correct titles on "index" page', () => {
        cy.visit('');
        cy.get('h1').should('have.text', 'The Movie App');
        cy.get('h2').should('have.text', 'Find the movies you love!');
    });

    it('renders a searchbox and a submit button', () => {
        cy.get(searchbox);
        cy.get(submitButton);
    });

    it('the searchbox accepts users input', () => {
        cy.get(searchbox).type('a').should('have.value', 'a');
        cy.get(searchbox).type('1').should('have.value', 'a1');
        cy.get(searchbox)
            .type('{backspace}{backspace}')
            .should('have.value', '');
    });

    it('can navigate to "favorites" page', () => {
        cy.get('#route-nav').contains('Manage Favorites').click();
    });

    it('displays the correct titles on "favorites" page', () => {
        cy.get('h1').should('have.text', 'The Movie App');
        cy.get('h2').should('have.text', 'Your favorite movies');
    });

    it('can navigate back to "index" page', () => {
        cy.get('#route-nav').contains('Find Movies').click();
    });
});

describe('searchbox works properly, including automatic triggering and pagination', () => {
    const resultsPerPage = 20;

    it('search is not performed if less than 3 characters are entered', () => {
        cy.visit('');
        cy.get(searchbox).clear();
        cy.get(submitButton).click();
        cy.get(searchSuggestionItems).should('have.length', 0);
        cy.get(searchbox).type('1');
        cy.get(submitButton).click();
        cy.get(searchSuggestionItems).should('have.length', 0);
        cy.get(searchbox).type('2');
        cy.get(submitButton).click();
        cy.get(searchSuggestionItems).should('have.length', 0);
        cy.get(searchbox).clear();
    });

    it('search is automatically triggered AND a spinner is rendered after at least 3 characters are entered', () => {
        cy.get(searchbox).clear();
        cy.get(searchbox).type('123').should('have.value', '123');
        cy.get('.spinner').should('be.visible');
        cy.get(searchSuggestionItems).should('have.length', resultsPerPage);
        cy.get(searchbox).clear();
    });

    it('search is triggered by pressing ENTER', () => {
        cy.get(searchbox).clear();
        cy.get(searchbox).type('123{enter}').should('have.value', '123');
        cy.get(searchSuggestionItems).should('have.length', resultsPerPage);
        cy.get(searchbox).clear();
    });

    it('search is triggered by clicking on submit button', () => {
        cy.get(searchbox).clear();
        cy.get(searchbox).type('123').should('have.value', '123');
        cy.get(submitButton).click();
        cy.get(searchSuggestionItems).should('have.length', resultsPerPage);
        cy.get(searchbox).clear();
    });

    it('pagination works, more movies can be loaded by clicking on a button', () => {
        cy.get(searchbox).clear();
        cy.get(searchbox).type('123').should('have.value', '123');
        cy.get(searchSuggestionItems).should('have.length', resultsPerPage);
        cy.get('button.load-more-button').click();
        cy.get(searchSuggestionItems).should('have.length', 2 * resultsPerPage);
        cy.get(searchbox).clear();
    });
});

describe('favorite movies can be selected and viewed', () => {
    it('can mark movies as favorites and they are properly displayed on the "favorites" page', () => {
        cy.visit('');
        const favoriteIcon = '.favorite-icon';
        const favColor = '#EAC54F';
        const storedKey = 'favorites';
        const movie = { name: 'gattaca', id: 782 };

        cy.get(searchbox).clear();
        cy.get(searchbox).type(movie.name).should('have.value', movie.name);
        cy.get(searchSuggestionItems).should('have.length', 1);
        cy.get(favoriteIcon)
            .click()
            .should(() => {
                expect(localStorage.getItem(storedKey)).to.include(movie.id);
            });
        cy.get(`${favoriteIcon} > svg`).should('have.attr', 'color', favColor);
        cy.get(searchbox).clear();

        // Movies marked as favorites are displayed on the "favorites" page:
        cy.visit('/favorites');
        cy.get('.favorites-page ul li').should('have.length', 1);
        cy.get('.favorite-movie .title').should('have.text', 'Gattaca');
    });
});
