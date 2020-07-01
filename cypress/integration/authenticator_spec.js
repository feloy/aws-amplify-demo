describe('Authenticator:', function () {
    // Step 1: setup the application state
    beforeEach(function () {
        cy.visit('/');
    });

    describe('Sign In:', () => {
        it('allows a user to signin', () => {
            // Step 2: Take an action (Sign in)
            cy.get('amplify-authenticator')
                .find(selectors.usernameInput, { includeShadowDom: true })
                .type("test-user", { force: true });
            cy.get('amplify-authenticator')
                .find(selectors.signInPasswordInput, { includeShadowDom: true })
                .type("test-user-password", { force: true });
            cy.get('amplify-authenticator')
                .find(selectors.signInSignInButton, { includeShadowDom: true })
                .contains('Sign In')
                .click();

            // Step 3: Make an assertion (Check for sign-out text)
            cy.get('amplify-authenticator')
                .find(selectors.signOutButton, { includeShadowDom: true })
                .contains('Sign Out').should('be.visible');
        });
    });

});
export const selectors = {
    // Auth component classes
    usernameInput: 'input[data-test="sign-in-username-input"]',
    signInPasswordInput: '[data-test="sign-in-password-input"]',
    signInSignInButton: '[data-test="sign-in-sign-in-button"]',
    signOutButton: '[data-test="sign-out-button"]'
}
