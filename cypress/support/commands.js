/// <reference types="Cypress" />

const baseUrl = 'http://localhost:3000';

Cypress.Commands.add('wipeDb', () => {
  cy.request('POST', `${baseUrl}/test/reset`);
});

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    url: `${baseUrl}/api/login`,
    method: 'POST',
    body: { username, password },
  }).then((res) => {
    const { body } = res;
    window.localStorage.setItem('youBlogUser', JSON.stringify(body));
  });
  cy.visit(baseUrl);
});

Cypress.Commands.add('createUser', (userInfo) => {
  cy.request({
    url: `${baseUrl}/api/users`,
    method: 'POST',
    body: userInfo,
  });
});

Cypress.Commands.add('createBlog', (blog) => {
  const user = JSON.parse(window.localStorage.getItem('youBlogUser'));
  cy.request({
    url: `${baseUrl}/api/blogs`,
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  });
});
