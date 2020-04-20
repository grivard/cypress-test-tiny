
describe('Bug?', function () {
	
	var eoc // I know you say at https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Aliases not to do this, but it works and aliases won't - I need this variable for ALL tests and don't want to repeat the call in every beforeEach

	before(function () {
		cy.GetTestEnvironment().then(($eoc) => { eoc = $eoc })
	})

    it('Do anything', function () {
		cy.log(eoc)
    })


})