import HELPER from '../lib/TokenHelper';

describe("Token Helper - tokenize", function() {
	
	var REG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

	var mockToken = function( tag, start, end ) {
		return { tag: tag, startOfTagPos: start, endOfTagPos: end };
	}

	describe("tokenize", function() {

		it("return correct tokens from string without text tags", function() {

			var mock = '<div></div><div></div>';

			var actual = HELPER.tokenize(REG, mock);

			expect( actual[0] ).toEqual(mockToken('<div>', 0, 4) );
			expect( actual[1] ).toEqual(mockToken('</div>', 5, 10) );
			expect( actual[2] ).toEqual(mockToken('<div>', 11, 15) );
			expect( actual[3] ).toEqual(mockToken('</div>', 16, 21) );
		});

		it("return correct tokens from string with text tags", function() {

			var mock = '<div>Hello</div><div>Goodbye</div>';

			var actual = HELPER.tokenize(REG, mock);

			expect( actual[0] ).toEqual(mockToken('<div>', 0, 4) );
			expect( actual[1] ).toEqual(mockToken('</div>', 10, 15) );
			expect( actual[2] ).toEqual(mockToken('<div>', 16, 20) );
			expect( actual[3] ).toEqual(mockToken('</div>', 28, 33) );
		});
	});

	describe("get tag name", function() {

		it("Opening tag One", function() {

			var mt = mockToken('<div>', 5, 10);

			var actual = HELPER.getTagName(mt.tag);

			expect( actual ).toEqual('div');
		});

		it("Opening tag Two", function() {

			var mt = mockToken('<div class="bla">', 5, 10);

			var actual = HELPER.getTagName(mt.tag);

			expect( actual ).toEqual('div');
		});


		it("Closing tag", function() {

			var mt = mockToken('</div>', 5, 10);

			var actual = HELPER.getTagName(mt.tag);

			expect( actual ).toEqual('div');
		});
	});

	describe("is Opening Tag", function() {
	
		it("simple", function() {

			expect( HELPER.isOpeningTag('<div>') ).toBe(true);
		});

		it("Complex", function() {

			expect( HELPER.isOpeningTag('<div class="hello">') ).toBe(true);
		});
	});

	describe("is Closing Tag", function() {
	
		it("simple", function() {

			expect( HELPER.isClosingTag('</div>') ).toBe(true);
		});
	});

	describe("Token Helper find closing", function() {
		
		it("return correct closing tag from tokens array", function() {

			var mock = [
				mockToken('<div>', 0, 4),
				mockToken('</div>', 5, 6)
			];

			var actual = HELPER.findClosing( 'div', mock.slice(1));

			expect( mock.indexOf(actual) ).toEqual(1);
		});

		it("return correct closing tag from tokens array", function() {

			var mock = [
				mockToken('<div>', 0, 4),
				mockToken('<span>', 0, 4),
				mockToken('</span>', 0, 4),
				mockToken('<p>', 0, 4),
				mockToken('</p>', 0, 4),
				mockToken('</div>', 5, 6)
			];

			var actual = HELPER.findClosing( 'div', mock.slice(1));

			expect( mock.indexOf(actual) ).toEqual(5);
		});

		it("return correct closing tag from tokens array", function() {

			var mock = [
				mockToken('<div>', 0, 4),
				mockToken('<span>', 0, 4),
				mockToken('</span>', 0, 4),
				mockToken('<p>', 0, 4),
				mockToken('</p>', 0, 4)
			];

			var actual = HELPER.findClosing( 'div', mock.slice(1));

			expect( actual ).toBe(null);
			expect( mock.indexOf(actual) ).toEqual(-1);
		});
	});
});