describe('Blog Post App', () => {
    it('allows a user to login', () => {
        cy.visit('/');
        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="token"]').type('test-token');
        cy.get('button').contains('Submit').click();
        cy.url().should('include', '/');
    });

    it('displays a list of blog posts', () => {
        cy.visit('/');
        cy.get('ul').should('contain', 'Blog Posts');
    });

    it('allows a user to create a new post', () => {
        cy.visit('/post/new');
        cy.get('input[name="title"]').type('New Post');
        cy.get('textarea[name="body"]').type('This is a new post.');
        cy.get('button').contains('Submit').click();
        cy.url().should('include', '/');
    });

    it('allows a user to edit an existing post', () => {
        cy.visit('/post/1/edit');
        cy.get('input[name="title"]').clear().type('Updated Post');
        cy.get('textarea[name="body"]').clear().type('This is an updated post.');
        cy.get('button').contains('Submit').click();
        cy.url().should('include', '/post/1');
    });

    it('allows a user to delete a post', () => {
        cy.visit('/post/1');
        cy.get('button').contains('Delete').click();
        cy.get('button').contains('Confirm').click();
        cy.url().should('include', '/');
    });
});