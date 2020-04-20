
Cypress.Commands.add('GetTestEnvironment', () => {
    cy.visit('/')
    cy.get('#footer').then(($footer) => {
		cy.log($footer.text()) // logs correctly if line 31 is false; doesn't log at all if line 31 is true
/* This is an example of what the footer text should look like:

	EOC
	6.5.22959
	|
	culture
	en-GB
	|
	uiCulture
	en-GB
	|
	Request Server Time
	20/04/2020 18:59 UTC+01:00

*/
		
        var eoc = ParseFooter($footer.text())
        cy.wrap(eoc)
		cy.log(eoc)
    })
})

function ParseFooter (footertext) {
	cy.log(footertext) // logs correctly if line 31 is false; doesn't log at all if line 31 is true

	if(true) { // comment this if block in/out to manifest failure
		
		var eocversion
		var uiculture
		var culture
		var timewithoffset
		var footerlines = footertext.split('\n')  // this line is failing with Cannot read property 'split' of undefined
		var k = footerlines.keys();
		for (let x of k) {
			if (footerlines[x].indexOf('EOC') > 0) {
				eocversion = footerlines[x+1].trim()
			}
			if (footerlines[x].indexOf('culture') > 0) {
				culture = footerlines[x+1].trim()
			}
			if (footerlines[x].indexOf('uiCulture') > 0) {
				uiculture = footerlines[x+1].trim()
			}
			if (footerlines[x].indexOf('Request Server Time') > 0) {
				timewithoffset = footerlines[x+1].trim()
			}
		}

		var timesplit = timewithoffset.split('UTC')

		return {
			"version": eocversion,
			"culture": culture,
			"uiculture": uiculture,
			"time": timesplit[0].trim(),
			"offset": timesplit[1]
		}
	}
}
