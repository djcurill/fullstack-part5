const baseUrl = 'http://localhost:3000/';
const { _, $ } = Cypress;

describe('Blog app', () => {
  const existingUser = {
    name: 'test user',
    username: 'test-username',
    password: 'secret',
  };

  describe('visting the website', () => {
    beforeEach(() => {
      cy.wipeDb();
      cy.visit(baseUrl);
    });
    it('shows the login form by default', () => {
      cy.get('[data-cy=login-form]');
    });
  });

  describe('When logging in', () => {
    beforeEach(() => {
      cy.wipeDb();
      cy.createUser(existingUser);
      cy.visit(baseUrl);
      cy.contains('Log In').click();
    });

    it('allows a valid login', () => {
      cy.get('[data-cy=username-input]').type(existingUser.username);
      cy.get('[data-cy=password-input]').type(existingUser.password);
      cy.contains('Login').click();
      cy.get('[data-cy=blog-view]');
    });

    it('raises toast message for invalid login', () => {
      cy.get('[data-cy=username-input]').type(existingUser.username);
      cy.get('[data-cy=password-input]').type('wrong-password');
      cy.contains('Login').click();
      cy.get('[data-cy=toast-notification]').should('have.class', 'error');
    });
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.wipeDb();
      cy.createUser(existingUser);
      cy.login(existingUser.username, existingUser.password);
      cy.visit(baseUrl);
    });

    it('shows a button for creating a new blog', () => {
      cy.contains(/new blog/i);
    });

    it('displays a form when click "new blog" ', () => {
      cy.contains(/new blog/i).click();
      cy.get('.blogform');
    });

    it('creates a new blog when submitted', () => {
      cy.contains(/new blog/i).click();
      cy.get('[data-cy="title-input"]').type('a new blog');
      cy.get('[data-cy="author-input"]').type('the author');
      cy.get('button[type="submit"]').click();
      cy.contains('a new blog');
    });
  });

  describe('blog view functionality', () => {
    const userTwo = { name: 'two', username: 'userTwo', password: 'secret' };
    beforeEach(() => {
      cy.wipeDb();
      cy.createUser(existingUser);
      cy.createUser(userTwo);
      cy.login(existingUser.username, existingUser.password);
      cy.createBlog({ title: 'blog one', author: 'author one' });
      cy.visit(baseUrl);
    });

    it('updates like count by 1 when pressing like once', () => {
      cy.contains('blog one').parent().as('blog').get('[data-cy="like-button"]').click();
      cy.get('@blog').get('[data-testid="toggle"]').click();
      cy.get('@blog').contains(/likes: 1/i);
    });

    it('removes a blog when pressing delete', () => {
      cy.contains('blog one').parent().get('[data-cy="delete-button"]').click();
      cy.contains('blog one').should('not.exist');
    });

    it('does not allow deletion of other people blogs', () => {
      cy.login(userTwo.username, userTwo.password);
      cy.contains('blog one').parent().get('[data-cy="delete-button"]').click();
      cy.get('[data-cy=toast-notification]').should('have.class', 'error');
    });
  });

  describe('blog ordering', () => {
    beforeEach(() => {
      cy.wipeDb();
      cy.createUser(existingUser);
      cy.login(existingUser.username, existingUser.password);
      cy.createBlog({ title: 'blog one', author: 'author one' });
      cy.createBlog({ title: 'blog two', author: 'author two' });
      cy.createBlog({ title: 'blog three', author: 'author three' });
      cy.visit(baseUrl);
    });

    it.only('orders the blogs by likes in descending order', () => {
      cy.contains('blog three').parent().as('blogThree').get('[data-cy="like-button"]').as('theButton');

      cy.get('@blogThree').within(() => {
        cy.get('button[data-cy="like-button"]').click();
        cy.get('button[data-cy="like-button"]').click();
        cy.get('button[data-testid="toggle"]').click();
      });

      cy.contains('blog one').parent().as('blogOne').get('[data-cy="like-button"]').as('theButton');

      cy.get('@blogOne').within(() => {
        cy.get('button[data-cy="like-button"]').click();
        cy.get('button[data-testid="toggle"]').click();
      });

      cy.get('.card > h1')
        .then(($els) => Cypress._.map(Cypress.$.makeArray($els), 'innerText'))
        .should('deep.equal', ['blog three', 'blog one', 'blog two']);
    });
  });
});
