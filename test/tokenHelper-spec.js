import HELPER from '../lib/TokenHelper';

describe("Token Helper - tokenize", function() {
	
	var regex;
	var mockToken;

	beforeEach( function() {
		regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

		mockToken = function( tag, start, end ) {
			return { tag: tag, startOfTagPos: start, endOfTagPos: end };
		}
	});

	it("return correct tokens from string", function() {

		var mock = '<div></div><div></div>';

		var actual = HELPER.tokenize(regex, mock);

		expect( actual[0] ).toEqual(mockToken('<div>', 0, 4) );
		expect( actual[1] ).toEqual(mockToken('</div>', 5, 10) );
		expect( actual[2] ).toEqual(mockToken('<div>', 11, 15) );
		expect( actual[3] ).toEqual(mockToken('</div>', 16, 21) );
	})

});